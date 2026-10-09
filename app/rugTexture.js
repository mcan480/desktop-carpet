// Procedural rug textures. Everything is drawn with Canvas 2D, no image assets.
import { makeSiteRugCanvases } from './siteRugs.js';

export const STYLES = {
  // Monthly drops, drawn with the same code as desktopcarpet.com
  tabriz:  { name: 'Tabriz After Midnight', site: 101 },
  klasik:  { name: 'Klasik Kırmızı', field: '#8a1a1c', field2: '#741417', navy: '#1b2140', cream: '#e8d6b0', gold: '#c4914a', blue: '#3a5878', dark: '#110e18' },
  lacivert:{ name: 'Gece Mavisi',   field: '#1c2a4c', field2: '#16223f', navy: '#7d1a1e', cream: '#e6d5b3', gold: '#c9a35a', blue: '#4f7aa0', dark: '#0d0d17' },
  zumrut:  { name: 'Zümrüt',        field: '#1f4a3a', field2: '#183d30', navy: '#3a1820', cream: '#ecdcb8', gold: '#c99b4e', blue: '#8a2a2a', dark: '#0e1412' },
  kilim:   { name: 'Kilim',         kilim: true },
};

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Lobed, diamond-ish closed shape around (cx, cy).
function lobed(ctx, cx, cy, rx, ry, lobes, amp, p = 1.25, rot = 0) {
  ctx.beginPath();
  const N = 360;
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * Math.PI * 2;
    const c = Math.cos(t), s = Math.sin(t);
    const base = 1 / Math.pow(Math.pow(Math.abs(c), p) + Math.pow(Math.abs(s), p), 1 / p);
    const r = base * (1 + amp * Math.cos(lobes * t + rot));
    const x = cx + c * r * rx, y = cy + s * r * ry;
    i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  }
  ctx.closePath();
}

function rosette(ctx, x, y, r, petals, c1, c2, c3) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = c1;
  for (let i = 0; i < petals; i++) {
    ctx.rotate((Math.PI * 2) / petals);
    ctx.beginPath();
    ctx.ellipse(r * 0.55, 0, r * 0.48, r * 0.24, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = c2;
  ctx.beginPath(); ctx.arc(0, 0, r * 0.36, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = c3;
  ctx.beginPath(); ctx.arc(0, 0, r * 0.16, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function leaf(ctx, x, y, len, ang, col, vein) {
  ctx.save();
  ctx.translate(x, y); ctx.rotate(ang);
  ctx.fillStyle = col;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(len * 0.5, -len * 0.32, len, 0);
  ctx.quadraticCurveTo(len * 0.5, len * 0.32, 0, 0);
  ctx.fill();
  if (vein) {
    ctx.strokeStyle = vein; ctx.lineWidth = Math.max(1, len * 0.05);
    ctx.beginPath(); ctx.moveTo(len * 0.1, 0); ctx.lineTo(len * 0.85, 0); ctx.stroke();
  }
  ctx.restore();
}

function palmette(ctx, x, y, r, ang, c1, c2) {
  ctx.save();
  ctx.translate(x, y); ctx.rotate(ang);
  ctx.fillStyle = c1;
  ctx.beginPath();
  ctx.moveTo(0, r * 0.2);
  for (let i = 0; i <= 6; i++) {
    const a = -Math.PI * 0.85 + (i / 6) * Math.PI * 0.7;
    const rr = r * (i % 2 ? 0.75 : 1);
    ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
  }
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = c2;
  ctx.beginPath(); ctx.ellipse(0, -r * 0.35, r * 0.22, r * 0.38, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

// Draw `fn(x, y, sx, sy)` in all four mirrored quadrants.
function mirror4(W, H, x, y, fn) {
  fn(x, y, 1, 1);
  fn(W - x, y, -1, 1);
  fn(x, H - y, 1, -1);
  fn(W - x, H - y, -1, -1);
}

function frameRect(ctx, x, y, w, h, t) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.rect(x + t, y + t, w - 2 * t, h - 2 * t);
  ctx.fill('evenodd');
}

// Positions along the centre line of a rectangular band, evenly spaced.
function bandPoints(x, y, w, h, step) {
  const pts = [];
  const nx = Math.max(2, Math.round(w / step)), ny = Math.max(2, Math.round(h / step));
  for (let i = 0; i <= nx; i++) { pts.push([x + (w * i) / nx, y, 0, i]); pts.push([x + (w * i) / nx, y + h, 0, i]); }
  for (let j = 1; j < ny; j++) { pts.push([x, y + (h * j) / ny, 1, j]); pts.push([x + w, y + (h * j) / ny, 1, j]); }
  return pts;
}

function persian(ctx, W, H, P, seed) {
  const R = rng(seed);
  const u = H / 100; // unit

  // Base
  ctx.fillStyle = P.dark; ctx.fillRect(0, 0, W, H);

  // Outer binding + minor border
  let o = 1.2 * u;
  ctx.fillStyle = P.navy; frameRect(ctx, o, o, W - 2 * o, H - 2 * o, 4 * u);
  for (const [px, py] of bandPoints(o + 2 * u, o + 2 * u, W - 2 * o - 4 * u, H - 2 * o - 4 * u, 5 * u)) {
    rosette(ctx, px, py, 1.5 * u, 6, P.field, P.cream, P.gold);
  }
  o += 4 * u;
  // guard stripe with dots
  ctx.fillStyle = P.cream; frameRect(ctx, o, o, W - 2 * o, H - 2 * o, 0.5 * u);
  o += 0.5 * u;
  ctx.fillStyle = P.field; frameRect(ctx, o, o, W - 2 * o, H - 2 * o, 1.4 * u);
  ctx.fillStyle = P.cream;
  for (const [px, py] of bandPoints(o + 0.7 * u, o + 0.7 * u, W - 2 * o - 1.4 * u, H - 2 * o - 1.4 * u, 2 * u)) {
    ctx.beginPath(); ctx.arc(px, py, 0.35 * u, 0, Math.PI * 2); ctx.fill();
  }
  o += 1.4 * u;
  ctx.fillStyle = P.cream; frameRect(ctx, o, o, W - 2 * o, H - 2 * o, 0.5 * u);
  o += 0.5 * u;

  // Main border: dark band with vine, palmettes and rosettes
  const mb = 7.5 * u;
  ctx.fillStyle = P.navy; frameRect(ctx, o, o, W - 2 * o, H - 2 * o, mb);
  const bx = o + mb / 2, by = o + mb / 2, bw = W - 2 * o - mb, bh = H - 2 * o - mb;
  // wavy vine around the band
  ctx.strokeStyle = P.gold; ctx.lineWidth = 0.45 * u;
  const vine = (x0, y0, x1, y1, n) => {
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const t = i / 200;
      const x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t;
      const nx = -(y1 - y0), ny = x1 - x0, L = Math.hypot(nx, ny);
      const off = Math.sin(t * n * Math.PI * 2) * 1.9 * u;
      i ? ctx.lineTo(x + (nx / L) * off, y + (ny / L) * off) : ctx.moveTo(x + (nx / L) * off, y + (ny / L) * off);
    }
    ctx.stroke();
  };
  const ncx = Math.round(bw / (11 * u)), ncy = Math.round(bh / (11 * u));
  vine(bx, by, bx + bw, by, ncx); vine(bx, by + bh, bx + bw, by + bh, ncx);
  vine(bx, by, bx, by + bh, ncy); vine(bx + bw, by, bx + bw, by + bh, ncy);
  const pts = bandPoints(bx, by, bw, bh, 5.5 * u);
  const st = 5.5 * u;
  pts.forEach(([px, py, vert, ix]) => {
    const par = ix % 2;
    const corner = (Math.abs(px - bx) < 1 || Math.abs(px - bx - bw) < 1) && (Math.abs(py - by) < 1 || Math.abs(py - by - bh) < 1);
    if (par === 0 || corner) {
      rosette(ctx, px, py, 2.6 * u, 8, P.cream, P.field, P.gold);
    } else {
      const ang = vert ? (px < W / 2 ? 0 : Math.PI) : (py < H / 2 ? Math.PI / 2 : -Math.PI / 2);
      palmette(ctx, px, py, 2.2 * u, ang, P.field, P.gold);
      leaf(ctx, px, py, 2.4 * u, ang + 2.2, P.blue);
      leaf(ctx, px, py, 2.4 * u, ang - 2.2, P.blue);
    }
  });
  o += mb;
  ctx.fillStyle = P.cream; frameRect(ctx, o, o, W - 2 * o, H - 2 * o, 0.5 * u);
  o += 0.5 * u;
  // inner guard: small zigzag
  ctx.fillStyle = P.navy; frameRect(ctx, o, o, W - 2 * o, H - 2 * o, 1.3 * u);
  ctx.fillStyle = P.field;
  for (const [px, py] of bandPoints(o + 0.65 * u, o + 0.65 * u, W - 2 * o - 1.3 * u, H - 2 * o - 1.3 * u, 1.6 * u)) {
    ctx.save(); ctx.translate(px, py); ctx.rotate(Math.PI / 4);
    ctx.fillRect(-0.35 * u, -0.35 * u, 0.7 * u, 0.7 * u); ctx.restore();
  }
  o += 1.3 * u;

  // Field
  const fx = o, fy = o, fw = W - 2 * o, fh = H - 2 * o;
  ctx.save();
  ctx.beginPath(); ctx.rect(fx, fy, fw, fh); ctx.clip();
  ctx.fillStyle = P.field; ctx.fillRect(fx, fy, fw, fh);
  // abrash: subtle horizontal dye variation
  for (let i = 0; i < 14; i++) {
    const yy = fy + R() * fh, hh = (2 + R() * 6) * u;
    ctx.fillStyle = R() < 0.5 ? P.field2 : 'rgba(255,255,255,0.03)';
    ctx.globalAlpha = 0.35 + R() * 0.3;
    ctx.fillRect(fx, yy, fw, hh);
  }
  ctx.globalAlpha = 1;

  const cx = W / 2, cy = H / 2;

  // Vines scattered through the field (mirrored)
  ctx.strokeStyle = P.gold; ctx.lineWidth = 0.35 * u; ctx.globalAlpha = 0.8;
  for (let i = 0; i < 16; i++) {
    const x0 = fx + R() * fw / 2, y0 = fy + R() * fh / 2;
    const x1 = x0 + (R() - 0.5) * 30 * u, y1 = y0 + (R() - 0.5) * 30 * u;
    const kx = (x0 + x1) / 2 + (R() - 0.5) * 20 * u, ky = (y0 + y1) / 2 + (R() - 0.5) * 20 * u;
    mirror4(W, H, 0, 0, (_, __, sx, sy) => {
      const m = (x, ax) => (sx > 0 ? x : W - x);
      const n = (y) => (sy > 0 ? y : H - y);
      ctx.beginPath(); ctx.moveTo(m(x0), n(y0)); ctx.quadraticCurveTo(m(kx), n(ky), m(x1), n(y1)); ctx.stroke();
    });
  }
  ctx.globalAlpha = 1;

  // Small motifs scattered (mirrored); skip the medallion zone.
  const motifs = [];
  for (let tries = 0; tries < 900 && motifs.length < 70; tries++) {
    const x = fx + 2 * u + R() * (fw / 2 - 2 * u), y = fy + 2 * u + R() * (fh / 2 - 2 * u);
    const dx = (x - cx) / (fw * 0.3), dy = (y - cy) / (fh * 0.36);
    if (Math.abs(dx) + Math.abs(dy) < 1.05) continue;
    if (motifs.some((m) => Math.hypot(m.x - x, m.y - y) < 5.2 * u)) continue;
    motifs.push({ x, y, k: R(), a: R() * Math.PI * 2, r: (1.4 + R() * 1.6) * u });
  }
  for (const m of motifs) {
    mirror4(W, H, m.x, m.y, (x, y, sx, sy) => {
      const ang = Math.atan2(Math.sin(m.a) * sy, Math.cos(m.a) * sx);
      if (m.k < 0.35) rosette(ctx, x, y, m.r, 6 + (m.k * 20 | 0) % 3 * 2, P.cream, P.navy, P.gold);
      else if (m.k < 0.6) { palmette(ctx, x, y, m.r, ang, P.navy, P.cream); }
      else if (m.k < 0.85) { leaf(ctx, x, y, m.r * 1.8, ang, P.blue, P.cream); leaf(ctx, x, y, m.r * 1.4, ang + 1.4, P.navy); }
      else { ctx.fillStyle = P.gold; ctx.beginPath(); ctx.arc(x, y, m.r * 0.45, 0, Math.PI * 2); ctx.fill(); }
    });
  }

  // Corner spandrels
  const sp = (x, y) => {
    lobed(ctx, x, y, fw * 0.24, fh * 0.32, 10, 0.07, 1.4);
    ctx.fillStyle = P.cream; ctx.fill();
    lobed(ctx, x, y, fw * 0.24 - 1.2 * u, fh * 0.32 - 1.2 * u, 10, 0.07, 1.4);
    ctx.fillStyle = P.navy; ctx.fill();
  };
  sp(fx, fy); sp(fx + fw, fy); sp(fx, fy + fh); sp(fx + fw, fy + fh);
  for (let i = 0; i < 18; i++) {
    const a = R() * Math.PI / 2, d = (0.25 + R() * 0.6);
    const x = fx + Math.cos(a) * fw * 0.2 * d, y = fy + Math.sin(a) * fh * 0.27 * d;
    const k = R();
    mirror4(W, H, x, y, (px, py, sx, sy) => {
      if (k < 0.5) rosette(ctx, px, py, 1.6 * u, 8, P.field, P.cream, P.gold);
      else leaf(ctx, px, py, 3 * u, Math.atan2(sy * Math.sin(a), sx * Math.cos(a)), P.blue, P.cream);
    });
  }

  // Cream arabesque ring around the medallion
  lobed(ctx, cx, cy, fw * 0.36, fh * 0.44, 14, 0.06, 1.15);
  ctx.fillStyle = P.cream; ctx.fill();
  lobed(ctx, cx, cy, fw * 0.36 - 1.6 * u, fh * 0.44 - 1.6 * u, 14, 0.06, 1.15);
  ctx.fillStyle = P.field; ctx.fill();
  // motifs inside the ring
  for (let i = 0; i < 26; i++) {
    const a = (i / 26) * Math.PI * 2;
    const x = cx + Math.cos(a) * fw * 0.29, y = cy + Math.sin(a) * fh * 0.32;
    if (i % 2) rosette(ctx, x, y, 1.5 * u, 6, P.cream, P.navy, P.gold);
    else leaf(ctx, x, y, 3 * u, a + Math.PI / 2, P.blue, P.cream);
  }

  // Pendants on the long axis
  for (const s of [-1, 1]) {
    const px = cx + s * fw * 0.255;
    lobed(ctx, px, cy, 4.5 * u, 3.4 * u, 6, 0.12, 1.2);
    ctx.fillStyle = P.cream; ctx.fill();
    lobed(ctx, px, cy, 3.5 * u, 2.4 * u, 6, 0.12, 1.2);
    ctx.fillStyle = P.navy; ctx.fill();
    rosette(ctx, px, cy, 1.6 * u, 6, P.gold, P.field, P.cream);
  }

  // Central medallion, layered
  lobed(ctx, cx, cy, fw * 0.215, fh * 0.31, 12, 0.08, 1.05);
  ctx.fillStyle = P.cream; ctx.fill();
  lobed(ctx, cx, cy, fw * 0.215 - 1.1 * u, fh * 0.31 - 1.1 * u, 12, 0.08, 1.05);
  ctx.fillStyle = P.navy; ctx.fill();
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    const x = cx + Math.cos(a) * fw * 0.165, y = cy + Math.sin(a) * fh * 0.235;
    ctx.fillStyle = P.cream; ctx.beginPath(); ctx.arc(x, y, 0.55 * u, 0, Math.PI * 2); ctx.fill();
  }
  lobed(ctx, cx, cy, fw * 0.14, fh * 0.2, 8, 0.1, 1.0);
  ctx.fillStyle = P.field; ctx.fill();
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    palmette(ctx, cx + Math.cos(a) * fw * 0.1, cy + Math.sin(a) * fh * 0.13, 2 * u, a + Math.PI / 2, P.navy, P.gold);
  }
  lobed(ctx, cx, cy, fw * 0.065, fh * 0.095, 8, 0.12, 1.0);
  ctx.fillStyle = P.cream; ctx.fill();
  lobed(ctx, cx, cy, fw * 0.05, fh * 0.072, 8, 0.12, 1.0);
  ctx.fillStyle = P.navy; ctx.fill();
  rosette(ctx, cx, cy, 3.4 * u, 8, P.cream, P.field, P.gold);
  ctx.restore();
}

function kilim(ctx, W, H) {
  const C = { red: '#a3262a', rust: '#c2562a', navy: '#1e2747', cream: '#eadcbc', gold: '#d3a23f', green: '#3e6b4f', dark: '#1a1414' };
  const s = Math.round(H / 64); // block size
  ctx.fillStyle = C.red; ctx.fillRect(0, 0, W, H);
  const blk = (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(x * s, y * s, s + 0.5, s + 0.5); };
  const cols = Math.floor(W / s), rows = Math.floor(H / s);

  // Border: zigzag triangles
  const bw = 7;
  ctx.fillStyle = C.navy;
  ctx.fillRect(0, 0, W, bw * s); ctx.fillRect(0, H - bw * s, W, bw * s);
  ctx.fillRect(0, 0, bw * s, H); ctx.fillRect(W - bw * s, 0, bw * s, H);
  for (let x = 0; x < cols; x++) {
    const h = 3 - Math.abs((x % 6) - 3);
    for (let k = 0; k <= h; k++) { blk(x, 2 + k, C.gold); blk(x, rows - 3 - k, C.gold); }
  }
  for (let y = 0; y < rows; y++) {
    const h = 3 - Math.abs((y % 6) - 3);
    for (let k = 0; k <= h; k++) { blk(2 + k, y, C.gold); blk(cols - 3 - k, y, C.gold); }
  }
  ctx.fillStyle = C.cream;
  ctx.fillRect(bw * s, bw * s, W - 2 * bw * s, s); ctx.fillRect(bw * s, H - (bw + 1) * s, W - 2 * bw * s, s);
  ctx.fillRect(bw * s, bw * s, s, H - 2 * bw * s); ctx.fillRect(W - (bw + 1) * s, bw * s, s, H - 2 * bw * s);

  // Stepped diamond with hooks
  const diamond = (cx, cy, n, palette) => {
    for (let dy = -n; dy <= n; dy++) {
      const w = n - Math.abs(dy);
      for (let dx = -w; dx <= w; dx++) {
        const ring = Math.max(Math.abs(dx) + Math.abs(dy), 0);
        const c = palette[Math.floor((n - ring) / 2) % palette.length];
        blk(cx + dx, cy + dy, c);
      }
    }
    // hooks at the tips
    for (const [hx, hy, ox, oy] of [[cx + n + 1, cy, 1, 0], [cx - n - 1, cy, -1, 0], [cx, cy - n - 1, 0, -1], [cx, cy + n + 1, 0, 1]]) {
      blk(hx, hy, palette[0]); blk(hx + ox, hy + oy, palette[0]);
      blk(hx + ox + oy, hy + oy + ox, palette[0]); blk(hx + ox - oy, hy + oy - ox, palette[0]);
    }
  };
  const ix = bw + 1, iy = bw + 1, iw = cols - 2 * ix, ih = rows - 2 * iy;
  // three large medallions along the long axis
  const midY = iy + Math.floor(ih / 2);
  const n = Math.min(Math.floor(ih / 2) - 5, Math.floor(iw / 6) - 2);
  const step = Math.floor(iw / 3);
  [0, 1, 2].forEach((i) => {
    const cx = ix + Math.floor(step * (i + 0.5));
    diamond(cx, midY, n, i === 1 ? [C.navy, C.cream, C.rust, C.gold, C.green] : [C.cream, C.navy, C.gold, C.red, C.green]);
  });
  // small elibelinde-like motifs between
  [1, 2].forEach((i) => {
    const cx = ix + step * i;
    for (const oy of [-Math.floor(ih / 3), Math.floor(ih / 3)]) diamond(cx, midY + oy, 4, [C.gold, C.navy, C.cream]);
    diamond(cx, midY, 3, [C.cream, C.green]);
  });
  // edge triangles in field corners
  for (const [x, y] of [[ix + 3, iy + 3], [ix + iw - 4, iy + 3], [ix + 3, iy + ih - 4], [ix + iw - 4, iy + ih - 4]]) diamond(x, y, 2, [C.navy, C.gold]);
}

function addWeave(ctx, W, H, seed, strength = 26) {
  const R = rng(seed + 99);
  const img = ctx.getImageData(0, 0, W, H);
  const d = img.data;
  for (let y = 0; y < H; y++) {
    const row = Math.sin(y * 1.9) * 4;
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      const knot = ((x >> 1) + (y >> 1)) & 1 ? 5 : -5;
      const n = (R() - 0.5) * strength + knot + row;
      d[i] = Math.max(0, Math.min(255, d[i] + n));
      d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + n));
      d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + n));
    }
  }
  ctx.putImageData(img, 0, 0);
}

export function makeRugCanvases(styleKey, aspect = 1.58, seed = 7) {
  const P = STYLES[styleKey] || STYLES.klasik;
  if (P.site) return { ...makeSiteRugCanvases(P.site), bump: makeBump(seed) };
  const H = 1280, W = Math.round(H * aspect);
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  if (P.kilim) kilim(ctx, W, H); else persian(ctx, W, H, P, seed);
  addWeave(ctx, W, H, seed);

  // Back side: same pattern, faded and flattened.
  const b = document.createElement('canvas');
  b.width = W / 2; b.height = H / 2;
  const bctx = b.getContext('2d');
  bctx.filter = 'saturate(0.55) brightness(0.72) contrast(0.85) blur(1px)';
  bctx.drawImage(c, 0, 0, b.width, b.height);
  bctx.filter = 'none';

  const p = makeBump(seed);
  return { front: c, back: b, bump: p };
}

function makeBump(seed) {
  const p = document.createElement('canvas');
  p.width = 512; p.height = 512;
  const pctx = p.getContext('2d');
  const R = rng(seed + 5);
  const img = pctx.createImageData(512, 512);
  for (let i = 0; i < 512 * 512; i++) {
    const x = i % 512, y = (i / 512) | 0;
    const v = 128 + (R() - 0.5) * 90 + (((x >> 1) + (y >> 1)) & 1 ? 25 : -25);
    img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v; img.data[i * 4 + 3] = 255;
  }
  pctx.putImageData(img, 0, 0);
  return p;
}
