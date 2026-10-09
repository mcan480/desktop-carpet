/* Desktop Carpet license client for the desktop app (Node.js / Electron main process). No dependencies.
 *
 *   import { LicenseClient } from "./desktopcarpet-license.mjs";
 *   const lic = new LicenseClient({ dataDir: app.getPath("userData") });
 *   const s = await lic.check();               // on every launch
 *   if (s.state === "none") showEnterKeyDialog();
 *   await lic.activate("DC-XXXX-XXXX-XXXX-XXXX"); // from the "Enter license key" dialog
 *
 * States returned by check()/activate():
 *   active         valid; s.daysLeft, s.expiresAt, s.plan ("monthly" | "yearly")
 *   offline        no internet, but a signed token from the last check is still good (up to 7 days)
 *   expired        time ran out; keep the rugs the user already has, lock new ones, show s.renewUrl
 *   none           no key entered yet
 *   invalid        key wrong, revoked, or this computer isn't activated (s.reason says which)
 *   device_limit   all computer slots are taken (s.devices lists them)
 *   error          couldn't reach the server and no usable token
 */
import crypto from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

export const API = "https://desktopcarpet.com/api/license";
/* After the first deploy, open https://desktopcarpet.com/api/license/public-key and paste the "publicKey" value here.
   With it, the app can verify tokens offline and can't be fooled by a fake server. */
export const PUBLIC_KEY = "MCowBQYDK2VwAyEAQmp9C3cZpYnCnDDRmq9nRV8Ze/eh3paXrxQuBwERjhw=";

const b64uToBuf = (s) => Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64");

export function verifyToken(token, publicKeyB64 = PUBLIC_KEY) {
  if (!token || !publicKeyB64) return null;
  try {
    const [body, sig] = String(token).split(".");
    const pub = crypto.createPublicKey({ key: Buffer.from(publicKeyB64, "base64"), format: "der", type: "spki" });
    if (!crypto.verify(null, Buffer.from(body), pub, b64uToBuf(sig))) return null;
    return JSON.parse(b64uToBuf(body).toString("utf8"));
  } catch { return null; }
}

export class LicenseClient {
  constructor({ dataDir, deviceName = os.hostname(), api = API, publicKey = PUBLIC_KEY, timeoutMs = 8000 } = {}) {
    if (!dataDir) throw new Error("LicenseClient needs dataDir (e.g. app.getPath('userData'))");
    Object.assign(this, { file: path.join(dataDir, "desktopcarpet-license.json"), deviceName, api, publicKey, timeoutMs });
  }

  async #read() { try { return JSON.parse(await fs.readFile(this.file, "utf8")); } catch { return {}; } }
  async #write(d) { await fs.mkdir(path.dirname(this.file), { recursive: true }); await fs.writeFile(this.file, JSON.stringify(d, null, 2)); }
  async deviceId() {
    const d = await this.#read();
    if (!d.deviceId) { d.deviceId = crypto.randomUUID(); await this.#write(d); }
    return d.deviceId;
  }
  async #call(action, body) {
    const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), this.timeoutMs);
    try {
      const r = await fetch(`${this.api}/${action}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body), signal: ctl.signal });
      return await r.json();
    } finally { clearTimeout(t); }
  }
  #fromServer(r) {
    if (r?.valid) {
      if (this.publicKey && !verifyToken(r.token, this.publicKey)) return { state: "invalid", reason: "bad_signature" };
      return { state: "active", plan: r.plan, expiresAt: r.expiresAt, daysLeft: r.daysLeft, devices: r.devices, maxDevices: r.maxDevices, renewUrl: r.renewUrl };
    }
    if (r?.reason === "expired") return { state: "expired", plan: r.plan, expiresAt: r.expiresAt, renewUrl: r.renewUrl };
    if (r?.reason === "device_limit") return { state: "device_limit", maxDevices: r.maxDevices, devices: r.devices };
    if (r?.reason === "trial_used") return { state: "invalid", reason: "trial_used", plan: r.plan, renewUrl: r.renewUrl };
    return { state: "invalid", reason: r?.reason || "unknown" };
  }

  /** Call when the user enters a key. Registers this computer. */
  async activate(key) {
    const d = await this.#read(), deviceId = await this.deviceId();
    let r;
    try { r = await this.#call("activate", { key, deviceId, deviceName: this.deviceName }); }
    catch { return { state: "error", reason: "offline" }; }
    const s = this.#fromServer(r);
    if (s.state === "active" || s.state === "expired") await this.#write({ ...d, deviceId, key: r.key || key, token: r.token || null, last: s });
    return s;
  }

  /** Call on every launch (and e.g. every few hours while running). */
  async check() {
    const d = await this.#read();
    if (!d.key) return { state: "none" };
    let r;
    try { r = await this.#call("validate", { key: d.key, deviceId: await this.deviceId() }); }
    catch {
      const p = verifyToken(d.token, this.publicKey);
      if (p && p.k === d.key && Date.parse(p.chk) > Date.now()) {
        return { state: "offline", plan: p.plan, expiresAt: p.exp, daysLeft: Math.max(0, Math.ceil((Date.parse(p.exp) - Date.now()) / 86400000)) };
      }
      return { state: "error", reason: "offline" };
    }
    const s = this.#fromServer(r);
    await this.#write({ ...d, token: r?.token || (s.state === "active" ? d.token : null), last: s });
    return s;
  }

  /** Frees this computer's slot (e.g. a "Remove this computer" button). */
  async deactivate() {
    const d = await this.#read();
    if (d.key) { try { await this.#call("deactivate", { key: d.key, deviceId: await this.deviceId() }); } catch {} }
    await this.#write({ deviceId: d.deviceId });
    return { state: "none" };
  }
}
