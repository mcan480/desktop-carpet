// Procedural rug textures. Everything is drawn with Canvas 2D, no image assets.
import { makeSiteRugCanvases } from './siteRugs.js';

export const STYLES = {
  // Monthly drops, drawn with the same code as desktopcarpet.com
  tabriz:  { name: 'Tabriz After Midnight', site: 101 },
  klasik:  { name: 'Klasik Kırmızı', field: '#8a1a1c', field2: '#741417', navy: '#1b2140', cream: '#e8d6b0', gold: '#c4914a', blue: '#3a5878', dark: '#110e18' },
  lacivert:{ name: 'Gece Mavisi',   field: '#1c2a4c', field2: '#16223f', navy: '#7d1a1e', cream: '#e6d5b3', gold: '#c9a35a', blue: '#4f7aa0', dark: '#0d0d17' },
  zumrut:  { name: 'Zümrüt',        field: '#1f4a3a', field2: '#183d30', navy: '#3a1820', cream: '#ecdcb8', gold: '#c99b4e', blue: '#8a2a2a', dark: '#0e1412' },
  kilim:   { name: 'Kilim',         kilim: true },
  // Halloween drops
  balkabagi:{ name: 'Balkabağı Tarlası', halloween: 'pumpkin' },
  orumcek:  { name: 'Örümcek Ağı',       halloween: 'web' },
  hayalet:  { name: 'Hayalet Gecesi',    halloween: 'ghost' },
  // USA pack. Woven / pieced / knotted:
  yildizlar: { name: 'Yıldızlar ve Çizgiler', america: 'flag' },
  mesa:      { name: 'Çöl Mesası',            america: 'mesa' },
  yorgan:    { name: 'Yama Yorgan',           america: 'quilt' },
  ekose:     { name: 'Oduncu Ekose',          america: 'plaid' },
  kanyon:    { name: 'Kanyon Gün Batımı',     america: 'canyon' },
  ambar:     { name: 'Ambar Yıldızı',         america: 'hex' },
  yalniz:    { name: 'Yalnız Yıldız',         america: 'lonestar' },
  bizon:     { name: 'Bizon Ovası',           america: 'bison' },
  // ...and hooked rugs (pictures made of wool loops):
  kartpostal:{ name: 'Amerika’dan Selamlar', america: 'postcard', fonts: true, hooked: true },
  millipark: { name: 'Ulusal Park',          america: 'park', fonts: true, hooked: true },
  beyzbol:   { name: 'Beyzbol Sahası',       america: 'baseball', hooked: true },
  basketbol: { name: 'Basketbol Sahası',     america: 'basketball', hooked: true },
  diner:     { name: 'Diner',                america: 'diner', fonts: true, hooked: true },
  route66:   { name: 'Route 66',             america: 'route66', fonts: true, hooked: true },
  // Canada pack. Woven / pieced / knotted:
  akcaagac:  { name: 'Akçaağaç',            canada: 'flag' },
  yaprak:    { name: 'Akçaağaç Yorganı',    canada: 'quilt' },
  kayalik:   { name: 'Kayalık Dağlar',      canada: 'rockies' },
  atlantik:  { name: 'Atlantik Ekosesi',    canada: 'tartan' },
  geyik:     { name: 'Kanada Geyiği',       canada: 'moose' },
  kazlar:    { name: 'Kanada Kazları',      canada: 'geese' },
  dalgic:    { name: 'Buz Dalgıcı',         canada: 'loon' },
  // ...and hooked rugs:
  kanadakart:{ name: 'Kanada’dan Selamlar', canada: 'postcard', fonts: true, hooked: true },
  hokey:     { name: 'Hokey Sahası',        canada: 'hockey', hooked: true },
  kuzeyisik: { name: 'Kuzey Işıkları',      canada: 'aurora', hooked: true },
  fener:     { name: 'Deniz Feneri',        canada: 'lighthouse', hooked: true },
  kutupayisi:{ name: 'Kutup Ayısı',         canada: 'bear', hooked: true },
  // Mexico pack. Woven / knotted:
  sarape:    { name: 'Sarape',              mexico: 'sarape' },
  greca:     { name: 'Greca',               mexico: 'greca' },
  cini:      { name: 'Mavi Çini',           mexico: 'tile' },
  agave:     { name: 'Agave Tarlası',       mexico: 'agave' },
  kafatasi:  { name: 'Şeker Kafatası',      mexico: 'skull' },
  monark:    { name: 'Monark Kelebekleri',  mexico: 'monarch' },
  jaguar:    { name: 'Renkli Jaguar',       mexico: 'jaguar' },
  // ...and hooked rugs:
  meksikakart:{ name: 'Meksika’dan Selamlar', mexico: 'postcard', fonts: true, hooked: true },
  piramit:   { name: 'Piramit',             mexico: 'pyramid', hooked: true },
  sokak:     { name: 'Renkli Sokak',        mexico: 'street', hooked: true },
  trajinera: { name: 'Trajinera',           mexico: 'trajinera', hooked: true },
  tulum:     { name: 'Tulum Plajı',         mexico: 'tulum', hooked: true },
  // Shows whatever wallpaper is behind it, so the desktop icons underneath seem to vanish.
  gorunmez:{ name: 'Görünmez',      invisible: true },
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

// ---------- Halloween ----------
// Woven like the kilim: everything is laid out on a grid of knots ("blocks"), so the motifs keep the stepped,
// hand-knotted look instead of looking printed.
function knotGrid(ctx, W, H, rowsWanted) {
  const s = Math.round(H / rowsWanted);
  const cols = Math.round(W / s), rows = Math.round(H / s);
  // Knots stretch by a fraction of a pixel so the grid reaches every edge of the canvas (a whole number of square
  // knots rarely fits exactly, and the leftover strip showed as a pale line along the rug's edge). Edges are rounded
  // to whole pixels so neighbouring knots meet without a seam.
  const kx = W / cols, ky = H / rows;
  const blk = (x, y, c) => {
    if (x < 0 || y < 0 || x >= cols || y >= rows) return;
    const x0 = Math.round(x * kx), y0 = Math.round(y * ky);
    ctx.fillStyle = c; ctx.fillRect(x0, y0, Math.round((x + 1) * kx) - x0, Math.round((y + 1) * ky) - y0);
  };
  return { s, cols, rows, blk };
}

// A border of zigzag "teeth" in two colours, `bw` knots deep.
function toothBorder(g, bw, base, tooth, line) {
  const { cols, rows, blk } = g;
  for (let x = 0; x < cols; x++) for (let k = 0; k < bw; k++) { blk(x, k, base); blk(x, rows - 1 - k, base); }
  for (let y = 0; y < rows; y++) for (let k = 0; k < bw; k++) { blk(k, y, base); blk(cols - 1 - k, y, base); }
  for (let x = 0; x < cols; x++) {
    const h = 2 - Math.abs((x % 4) - 2);
    for (let k = 0; k <= h; k++) { blk(x, 1 + k, tooth); blk(x, rows - 2 - k, tooth); }
  }
  for (let y = 0; y < rows; y++) {
    const h = 2 - Math.abs((y % 4) - 2);
    for (let k = 0; k <= h; k++) { blk(1 + k, y, tooth); blk(cols - 2 - k, y, tooth); }
  }
  for (let x = bw; x < cols - bw; x++) { blk(x, bw, line); blk(x, rows - 1 - bw, line); }
  for (let y = bw; y < rows - bw; y++) { blk(bw, y, line); blk(cols - 1 - bw, y, line); }
}

// Jack-o'-lantern made of knots, centred on (cx, cy), r knots wide each side.
function pumpkinKnots(blk, cx, cy, r, C, face) {
  const ry = Math.round(r * 0.8);
  for (let dy = -ry; dy <= ry; dy++) for (let dx = -r; dx <= r; dx++) {
    const e = (dx * dx) / (r * r) + (dy * dy) / (ry * ry);
    if (e > 1.02) continue;
    const rib = Math.abs(dx) === Math.round(r * 0.45) || dx === 0;
    blk(cx + dx, cy + dy, e > 0.78 ? C.orange2 : rib ? C.orange2 : C.orange);
  }
  // stem and leaf
  for (let k = 1; k <= Math.max(2, Math.round(r * 0.3)); k++) blk(cx, cy - ry - k, C.stem);
  blk(cx + 1, cy - ry - 1, C.leaf); blk(cx + 2, cy - ry - 2, C.leaf); blk(cx + 2, cy - ry - 1, C.leaf);
  if (!face) return;
  const ey = cy - Math.round(ry * 0.22), ex = Math.round(r * 0.42), es = Math.max(1, Math.round(r * 0.16)); // eye size
  for (const sx of [-1, 1]) { // triangle eyes, point up
    for (let k = 0; k <= es; k++) for (let dx = -k; dx <= k; dx++) blk(cx + sx * ex + dx, ey - es + k, C.glow);
  }
  for (let k = 0; k < Math.max(1, Math.round(es * 0.6)); k++) for (let dx = -k; dx <= k; dx++) blk(cx + dx, ey + 2 + k, C.glow); // nose
  const my = cy + Math.round(ry * 0.38), mw = Math.round(r * 0.62), mt = Math.max(1, Math.round(r * 0.12)); // grin
  for (let t = 0; t < mt + 1; t++) for (let dx = -mw + t; dx <= mw - t; dx++) {
    const tooth = t === 0 && (Math.abs(dx - Math.round(mw / 2)) < Math.max(1, mt) || Math.abs(dx + Math.round(mw / 2)) < Math.max(1, mt));
    if (!tooth) blk(cx + dx, my + t, C.glow);
  }
  for (let k = 1; k <= Math.max(1, Math.round(mt * 0.8)); k++) { blk(cx - mw - k, my - k, C.glow); blk(cx + mw + k, my - k, C.glow); }
}

function batKnots(blk, cx, cy, c, flip = 1) {
  const pts = [[0, 0], [-1, 0], [1, 0], [0, -1], [-1, -1], [1, -1], // body + ears
    [-2, 0], [-3, -1], [-4, -1], [-5, 0], [-4, 0], [-3, 0], [-5, 1], [-3, 1], // left wing
    [2, 0], [3, -1], [4, -1], [5, 0], [4, 0], [3, 0], [5, 1], [3, 1]];
  for (const [x, y] of pts) blk(cx + x * flip, cy + y, c);
}

function halloweenPumpkin(ctx, W, H) {
  const C = { field: '#1b1216', field2: '#24161c', orange: '#e0761f', orange2: '#b5520f', glow: '#ffd25a', stem: '#5a3a1a', leaf: '#4f7a3a',
              purple: '#4b2366', purple2: '#6c3591', cream: '#efe0bd', black: '#0d0a0c' };
  const g = knotGrid(ctx, W, H, 72), { cols, rows, blk } = g;
  ctx.fillStyle = C.field; ctx.fillRect(0, 0, W, H);
  // faint diagonal lattice in the field
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) if ((x + y) % 8 === 0 || (x - y + 800) % 8 === 0) blk(x, y, C.field2);
  toothBorder(g, 7, C.purple, C.orange, C.cream);
  // candy-corn stripe inside the border
  const inset = 9;
  for (let x = inset; x < cols - inset; x++) {
    const c = [C.cream, C.orange, C.glow][Math.floor(x / 2) % 3];
    blk(x, inset, c); blk(x, rows - 1 - inset, c);
  }
  // pumpkin patch: rows of jack-o'-lanterns, the middle one big
  const ix = inset + 3, iw = cols - 2 * ix, iy = inset + 3, ih = rows - 2 * iy;
  const big = Math.floor(Math.min(ih * 0.36, iw * 0.15));
  pumpkinKnots(blk, Math.floor(cols / 2), Math.floor(rows / 2) + 1, big, C, true);
  const small = Math.max(5, Math.floor(big * 0.55));
  for (const fx of [0.13, 0.87]) for (const fy of [0.28, 0.74]) pumpkinKnots(blk, ix + Math.round(iw * fx), iy + Math.round(ih * fy), small, C, true);
  for (const fx of [0.33, 0.67]) pumpkinKnots(blk, ix + Math.round(iw * fx), iy + Math.round(ih * 0.86), Math.max(3, small - 3), C, false);
  // a few bats
  for (const [fx, fy, fl] of [[0.31, 0.13, 1], [0.69, 0.13, -1], [0.5, 0.93, 1]]) batKnots(blk, ix + Math.round(iw * fx), iy + Math.round(ih * fy), C.purple2, fl);
}

function halloweenWeb(ctx, W, H, seed) {
  const R = rng(seed + 31);
  const C = { field: '#2a1236', field2: '#331745', web: '#e9dfc6', web2: 'rgba(233,223,198,.55)', border: '#120a16', border2: '#e0761f',
              moon: '#f3d27a', bat: '#0e0812', spider: '#0b070d', eye: '#d63a2f' };
  const u = H / 100;
  ctx.fillStyle = C.field; ctx.fillRect(0, 0, W, H);
  // field with soft abrash bands (real rugs vary in dye lot)
  for (let i = 0; i < 9; i++) { ctx.fillStyle = i % 2 ? C.field2 : C.field; ctx.globalAlpha = 0.5; ctx.fillRect(0, (H / 9) * i, W, H / 9); }
  ctx.globalAlpha = 1;
  // border: black band with orange crescent moons and bats
  ctx.fillStyle = C.border; frameRect(ctx, 0, 0, W, H, 11 * u);
  ctx.fillStyle = C.border2; frameRect(ctx, 11 * u, 11 * u, W - 22 * u, H - 22 * u, 1.2 * u);
  ctx.fillStyle = C.web; frameRect(ctx, 0.9 * u, 0.9 * u, W - 1.8 * u, H - 1.8 * u, 0.5 * u);
  // Motifs sit in the middle of the black band (between the cream edge line at ~1.4u and the orange line at 11u)
  // and stay well inside it: moons 2u across the radius, bats about 6u wide.
  const bc = 6.2 * u;
  for (const [x, y, side, i] of bandPoints(bc, bc, W - 2 * bc, H - 2 * bc, 12 * u)) {
    ctx.save(); ctx.translate(x, y); ctx.scale(0.78, 0.78);
    if (i % 2) { // crescent moon
      ctx.fillStyle = C.moon; ctx.beginPath(); ctx.arc(0, 0, 2.6 * u, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = C.border; ctx.beginPath(); ctx.arc(1.1 * u, -0.6 * u, 2.3 * u, 0, Math.PI * 2); ctx.fill();
    } else { // little bat
      ctx.fillStyle = C.border2;
      ctx.beginPath(); ctx.ellipse(0, 0, 0.9 * u, 1.3 * u, 0, 0, Math.PI * 2); ctx.fill();
      for (const sx of [-1, 1]) {
        ctx.beginPath(); ctx.moveTo(sx * 0.6 * u, -0.6 * u);
        ctx.quadraticCurveTo(sx * 2.4 * u, -2 * u, sx * 4 * u, -0.8 * u);
        ctx.quadraticCurveTo(sx * 3.2 * u, 0.2 * u, sx * 2.7 * u, 0.9 * u);
        ctx.quadraticCurveTo(sx * 2 * u, 0.2 * u, sx * 1.4 * u, 0.9 * u);
        ctx.quadraticCurveTo(sx * 1 * u, 0.2 * u, sx * 0.6 * u, 0.6 * u);
        ctx.fill();
      }
    }
    ctx.restore();
  }
  // big web medallion
  const cx = W / 2, cy = H / 2, rx = W * 0.3, ry = H * 0.32, spokes = 16;
  ctx.strokeStyle = C.web; ctx.lineCap = 'round';
  ctx.lineWidth = 0.55 * u;
  for (let k = 0; k < spokes; k++) {
    const a = (k / spokes) * Math.PI * 2;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * rx * 1.08, cy + Math.sin(a) * ry * 1.08); ctx.stroke();
  }
  ctx.lineWidth = 0.42 * u;
  for (let ring = 1; ring <= 8; ring++) {
    const f = ring / 8;
    ctx.beginPath();
    for (let k = 0; k <= spokes; k++) {
      const a0 = (k / spokes) * Math.PI * 2, a1 = ((k + 1) / spokes) * Math.PI * 2;
      const x0 = cx + Math.cos(a0) * rx * f, y0 = cy + Math.sin(a0) * ry * f;
      const x1 = cx + Math.cos(a1) * rx * f, y1 = cy + Math.sin(a1) * ry * f;
      const sag = 0.82; // threads sag toward the centre between spokes
      const mx = cx + (Math.cos((a0 + a1) / 2) * rx * f) * sag, my = cy + (Math.sin((a0 + a1) / 2) * ry * f) * sag;
      if (k === 0) ctx.moveTo(x0, y0);
      ctx.quadraticCurveTo(mx, my, x1, y1);
    }
    ctx.stroke();
  }
  // corner webs
  ctx.strokeStyle = C.web2; ctx.lineWidth = 0.35 * u;
  mirror4(W, H, 13 * u, 13 * u, (x, y, sx, sy) => {
    for (let k = 0; k <= 5; k++) {
      const a = (k / 5) * Math.PI / 2;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + sx * Math.cos(a) * 20 * u, y + sy * Math.sin(a) * 20 * u); ctx.stroke();
    }
    for (let r = 5; r <= 20; r += 5) {
      ctx.beginPath();
      for (let k = 0; k <= 5; k++) { const a = (k / 5) * Math.PI / 2; const px = x + sx * Math.cos(a) * r * u, py = y + sy * Math.sin(a) * r * u; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
      ctx.stroke();
    }
  });
  // spider hanging off-centre on a thread
  const spx = cx + rx * 0.34, spy = cy + ry * 0.18;
  ctx.strokeStyle = C.web; ctx.lineWidth = 0.3 * u;
  ctx.beginPath(); ctx.moveTo(spx, cy - ry * 0.55); ctx.lineTo(spx, spy - 2.4 * u); ctx.stroke();
  ctx.strokeStyle = C.spider; ctx.lineWidth = 0.7 * u;
  for (const sx of [-1, 1]) for (let k = 0; k < 4; k++) {
    const yy = spy - 1.2 * u + k * 1.1 * u;
    ctx.beginPath(); ctx.moveTo(spx, yy); ctx.quadraticCurveTo(spx + sx * 3.2 * u, yy - 2.2 * u + k * 0.6 * u, spx + sx * 4.6 * u, yy + 1.4 * u + k * 0.4 * u); ctx.stroke();
  }
  ctx.fillStyle = C.spider;
  ctx.beginPath(); ctx.ellipse(spx, spy + 1.2 * u, 2.1 * u, 2.7 * u, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(spx, spy - 1.6 * u, 1.4 * u, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.eye;
  ctx.beginPath(); ctx.arc(spx - 0.5 * u, spy - 1.8 * u, 0.32 * u, 0, Math.PI * 2); ctx.arc(spx + 0.5 * u, spy - 1.8 * u, 0.32 * u, 0, Math.PI * 2); ctx.fill();
  // dew drops on the web
  ctx.fillStyle = 'rgba(255,245,220,.8)';
  for (let i = 0; i < 26; i++) {
    const a = R() * Math.PI * 2, f = 0.2 + R() * 0.8;
    ctx.beginPath(); ctx.arc(cx + Math.cos(a) * rx * f, cy + Math.sin(a) * ry * f, 0.35 * u, 0, Math.PI * 2); ctx.fill();
  }
}

function ghostShape(ctx, x, y, w, h, body, eye, tilt = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(tilt);
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.moveTo(-w / 2, 0);
  ctx.arc(0, 0, w / 2, Math.PI, 0); // head
  ctx.lineTo(w / 2, h);
  const waves = 4;
  for (let i = waves; i > 0; i--) { // wavy hem
    const x0 = -w / 2 + (w * i) / waves, x1 = -w / 2 + (w * (i - 1)) / waves;
    ctx.quadraticCurveTo((x0 + x1) / 2, h + (i % 2 ? -w * 0.16 : w * 0.16), x1, h);
  }
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = eye;
  ctx.beginPath(); ctx.ellipse(-w * 0.17, -w * 0.02, w * 0.07, w * 0.11, 0, 0, Math.PI * 2); ctx.ellipse(w * 0.17, -w * 0.02, w * 0.07, w * 0.11, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, w * 0.2, w * 0.08, w * 0.1, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function halloweenGhost(ctx, W, H, seed) {
  const R = rng(seed + 77);
  const C = { sky: '#14263a', sky2: '#1c3550', ghost: '#f1ecdf', ghost2: '#cfd8d4', eye: '#141016', moon: '#f4d987', star: '#f6e7b0',
              border: '#0c1622', border2: '#5e8a6e', bone: '#efe6cf', candy: ['#efe0bd', '#e0761f', '#ffd25a'] };
  const u = H / 100;
  const grad = ctx.createLinearGradient(0, 0, 0, H); grad.addColorStop(0, C.sky); grad.addColorStop(1, C.sky2);
  ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
  // border: dark band with a row of bones, framed by a candy-corn stripe
  ctx.fillStyle = C.border; frameRect(ctx, 0, 0, W, H, 11 * u);
  const stripe = 1.4 * u;
  for (let i = 0; i < 3; i++) { ctx.fillStyle = C.candy[i]; frameRect(ctx, 11 * u + i * stripe, 11 * u + i * stripe, W - 2 * (11 * u + i * stripe), H - 2 * (11 * u + i * stripe), stripe); }
  ctx.fillStyle = C.border2; frameRect(ctx, 0.9 * u, 0.9 * u, W - 1.8 * u, H - 1.8 * u, 0.6 * u);
  const bc = 6.2 * u;
  for (const [x, y, side] of bandPoints(bc, bc, W - 2 * bc, H - 2 * bc, 9 * u)) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(side ? Math.PI / 2 : 0); ctx.scale(0.85, 0.85);
    ctx.fillStyle = C.bone;
    ctx.fillRect(-2.6 * u, -0.55 * u, 5.2 * u, 1.1 * u);
    for (const sx of [-1, 1]) for (const sy of [-1, 1]) { ctx.beginPath(); ctx.arc(sx * 2.7 * u, sy * 0.75 * u, 0.85 * u, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
  }
  // stars
  const fx0 = 16 * u, fy0 = 16 * u, fw = W - 32 * u, fh = H - 32 * u;
  ctx.fillStyle = C.star;
  for (let i = 0; i < 60; i++) {
    const x = fx0 + R() * fw, y = fy0 + R() * fh, r = (0.25 + R() * 0.45) * u;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  // big moon with a ghost floating in front of it
  const mx = W / 2, my = H * 0.46, mr = 21 * u;
  const halo = ctx.createRadialGradient(mx, my, mr * 0.8, mx, my, mr * 1.7);
  halo.addColorStop(0, 'rgba(244,217,135,.35)'); halo.addColorStop(1, 'rgba(244,217,135,0)');
  ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(mx, my, mr * 1.7, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.moon; ctx.beginPath(); ctx.arc(mx, my, mr, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(200,160,80,.35)';
  for (const [dx, dy, r] of [[-6, -5, 3.2], [7, 4, 2.4], [-3, 8, 1.8], [5, -9, 1.4]]) { ctx.beginPath(); ctx.arc(mx + dx * u, my + dy * u, r * u, 0, Math.PI * 2); ctx.fill(); }
  ghostShape(ctx, mx, my + 2 * u, 20 * u, 18 * u, C.ghost, C.eye);
  // smaller ghosts drifting at the sides, mirrored like a rug's corner motifs
  mirror4(W, H, W * 0.22, H * 0.33, (x, y, sx, sy) => ghostShape(ctx, x, y - (sy < 0 ? 6 * u : 0), 10 * u, 9 * u, sy > 0 ? C.ghost : C.ghost2, C.eye, sx * 0.12));
  // graveyard hill along the bottom of the field
  ctx.fillStyle = '#0f1d2b';
  ctx.beginPath(); ctx.moveTo(fx0, fy0 + fh);
  ctx.quadraticCurveTo(W * 0.3, H * 0.72, W * 0.5, H * 0.79); ctx.quadraticCurveTo(W * 0.72, H * 0.86, fx0 + fw, H * 0.76);
  ctx.lineTo(fx0 + fw, fy0 + fh); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#2d4152';
  for (const [x, w, h] of [[0.28, 3.4, 6], [0.36, 2.8, 4.6], [0.64, 3.2, 5.4], [0.72, 2.6, 4]]) {
    const bx = W * x, by = H * 0.83;
    ctx.beginPath(); ctx.moveTo(bx - w * u, by); ctx.lineTo(bx - w * u, by - h * u + w * u); ctx.arc(bx, by - h * u + w * u, w * u, Math.PI, 0); ctx.lineTo(bx + w * u, by); ctx.closePath(); ctx.fill();
  }
}

// ---------- America pack ----------
// Classic American graphics, drawn crisp the way the originals were printed or painted: a large-letter postcard,
// a national-park poster, a ballfield and a court seen from above, a diner floor with its neon, Route 66.

// Display fonts for the lettering. They ship with the panel; the rug page loads them before drawing these rugs.
export const RUG_FONTS = [
  ['Shrikhand', 'shrikhand-latin-400-normal.woff2', '400'],
  ['Instrument Sans', 'instrument-sans-latin-700-normal.woff2', '700'],
];
export async function loadRugFonts(base = '../panel/fonts/') {
  await Promise.all(RUG_FONTS.map(async ([family, file, weight]) => {
    try { const f = new FontFace(family, `url(${base}${file})`, { weight }); await f.load(); document.fonts.add(f); } catch {}
  }));
}
const SCRIPT = '"Shrikhand", Georgia, serif', BLOCK = '700 1px "Instrument Sans", "Arial Black", Arial, sans-serif';
const blockFont = (px) => BLOCK.replace('1px', `${px}px`);

function star5(ctx, x, y, r, rot = -Math.PI / 2) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) { const a = rot + (i * Math.PI) / 5, rr = i % 2 ? r * 0.42 : r; i ? ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr) : ctx.moveTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
  ctx.closePath(); ctx.fill();
}
function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x, y, w, h, r) : ctx.rect(x, y, w, h); }

// Little scenes used inside the postcard letters. Each fills (0,0,w,h). They're kept to a few big shapes: a letter
// is only a handful of loops wide, so fine detail would just turn into speckles.
const SCENES = [
  (c, w, h) => { // snowy mountain over a lake
    c.fillStyle = '#86bedc'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#5b6f9a'; c.beginPath(); c.moveTo(-w * 0.2, h * 0.72); c.lineTo(w * 0.5, h * 0.12); c.lineTo(w * 1.2, h * 0.72); c.fill();
    c.fillStyle = '#f4f6f6'; c.beginPath(); c.moveTo(w * 0.27, h * 0.32); c.lineTo(w * 0.5, h * 0.12); c.lineTo(w * 0.73, h * 0.32); c.fill();
    c.fillStyle = '#2f6b52'; c.fillRect(0, h * 0.68, w, h * 0.1); c.fillStyle = '#3d86a8'; c.fillRect(0, h * 0.78, w, h);
  },
  (c, w, h) => { // beach at sunset
    c.fillStyle = '#f39a52'; c.fillRect(0, 0, w, h); c.fillStyle = '#ffd27d'; c.beginPath(); c.arc(w * 0.5, h * 0.5, w * 0.3, Math.PI, 0); c.fill();
    c.fillStyle = '#2a8fa0'; c.fillRect(0, h * 0.5, w, h * 0.25); c.fillStyle = '#f1d9a6'; c.fillRect(0, h * 0.75, w, h);
  },
  (c, w, h) => { // desert mesa
    c.fillStyle = '#f2b45a'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#b4532f'; c.fillRect(w * 0.12, h * 0.3, w * 0.6, h * 0.5); c.fillRect(0, h * 0.48, w, h * 0.3);
    c.fillStyle = '#d99a5a'; c.fillRect(0, h * 0.76, w, h);
  },
  (c, w, h) => { // city at dusk
    c.fillStyle = '#2b3a6b'; c.fillRect(0, 0, w, h * 0.5); c.fillStyle = '#e98a6c'; c.fillRect(0, h * 0.5, w, h);
    c.fillStyle = '#1b2240'; for (const [x, bw, bh] of [[0, 0.3, 0.55], [0.28, 0.24, 0.8], [0.5, 0.28, 0.62], [0.76, 0.3, 0.72]]) c.fillRect(w * x, h * (1 - bh), w * bw, h * bh);
    c.fillStyle = '#f2c75c'; for (let i = 0; i < 4; i++) for (let k = 0; k < 3; k++) c.fillRect(w * (0.08 + i * 0.24), h * (0.5 + k * 0.15), w * 0.07, h * 0.05);
  },
  (c, w, h) => { // pine forest
    c.fillStyle = '#a8d0c4'; c.fillRect(0, 0, w, h); c.fillStyle = '#5f9a7f'; c.fillRect(0, h * 0.55, w, h);
    c.fillStyle = '#24543f'; c.beginPath(); c.moveTo(w * 0.5, h * 0.08); c.lineTo(w * 1.1, h * 0.95); c.lineTo(-w * 0.1, h * 0.95); c.fill();
  },
  (c, w, h) => { // red barn in a wheat field
    c.fillStyle = '#9fcbe2'; c.fillRect(0, 0, w, h); c.fillStyle = '#e8b64c'; c.fillRect(0, h * 0.62, w, h);
    c.fillStyle = '#a3302f'; c.fillRect(w * 0.15, h * 0.36, w * 0.7, h * 0.3); c.beginPath(); c.moveTo(w * 0.08, h * 0.38); c.lineTo(w * 0.5, h * 0.16); c.lineTo(w * 0.92, h * 0.38); c.fill();
    c.fillStyle = '#efe3c6'; c.fillRect(w * 0.4, h * 0.46, w * 0.2, h * 0.2);
  },
  (c, w, h) => { // stars and stripes
    for (let i = 0; i < 7; i++) { c.fillStyle = i % 2 ? '#efe3c6' : '#b5312b'; c.fillRect(0, (h * i) / 7, w, h / 7 + 1); }
    c.fillStyle = '#25345e'; c.fillRect(0, 0, w * 0.6, h * 0.43); c.fillStyle = '#efe3c6';
    for (let r = 0; r < 2; r++) for (let k = 0; k < 2; k++) star5(c, w * (0.16 + k * 0.28), h * (0.11 + r * 0.2), w * 0.09);
  },
];

// Large-letter postcard: "Greetings from AMERICA", every letter a little scene, over a blue sky and green hills.
// Sized in loops of the finished hooked rug, so the script is thick enough to read once it's made of wool.
function americaPostcard(ctx, W, H, word = 'AMERICA', scenes = SCENES) {
  const { cols, rows } = hookedPictureLoops(W, H), Lx = W / cols, Ly = H / rows;
  ctx.fillStyle = '#f3ead6'; ctx.fillRect(0, 0, W, H);                       // card
  const px = 2 * Lx, py = 2 * Ly, pw = W - 2 * px, ph = H - 2 * py;
  ctx.save(); roundRect(ctx, px, py, pw, ph, 2 * Ly); ctx.clip();
  const sky = ctx.createLinearGradient(0, py, 0, py + ph); sky.addColorStop(0, '#3a80b4'); sky.addColorStop(0.5, '#8cc2db'); sky.addColorStop(1, '#d6ecef');
  ctx.fillStyle = sky; ctx.fillRect(px, py, pw, ph);
  const hill = (y0, amp, col, f0) => {
    ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(px, py + ph);
    for (let k = 0; k <= 48; k++) { const t = k / 48; ctx.lineTo(px + pw * t, py + ph * (y0 - amp * Math.sin(t * Math.PI * 2 + f0))); }
    ctx.lineTo(px + pw, py + ph); ctx.fill();
  };
  hill(0.76, 0.05, '#86b06a', 0.6); hill(0.86, 0.04, '#4f8a55', 2.4);
  ctx.restore();

  // AMERICA: tall block letters, each filled with a scene, with a cream outline and a navy extrusion. Built at full
  // width on its own canvas, then squeezed sideways to fit, like the condensed letters on the real cards.
  const cap = 22 * Ly, base = 48 * Ly;
  const probe = document.createElement('canvas').getContext('2d'); probe.font = blockFont(100);
  const F = cap / (probe.measureText('M').actualBoundingBoxAscent / 100);
  probe.font = blockFont(F);
  const gap = F * 0.05, depth = 2 * Lx, line = 2.2 * Lx;
  const widths = [...word].map((ch) => probe.measureText(ch).width);
  const ww = widths.reduce((a, b) => a + b, 0) + gap * (word.length - 1) + depth + line * 2;
  const wc = document.createElement('canvas'); wc.width = Math.ceil(ww); wc.height = Math.ceil(F * 1.2);
  const w2 = wc.getContext('2d'); w2.font = blockFont(F); w2.textBaseline = 'alphabetic'; w2.lineJoin = 'round';
  const wb = F;                                                                // baseline inside the word canvas
  let x = line;
  for (let i = 0; i < word.length; i++) {
    const ch = word[i], cw = widths[i];
    w2.fillStyle = '#1d2a4a'; for (let d = depth; d > 0; d -= 2) w2.fillText(ch, x + d, wb + d); // extrusion
    w2.strokeStyle = '#f6efdc'; w2.lineWidth = line; w2.strokeText(ch, x, wb);
    const off = document.createElement('canvas'); off.width = Math.ceil(cw) + 4; off.height = Math.ceil(F * 1.05);
    const oc = off.getContext('2d');
    scenes[i % scenes.length](oc, off.width, off.height);
    oc.globalCompositeOperation = 'destination-in'; oc.font = w2.font; oc.textBaseline = 'alphabetic'; oc.fillStyle = '#000'; oc.fillText(ch, 2, F * 0.97);
    w2.drawImage(off, x - 2, wb - F * 0.97);
    x += cw + gap;
  }
  const targetW = Math.min(ww, pw * 0.94);
  ctx.drawImage(wc, W / 2 - targetW / 2, base - wb, targetW, wc.height);

  // "GREETINGS FROM" in cream capitals on a red ribbon with folded ends. Capitals in a heavy sans stay readable
  // when every stroke is only a loop or two wide; a script's little counters fill in with wool.
  const ry = 11 * Ly, rh = 12 * Ly, rx0 = px + pw * 0.07, rx1 = px + pw * 0.93, notch = 2.5 * Lx, tail = 4.5 * Lx, drop = 2.5 * Ly;
  ctx.fillStyle = '#7d1f1c';
  for (const sgn of [-1, 1]) {
    const ex = sgn < 0 ? rx0 : rx1, ox = ex + sgn * tail;
    ctx.beginPath(); ctx.moveTo(ex - sgn * 3 * Lx, ry - rh / 2 + drop); ctx.lineTo(ox, ry - rh / 2 + drop); ctx.lineTo(ox - sgn * notch, ry + drop);
    ctx.lineTo(ox, ry + rh / 2 + drop); ctx.lineTo(ex - sgn * 3 * Lx, ry + rh / 2 + drop); ctx.closePath(); ctx.fill();
  }
  ctx.fillStyle = '#1d2a4a'; ctx.fillRect(rx0 + 0.9 * Lx, ry - rh / 2 + 0.9 * Ly, rx1 - rx0, rh);       // shadow
  ctx.fillStyle = '#c0362f'; ctx.fillRect(rx0, ry - rh / 2, rx1 - rx0, rh);
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round';
  const spacing = ctx.letterSpacing !== undefined;
  const fitText = (txt, maxW, capRows) => {
    ctx.font = blockFont(100); if (spacing) ctx.letterSpacing = `${0.8 * Lx}px`;
    const m = ctx.measureText(txt), capH = m.actualBoundingBoxAscent;
    return Math.min(100 * maxW / m.width, 100 * capRows * Ly / capH);
  };
  const GF = fitText('GREETINGS FROM', (rx1 - rx0) - 4 * Lx, 7.5);
  ctx.font = blockFont(GF); if (spacing) ctx.letterSpacing = `${0.8 * Lx}px`;
  const capH = ctx.measureText('G').actualBoundingBoxAscent;
  ctx.fillStyle = ctx.strokeStyle = '#f6efdc'; ctx.lineWidth = 0.3 * Lx;
  ctx.strokeText('GREETINGS FROM', W / 2, ry + capH / 2); ctx.fillText('GREETINGS FROM', W / 2, ry + capH / 2);
  if (spacing) ctx.letterSpacing = '0px';
  ctx.textAlign = 'left';
}

// National-park poster in the style of the old screen-printed travel posters: flat layered mountains, a pine
// forest, a still lake, and a lettered band.
function americaPark(ctx, W, H) {
  const u = H / 100;
  ctx.fillStyle = '#efe3c6'; ctx.fillRect(0, 0, W, H);
  const bx = 4 * u, by = 4 * u, bw = W - 8 * u, bh = H - 8 * u, band = bh * 0.27;
  const ih = bh - band;
  ctx.save(); ctx.beginPath(); ctx.rect(bx, by, bw, ih); ctx.clip();
  const sky = [['#f6c76a', 0], ['#f19a57', 0.22], ['#e36f55', 0.4]];
  ctx.fillStyle = sky[0][0]; ctx.fillRect(bx, by, bw, ih);
  ctx.fillStyle = sky[1][0]; ctx.fillRect(bx, by + ih * 0.2, bw, ih);
  ctx.fillStyle = sky[2][0]; ctx.fillRect(bx, by + ih * 0.33, bw, ih);
  ctx.fillStyle = '#fbe6a8'; ctx.beginPath(); ctx.arc(bx + bw * 0.7, by + ih * 0.3, ih * 0.11, 0, Math.PI * 2); ctx.fill();
  const ridge = (pts, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(bx, by + ih); pts.forEach(([fx, fy]) => ctx.lineTo(bx + bw * fx, by + ih * fy)); ctx.lineTo(bx + bw, by + ih); ctx.closePath(); ctx.fill(); };
  ridge([[0, 0.5], [0.18, 0.28], [0.3, 0.42], [0.45, 0.2], [0.6, 0.4], [0.78, 0.25], [1, 0.45]], '#8a5a8f');
  // snow caps on the far range
  ctx.fillStyle = '#f6efe2';
  for (const [tx, ty, w] of [[0.18, 0.28, 0.05], [0.45, 0.2, 0.06], [0.78, 0.25, 0.05]]) { ctx.beginPath(); ctx.moveTo(bx + bw * tx, by + ih * ty); ctx.lineTo(bx + bw * (tx + w), by + ih * (ty + 0.07)); ctx.lineTo(bx + bw * (tx + w * 0.3), by + ih * (ty + 0.05)); ctx.lineTo(bx + bw * tx, by + ih * (ty + 0.08)); ctx.lineTo(bx + bw * (tx - w * 0.3), by + ih * (ty + 0.05)); ctx.lineTo(bx + bw * (tx - w), by + ih * (ty + 0.07)); ctx.fill(); }
  ridge([[0, 0.6], [0.15, 0.45], [0.35, 0.58], [0.52, 0.42], [0.7, 0.57], [0.88, 0.46], [1, 0.55]], '#4f5f97');
  ridge([[0, 0.66], [0.25, 0.58], [0.5, 0.66], [0.75, 0.6], [1, 0.66]], '#2f6f73');
  // lake with the reflection of the sun
  ctx.fillStyle = '#3b8ea5'; ctx.fillRect(bx, by + ih * 0.7, bw, ih);
  ctx.fillStyle = '#fbe6a8'; for (let k = 0; k < 5; k++) ctx.fillRect(bx + bw * 0.7 - ih * (0.08 - k * 0.012), by + ih * (0.73 + k * 0.035), ih * (0.16 - k * 0.024), 0.7 * u);
  // pine trees, near and dark, at the sides
  const pine = (x, base, h, col) => { ctx.fillStyle = col; for (let k = 0; k < 4; k++) { const ty = base - h + k * h * 0.2, w = h * (0.14 + k * 0.07); ctx.beginPath(); ctx.moveTo(x, ty); ctx.lineTo(x + w, ty + h * 0.32); ctx.lineTo(x - w, ty + h * 0.32); ctx.fill(); } ctx.fillRect(x - h * 0.03, base - h * 0.1, h * 0.06, h * 0.12); };
  for (const [fx, h, col] of [[0.04, 0.6, '#173f33'], [0.11, 0.48, '#1f4f3e'], [0.18, 0.36, '#173f33'], [0.96, 0.62, '#173f33'], [0.89, 0.46, '#1f4f3e'], [0.83, 0.34, '#173f33']]) pine(bx + bw * fx, by + ih * 1.02, ih * h, col);
  ctx.restore();
  // lettered band
  ctx.fillStyle = '#1f3a3a'; ctx.fillRect(bx, by + ih, bw, band);
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = '#efe3c6'; ctx.font = blockFont(band * 0.62);
  if (ctx.letterSpacing !== undefined) ctx.letterSpacing = `${band * 0.06}px`;
  ctx.fillText('SEE AMERICA', W / 2, by + ih + band * 0.52);
  if (ctx.letterSpacing !== undefined) ctx.letterSpacing = '0px';
  ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
}

// A baseball diamond from above: mowed outfield inside the fence, the dirt infield, chalk lines, bases and the mound.
// The grass is mowed into stripes loop by loop, so the stripes stay straight.
function americaBaseball(ctx, W, H) {
  const u = H / 100, KEY = '#2f6b3a';
  ctx.fillStyle = '#1d3a2a'; ctx.fillRect(0, 0, W, H);                 // stands beyond the fence
  const hx = W / 2, hy = H * 0.9, d = H * 0.4, fence = H * 0.8;          // home plate, base distance, fence radius
  ctx.fillStyle = KEY; ctx.beginPath(); ctx.arc(hx, hy, fence, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#a8683f'; ctx.lineWidth = 5 * u; ctx.beginPath(); ctx.arc(hx, hy, fence - 2.5 * u, Math.PI, Math.PI * 2); ctx.stroke(); // warning track
  // infield dirt: circle-cut arc beyond the bases, with the grass inside the base paths
  ctx.fillStyle = '#b97a4c';
  ctx.beginPath(); ctx.moveTo(hx, hy); ctx.arc(hx, hy, d * 1.36, Math.PI * 1.25, Math.PI * 1.75); ctx.closePath(); ctx.fill();
  const b1 = [hx + d * Math.SQRT1_2, hy - d * Math.SQRT1_2], b2 = [hx, hy - d * Math.SQRT2], b3 = [hx - d * Math.SQRT1_2, hy - d * Math.SQRT1_2];
  const inset = 4 * u;
  ctx.fillStyle = KEY; ctx.beginPath();
  ctx.moveTo(hx, hy - inset * 1.4); ctx.lineTo(b1[0] - inset * 1.4, b1[1]); ctx.lineTo(b2[0], b2[1] + inset * 1.4); ctx.lineTo(b3[0] + inset * 1.4, b3[1]); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#b97a4c'; ctx.beginPath(); ctx.arc(hx, hy - d * 0.7, 5.5 * u, 0, Math.PI * 2); ctx.fill();    // mound
  ctx.beginPath(); ctx.arc(hx, hy, 8 * u, 0, Math.PI * 2); ctx.fill();                                          // home circle
  ctx.fillStyle = '#f3efe4'; ctx.fillRect(hx - 2.2 * u, hy - d * 0.7 - 0.8 * u, 4.4 * u, 1.6 * u);                // rubber
  // foul lines out to the fence, batter's boxes, home plate and the bases, all in chalk thick enough to hook
  ctx.strokeStyle = '#f3efe4'; ctx.lineWidth = 1.6 * u;
  for (const sgn of [-1, 1]) { ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + sgn * (fence - 5 * u) * Math.SQRT1_2, hy - (fence - 5 * u) * Math.SQRT1_2); ctx.stroke(); }
  ctx.fillStyle = '#f3efe4'; ctx.beginPath(); ctx.moveTo(hx - 1.8 * u, hy - 1.8 * u); ctx.lineTo(hx + 1.8 * u, hy - 1.8 * u); ctx.lineTo(hx + 1.8 * u, hy); ctx.lineTo(hx, hy + 1.8 * u); ctx.lineTo(hx - 1.8 * u, hy); ctx.fill();
  for (const [bx, by] of [b1, b2, b3]) { ctx.save(); ctx.translate(bx, by); ctx.rotate(Math.PI / 4); ctx.fillRect(-2 * u, -2 * u, 4 * u, 4 * u); ctx.restore(); }
  const key = rgbOf(KEY), G1 = rgbOf('#2f6b3a'), G2 = rgbOf('#3b7f47');
  return (r, h, rgb) => nearRgb(rgb, key, 12) ? (Math.floor(r / 4) & 1 ? G2 : G1) : null;
}

// A basketball court from above: maple boards, painted keys, the three-point arcs and a star at centre court. The
// boards are laid out loop by loop, two rows each, so the floor reads as planks rather than as stray lines.
function americaBasketball(ctx, W, H) {
  const u = H / 100, KEY = '#d4a46c';
  const apron = 6 * u;
  ctx.fillStyle = '#25345e'; ctx.fillRect(0, 0, W, H);
  const cx0 = apron, cy0 = apron, cw = W - 2 * apron, ch = H - 2 * apron;
  ctx.fillStyle = KEY; ctx.fillRect(cx0, cy0, cw, ch);
  ctx.strokeStyle = '#f6efe2'; ctx.lineWidth = 1.6 * u;
  ctx.strokeRect(cx0 + 1.2 * u, cy0 + 1.2 * u, cw - 2.4 * u, ch - 2.4 * u);
  const mx = W / 2, my = H / 2;
  ctx.beginPath(); ctx.moveTo(mx, cy0 + 1.2 * u); ctx.lineTo(mx, cy0 + ch - 1.2 * u); ctx.stroke();
  // centre circle with a star
  ctx.fillStyle = '#b5312b'; ctx.beginPath(); ctx.arc(mx, my, 11 * u, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#f6efe2'; star5(ctx, mx, my + 0.6 * u, 7.5 * u);
  for (const side of [-1, 1]) {
    const bx = side < 0 ? cx0 + 1.2 * u : cx0 + cw - 1.2 * u, kw = 19 * u, kh = 18 * u;
    // painted key
    ctx.fillStyle = '#25345e'; ctx.fillRect(side < 0 ? bx : bx - kw, my - kh / 2, kw, kh); ctx.strokeRect(side < 0 ? bx : bx - kw, my - kh / 2, kw, kh);
    // free-throw circle
    ctx.beginPath(); ctx.arc(bx + side * -kw, my, 7 * u, side < 0 ? -Math.PI / 2 : Math.PI / 2, side < 0 ? Math.PI / 2 : Math.PI * 1.5); ctx.stroke();
    // three-point line: short straight bits then the arc
    const r3 = 31 * u, hoop = bx + side * -5 * u;
    ctx.beginPath();
    ctx.moveTo(bx, my - 28 * u); ctx.lineTo(hoop + side * -Math.sqrt(r3 * r3 - (28 * u) ** 2), my - 28 * u);
    ctx.arc(hoop, my, r3, side < 0 ? -Math.asin(28 / 31) : Math.PI + Math.asin(28 / 31), side < 0 ? Math.asin(28 / 31) : Math.PI - Math.asin(28 / 31), side > 0);
    ctx.lineTo(bx, my + 28 * u); ctx.stroke();
    // backboard and hoop
    ctx.fillStyle = '#f6efe2'; ctx.fillRect(bx + side * -2.6 * u - 0.8 * u, my - 4.5 * u, 1.6 * u, 9 * u);
    ctx.strokeStyle = '#e8742b'; ctx.lineWidth = 1.4 * u; ctx.beginPath(); ctx.arc(hoop, my, 2.4 * u, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = '#f6efe2'; ctx.lineWidth = 1.6 * u;
  }
  // floorboards: per pair of rows, boards of random length, each a slightly different shade of maple
  const key = rgbOf(KEY), R = rng(808), boards = new Map();
  const shadeAt = (plank, x) => {
    let b = boards.get(plank);
    if (!b) { b = []; let e = -R() * 14; while (e < 400) { e += 10 + R() * 16; b.push([e, 0.86 + R() * 0.18]); } boards.set(plank, b); }
    for (const [e, t] of b) if (x < e) return t;
    return 1;
  };
  return (r, h, rgb) => {
    if (!nearRgb(rgb, key, 12)) return null;
    const t = shadeAt(r >> 1, h / 2);
    return [222 * t, 176 * t, 116 * t];
  };
}

// A diner floor: black-and-white checks, a chrome-and-red trim, and a neon sign in the middle. The floor is painted
// plain grey and the checks are laid out loop by loop, so every square comes out the same size.
function americaDiner(ctx, W, H) {
  const u = H / 100, KEY = '#857f78';
  ctx.fillStyle = KEY; ctx.fillRect(0, 0, W, H);
  // chrome band with a red stripe
  const chrome = ctx.createLinearGradient(0, 0, 0, H); chrome.addColorStop(0, '#e9edf1'); chrome.addColorStop(0.5, '#9aa3ad'); chrome.addColorStop(1, '#e9edf1');
  ctx.fillStyle = chrome; frameRect(ctx, 0, 0, W, H, 4 * u);
  ctx.fillStyle = '#c4262e'; frameRect(ctx, 4 * u, 4 * u, W - 8 * u, H - 8 * u, 1.8 * u);
  // sign: rounded dark panel with chrome rim
  const sw = W * 0.56, sh = H * 0.44, sx = (W - sw) / 2, sy = (H - sh) / 2;
  ctx.fillStyle = chrome; roundRect(ctx, sx - 1.2 * u, sy - 1.2 * u, sw + 2.4 * u, sh + 2.4 * u, 6 * u); ctx.fill();
  ctx.fillStyle = '#16202e'; roundRect(ctx, sx, sy, sw, sh, 5 * u); ctx.fill();
  const neon = (text, font, x, y, col, glow) => {
    ctx.font = font; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.shadowColor = glow; ctx.shadowBlur = 3.5 * u; ctx.fillStyle = col;
    ctx.fillText(text, x, y); ctx.shadowBlur = 1.2 * u; ctx.fillText(text, x, y);
    ctx.shadowBlur = 0; ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.font = font; ctx.fillText(text, x, y - 0.15 * u);
  };
  neon('Diner', `${sh * 0.5}px ${SCRIPT}`, W / 2, sy + sh * 0.38, '#ff5d7a', '#ff2d55');
  neon('OPEN', blockFont(sh * 0.22), W / 2, sy + sh * 0.8, '#5ff0e0', '#19d3c5');
  // neon star sparkles at the sign's corners
  ctx.shadowColor = '#ffd84a'; ctx.shadowBlur = 2.5 * u; ctx.fillStyle = '#ffe680';
  for (const [x, y] of [[sx + sw * 0.08, sy + sh * 0.2], [sx + sw * 0.92, sy + sh * 0.2]]) star5(ctx, x, y, 3 * u);
  ctx.shadowBlur = 0; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  const { cols, rows } = hookedPictureLoops(W, H), k = 6, key = rgbOf(KEY), DARK = rgbOf('#1a1a1d'), LIGHT = rgbOf('#f1ece0');
  const oh = ((2 * k - (2 * cols) % (2 * k)) / 2) | 0, orow = ((k - rows % k) / 2) | 0;
  return (r, h, rgb) => nearRgb(rgb, key, 12) ? ((Math.floor((h + oh) / (2 * k)) + Math.floor((r + orow) / k)) & 1 ? LIGHT : DARK) : null;
}

// Route 66: a two-lane road running to the horizon through the desert at sunset, with the highway shield.
function americaRoute66(ctx, W, H) {
  const u = H / 100, hz = H * 0.5;
  const sky = ctx.createLinearGradient(0, 0, 0, hz); sky.addColorStop(0, '#3d4f8f'); sky.addColorStop(0.5, '#e7766a'); sky.addColorStop(1, '#f7c06a');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, hz);
  ctx.fillStyle = '#ffe2a0'; ctx.beginPath(); ctx.arc(W * 0.5, hz, 10 * u, Math.PI, 0); ctx.fill();
  // mesas on the horizon
  ctx.fillStyle = '#7b3f3a';
  for (const [x, w, h] of [[0.06, 0.16, 9], [0.2, 0.08, 6], [0.7, 0.12, 11], [0.84, 0.1, 7]]) { ctx.beginPath(); ctx.moveTo(W * x, hz); ctx.lineTo(W * x + 2 * u, hz - h * u); ctx.lineTo(W * (x + w) - 2 * u, hz - h * u); ctx.lineTo(W * (x + w), hz); ctx.fill(); }
  // desert floor
  const ground = ctx.createLinearGradient(0, hz, 0, H); ground.addColorStop(0, '#d79a5c'); ground.addColorStop(1, '#c47f45');
  ctx.fillStyle = ground; ctx.fillRect(0, hz, W, H - hz);
  // the road in perspective, with yellow centre dashes
  ctx.fillStyle = '#3a3a3e'; ctx.beginPath(); ctx.moveTo(W * 0.5 - 0.6 * u, hz); ctx.lineTo(W * 0.5 + 0.6 * u, hz); ctx.lineTo(W * 0.5 + 34 * u, H); ctx.lineTo(W * 0.5 - 34 * u, H); ctx.fill();
  ctx.fillStyle = '#f2c94c';
  for (let t = 0.05; t < 1; t += 0.11) { const y0 = hz + (H - hz) * t * t, y1 = hz + (H - hz) * Math.min(1, (t + 0.05) * (t + 0.05)), w0 = 0.15 * u + t * 0.9 * u; ctx.beginPath(); ctx.moveTo(W / 2 - w0, y0); ctx.lineTo(W / 2 + w0, y0); ctx.lineTo(W / 2 + w0 * 1.3, y1); ctx.lineTo(W / 2 - w0 * 1.3, y1); ctx.fill(); }
  // telephone poles getting smaller toward the horizon
  ctx.strokeStyle = '#3b2a20'; ctx.lineCap = 'butt';
  for (let k = 0; k < 4; k++) {
    const t = 1 - k * 0.22, x = W * 0.5 - (4 + 40 * t * t) * u, y = hz + (H - hz) * t * t * 0.9, h = (6 + 28 * t * t) * u;
    ctx.lineWidth = (1.5 + 1.2 * t) * u;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - h); ctx.moveTo(x - h * 0.2, y - h * 0.86); ctx.lineTo(x + h * 0.2, y - h * 0.86); ctx.stroke();
  }
  // the shield sign on its post
  const sx = W * 0.78, sy = H * 0.47, sw = 30 * u, sh = 33 * u;
  ctx.fillStyle = '#4a3a2a'; ctx.fillRect(sx - 0.8 * u, sy + sh * 0.5, 1.6 * u, H * 0.32);
  const shield = (pad, col) => {
    const w = sw - pad * 2, h = sh - pad * 2, x0 = sx - w / 2, y0 = sy - sh / 2 + pad;
    ctx.fillStyle = col; ctx.beginPath();
    ctx.moveTo(x0, y0 + h * 0.12); ctx.quadraticCurveTo(x0 + w * 0.25, y0, x0 + w * 0.5, y0 + h * 0.1); ctx.quadraticCurveTo(x0 + w * 0.75, y0, x0 + w, y0 + h * 0.12);
    ctx.lineTo(x0 + w, y0 + h * 0.55); ctx.quadraticCurveTo(x0 + w, y0 + h * 0.85, x0 + w * 0.5, y0 + h); ctx.quadraticCurveTo(x0, y0 + h * 0.85, x0, y0 + h * 0.55); ctx.closePath(); ctx.fill();
  };
  shield(0, '#111214'); shield(1.1 * u, '#f6f2e6');
  ctx.fillStyle = '#111214'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = blockFont(sh * 0.56); ctx.fillText('66', sx, sy + sh * 0.08);
  ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  // a frame like an old enamel sign
  ctx.fillStyle = '#1a1a1d'; frameRect(ctx, 0, 0, W, H, 2.4 * u);
  ctx.fillStyle = '#f6f2e6'; frameRect(ctx, 2.4 * u, 2.4 * u, W - 4.8 * u, H - 4.8 * u, 0.6 * u);
}

// ---------- Canada pack ----------
// The same three crafts as the USA pack: woven and pieced rugs, folk pictures knotted on a grid, and hooked rugs,
// which are Canada's own tradition (the hooked mats of the Maritimes and Newfoundland).

// The flag's eleven-point maple leaf: the right half, from the top point round to the foot of the stem, x right and
// y up, the leaf spanning about -1..1. The left half is its mirror.
const MAPLE = [[0, 1], [0.13, 0.7], [0.32, 0.8], [0.22, 0.28], [0.62, 0.5], [0.64, 0.36], [0.96, 0.3], [0.74, 0.04],
  [0.84, -0.12], [0.36, -0.2], [0.4, -0.42], [0.05, -0.36], [0.05, -0.8]];
function mapleLeaf(ctx, cx, cy, s, rot = 0) {
  const pts = [...MAPLE, ...MAPLE.slice().reverse().map(([x, y]) => [-x, y])];
  const c = Math.cos(rot), sn = Math.sin(rot);
  ctx.beginPath();
  pts.forEach(([x, y], i) => {
    const px = x * s, py = -y * s, X = cx + px * c - py * sn, Y = cy + px * sn + py * c;
    i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y);
  });
  ctx.closePath(); ctx.fill();
}

// Red, white, red, with the maple leaf: woven, with a dark red binding and a stitched edge, like the flag rug.
function canadaFlag(ctx, W, H) {
  const C = { red: '#b3282d', red2: '#a12327', white: '#efe6d2', white2: '#e5dac2', bind: '#6e1a1c' };
  const u = H / 100, b = 4.2 * u;
  ctx.fillStyle = C.bind; ctx.fillRect(0, 0, W, H);
  const x0 = b, y0 = b, fw = W - 2 * b, fh = H - 2 * b, side = (fw - fh) / 2;
  ctx.fillStyle = C.red; ctx.fillRect(x0, y0, side, fh); ctx.fillRect(x0 + fw - side, y0, side, fh);
  ctx.fillStyle = C.white; ctx.fillRect(x0 + side, y0, fh, fh);
  // faint woven rows
  for (let k = 0, y = 0; y < fh; k++, y += 0.9 * u) if (k % 2 === 0) {
    ctx.fillStyle = C.red2; ctx.fillRect(x0, y0 + y, side, 0.45 * u); ctx.fillRect(x0 + fw - side, y0 + y, side, 0.45 * u);
    ctx.fillStyle = C.white2; ctx.fillRect(x0 + side, y0 + y, fh, 0.45 * u);
  }
  ctx.fillStyle = C.red; mapleLeaf(ctx, W / 2, y0 + fh * 0.48, fh * 0.39);
  const fade = ctx.createLinearGradient(0, 0, W, H);
  fade.addColorStop(0, 'rgba(255,240,215,0)'); fade.addColorStop(1, 'rgba(255,240,215,.12)');
  ctx.fillStyle = fade; ctx.fillRect(0, 0, W, H);
  stitchRect(ctx, b * 0.5, b * 0.5, W - b, H - b, 2.2 * u, 0.4 * u, 'rgba(239,230,210,.72)');
}

// Pieced quilt of Maple Leaf blocks, the old nine-patch: four half-square triangles, four solid squares and a stem,
// in autumn fabrics on light calicos, with sashing, red cornerstones and a sawtooth border.
function canadaLeafQuilt(ctx, W, H, seed) {
  const R = rng(seed + 71), u = H / 100;
  const leaves = ['#b3352b', '#cf5f2c', '#e0a33a', '#8e3424', '#c47f2e', '#a83a4a', '#7a8234'];
  const bgs = ['#efe4cb', '#e8dbbd', '#f2eadb'];
  const C = { border: '#2f4a36', saw1: '#efe4cb', saw2: '#b3352b', sash: '#d6c39b', stone: '#b3352b' };
  const bw = 9 * u;
  ctx.fillStyle = C.border; ctx.fillRect(0, 0, W, H);
  const cb = bw * 0.9, m = bw * 0.05;
  const teeth = (x0, y0, len, horiz, flip) => {
    const { n, d } = evenSteps(len, 4.5 * u), depth = cb * 0.62;
    for (let k = 0; k < n; k++) {
      ctx.fillStyle = k % 2 ? C.saw1 : C.saw2;
      ctx.beginPath();
      if (horiz) { const x = x0 + k * d; ctx.moveTo(x, y0); ctx.lineTo(x + d, y0); ctx.lineTo(x + d / 2, y0 + flip * depth); }
      else { const y = y0 + k * d; ctx.moveTo(x0, y); ctx.lineTo(x0, y + d); ctx.lineTo(x0 + flip * depth, y + d / 2); }
      ctx.closePath(); ctx.fill();
    }
  };
  const top = m + cb * 0.19, bot = H - m - cb * 0.19, lft = m + cb * 0.19, rgt = W - m - cb * 0.19;
  teeth(m + cb, top, W - 2 * (m + cb), true, 1); teeth(m + cb, bot, W - 2 * (m + cb), true, -1);
  teeth(lft, m + cb, H - 2 * (m + cb), false, 1); teeth(rgt, m + cb, H - 2 * (m + cb), false, -1);
  for (const [x, y] of [[m, m], [W - m - cb, m], [m, H - m - cb], [W - m - cb, H - m - cb]]) {
    ctx.fillStyle = C.saw1; ctx.fillRect(x + cb * 0.15, y + cb * 0.15, cb * 0.7, cb * 0.7);
    ctx.fillStyle = C.saw2; mapleLeaf(ctx, x + cb / 2, y + cb * 0.52, cb * 0.3);
  }
  // blocks
  const fx = bw, fy = bw, fw = W - 2 * bw, fh = H - 2 * bw, bc = 5, br = 3, sash = 1.8 * u;
  const bs = Math.min((fw - (bc + 1) * sash) / bc, (fh - (br + 1) * sash) / br);
  const gw = bc * bs + (bc + 1) * sash, gh = br * bs + (br + 1) * sash, gx = fx + (fw - gw) / 2, gy = fy + (fh - gh) / 2;
  ctx.fillStyle = C.sash; ctx.fillRect(fx, fy, fw, fh);
  const layout = [['h0', 'h0', 'L'], ['L', 'L', 'h1'], ['S', 'L', 'h1']];
  for (let j = 0; j < br; j++) for (let i = 0; i < bc; i++) {
    const x = gx + sash + i * (bs + sash), y = gy + sash + j * (bs + sash), q = bs / 3;
    const bg = bgs[(i + j) % bgs.length], lf = leaves[(i * 3 + j * 2 + Math.floor(R() * 2)) % leaves.length];
    ctx.fillStyle = bg; ctx.fillRect(x, y, bs, bs);
    ctx.fillStyle = lf; ctx.strokeStyle = lf;
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
      const ux = x + c * q, uy = y + r * q, t = layout[r][c];
      ctx.beginPath();
      if (t === 'L') { ctx.fillRect(ux, uy, q + 0.5, q + 0.5); continue; }
      if (t === 'h0') { ctx.moveTo(ux + q, uy); ctx.lineTo(ux + q, uy + q); ctx.lineTo(ux, uy + q); ctx.closePath(); ctx.fill(); continue; }
      if (t === 'h1') { ctx.moveTo(ux, uy); ctx.lineTo(ux + q, uy); ctx.lineTo(ux, uy + q); ctx.closePath(); ctx.fill(); continue; }
      ctx.lineWidth = q * 0.2; ctx.lineCap = 'butt'; ctx.moveTo(ux + q, uy); ctx.lineTo(ux + q * 0.18, uy + q * 0.82); ctx.stroke(); // stem
    }
  }
  // cornerstones where the sashing crosses
  ctx.fillStyle = C.stone;
  for (let j = 0; j <= br; j++) for (let i = 0; i <= bc; i++) ctx.fillRect(gx + i * (bs + sash), gy + j * (bs + sash), sash, sash);
  // tiny calico print over the patchwork, and running-stitch quilting along the seams
  ctx.fillStyle = 'rgba(255,255,255,.16)';
  for (let yy = fy + 0.6 * u; yy < fy + fh; yy += 1.3 * u) for (let xx = fx + 0.6 * u + ((yy / u) % 2) * 0.6 * u; xx < fx + fw; xx += 1.3 * u) { ctx.beginPath(); ctx.arc(xx, yy, 0.18 * u, 0, Math.PI * 2); ctx.fill(); }
  ctx.strokeStyle = 'rgba(250,240,220,.55)'; ctx.lineWidth = 0.32 * u; ctx.setLineDash([1.1 * u, 0.9 * u]);
  for (let j = 0; j < br; j++) for (let i = 0; i < bc; i++) {
    const x = gx + sash + i * (bs + sash), y = gy + sash + j * (bs + sash);
    ctx.strokeRect(x + 0.8 * u, y + 0.8 * u, bs - 1.6 * u, bs - 1.6 * u);
  }
  ctx.setLineDash([]);
}

// A woven landscape of the Rockies at dawn: banded sky, jagged snow-capped peaks, a turquoise lake with their
// reflection and a red canoe, pines along the shore, all on the knot grid. Border of little stepped pines.
function canadaRockies(ctx, W, H, seed) {
  const R = rng(seed + 88);
  const g = knotGrid(ctx, W, H, 96), { cols, rows, blk } = g;
  const C = { frame: '#1d2b26', line: '#ece2c8', tooth: '#3f8f86',
    sky: ['#2c3f6e', '#3d5689', '#5f74a8', '#9a92c0', '#d8a2a8', '#f1bf9c', '#f7dbb0'],
    far: '#8796bd', far2: '#a3afd0', rock: '#727a95', rock2: '#5a617c', snow: '#f4f1ea', snow2: '#d8dbe8',
    lake: '#3fa3a8', lake2: '#2c7f88', lake3: '#79c9c4', pine: '#1f3d2f', pine2: '#2a5240', shore: '#4b5b3c', canoe: '#c0392b', man: '#2a2220' };
  const fb = 4;
  ctx.fillStyle = C.frame; ctx.fillRect(0, 0, W, H);
  const x0 = fb + 1, y0 = fb + 1, x1 = cols - fb - 2, y1 = rows - fb - 2;
  for (let x = fb; x <= cols - fb - 1; x++) { blk(x, fb, C.line); blk(x, rows - fb - 1, C.line); }
  for (let y = fb; y <= rows - fb - 1; y++) { blk(fb, y, C.line); blk(cols - fb - 1, y, C.line); }
  // border: little stepped pines (3 knots tall) evenly spaced, pointing inward
  const pineRow = (len, put) => { const { n, d } = evenSteps(len, 6); for (let i = 0; i < n; i++) put(Math.round(i * d + d / 2)); };
  pineRow(cols - 2 * fb - 2, (a) => { const x = fb + 1 + a; for (const [dx, k] of [[0, 1], [-1, 2], [0, 2], [1, 2], [0, 3], [-1, 3], [1, 3]]) { blk(x + dx, k, C.tooth); blk(x + dx, rows - 1 - k, C.tooth); } });
  pineRow(rows - 2 * fb - 2, (a) => { const y = fb + 1 + a; for (const [dy, k] of [[0, 1], [-1, 2], [0, 2], [1, 2], [0, 3], [-1, 3], [1, 3]]) { blk(k, y + dy, C.tooth); blk(cols - 1 - k, y + dy, C.tooth); } });
  for (const [cx, cy] of [[2, 2], [cols - 3, 2], [2, rows - 3], [cols - 3, rows - 3]]) { blk(cx, cy, C.line); blk(cx - 1, cy, C.tooth); blk(cx + 1, cy, C.tooth); blk(cx, cy - 1, C.tooth); blk(cx, cy + 1, C.tooth); }

  const fw = x1 - x0 + 1, fh = y1 - y0 + 1, horizon = y0 + Math.round(fh * 0.55);
  for (let y = y0; y < horizon; y++) for (let x = x0; x <= x1; x++) {
    const t = (y - y0) / (horizon - y0);
    const band = Math.min(C.sky.length - 1, Math.max(0, Math.floor(t * C.sky.length + (((x * 7 + y * 3) % 5) - 2) * 0.06)));
    blk(x, y, C.sky[band]);
  }
  // peaks: each column's height is the highest of a few jagged triangles
  const range = (peaks, jag) => {
    const h = new Array(cols).fill(0);
    for (const [cx, half, top] of peaks) for (let x = Math.round(cx - half); x <= Math.round(cx + half); x++) if (x >= x0 && x <= x1) {
      const v = top * (1 - Math.abs(x - cx) / half) + ((x * 13) % 3 === 0 ? jag : 0);
      if (v > h[x]) h[x] = v;
    }
    return h.map((v) => Math.round(v));
  };
  const far = range([[x0 + fw * 0.08, fw * 0.16, 16], [x0 + fw * 0.3, fw * 0.14, 20], [x0 + fw * 0.55, fw * 0.15, 17], [x0 + fw * 0.82, fw * 0.16, 22], [x0 + fw * 1.0, fw * 0.12, 15]], 1);
  for (let x = x0; x <= x1; x++) for (let k = 0; k < far[x]; k++) blk(x, horizon - 1 - k, k > far[x] - 4 ? C.far2 : C.far);
  const nearP = [[x0 + fw * 0.18, fw * 0.17, 30], [x0 + fw * 0.44, fw * 0.2, 36], [x0 + fw * 0.7, fw * 0.16, 27], [x0 + fw * 0.93, fw * 0.14, 24]];
  const near = range(nearP, 1);
  for (let x = x0; x <= x1; x++) {
    // which peak owns this column, so its sunlit (left) face is lighter
    let own = nearP[0]; for (const pk of nearP) if (Math.abs(x - pk[0]) < Math.abs(x - own[0])) own = pk;
    for (let k = 0; k < near[x]; k++) {
      const fromTop = near[x] - k, snowLine = Math.round(near[x] * 0.32) + ((x * 7) % 3);
      blk(x, horizon - 1 - k, fromTop <= snowLine ? (x < own[0] ? C.snow : C.snow2) : (x < own[0] ? C.rock : C.rock2));
    }
  }
  // treeline along the shore
  for (let x = x0; x <= x1; x++) { const h = 2 + ((x * 5) % 4 === 0 ? 2 : (x * 3) % 5 === 0 ? 1 : 0); for (let k = 0; k < h; k++) blk(x, horizon - 1 - k + 1, x % 2 ? C.pine : C.pine2); }
  // lake with the mountains' reflection and ripples
  const lakeBottom = y1 - 7;
  for (let y = horizon + 1; y <= lakeBottom; y++) for (let x = x0; x <= x1; x++) {
    const d = y - horizon, refl = d < near[x] * 0.7;
    blk(x, y, refl ? C.lake2 : C.lake);
    if (y % 3 === 0 && (x + y * 5) % 11 < 4) blk(x, y, C.lake3);
  }
  // red canoe with a paddler
  const cx = x0 + Math.round(fw * 0.62), cy = horizon + Math.round((lakeBottom - horizon) * 0.55);
  for (let dx = -7; dx <= 7; dx++) { blk(cx + dx, cy, C.canoe); if (Math.abs(dx) < 6) blk(cx + dx, cy + 1, C.canoe); }
  blk(cx - 8, cy - 1, C.canoe); blk(cx + 8, cy - 1, C.canoe);
  for (let k = 1; k <= 3; k++) blk(cx, cy - k, C.man); blk(cx, cy - 4, C.man);
  for (let k = 0; k < 4; k++) blk(cx + 1 + k, cy - 3 + k, C.man); // paddle
  // shore and big pines in front, left and right
  for (let y = lakeBottom + 1; y <= y1; y++) for (let x = x0; x <= x1; x++) blk(x, y, (x + y) % 7 === 0 ? C.pine2 : C.shore);
  const inField = (x, y, c) => { if (x >= x0 && x <= x1 && y >= y0 && y <= y1) blk(x, y, c); };
  const pine = (px, by, h) => {
    for (let k = 0; k < h; k++) { const w = Math.round((k / h) * h * 0.32 + ((k % 4) === 3 ? -1 : 0)); for (let dx = -w; dx <= w; dx++) inField(px + dx, by - h + k, dx < 0 ? C.pine2 : C.pine); }
    inField(px, by, C.shore);
  };
  pine(x0 + 4, y1 - 1, Math.round(fh * 0.5)); pine(x0 + 13, y1 - 1, Math.round(fh * 0.36)); pine(x0 + 20, y1, Math.round(fh * 0.24));
  pine(x1 - 5, y1 - 1, Math.round(fh * 0.46)); pine(x1 - 14, y1, Math.round(fh * 0.3));
  void R;
}

// Tartan in the Atlantic colours: navy and spruce green with white, red and gold lines, woven 2/2 twill so the
// stripes blend where they cross. Blanket-stitched edge.
function canadaTartan(ctx, W, H) {
  const u = H / 100;
  const sett = [['#1d2c52', 18], ['#2f5d46', 14], ['#e9e3d4', 2], ['#2f5d46', 14], ['#1d2c52', 18], ['#b33a32', 3], ['#1d2c52', 6], ['#d1a23c', 2], ['#1d2c52', 6], ['#b33a32', 3]];
  const seq = []; for (const [c, n] of sett) for (let k = 0; k < n; k++) seq.push(c);
  const full = [...seq, ...seq.slice().reverse()], n = full.length, t = 0.42 * u;
  const offX = Math.floor(n / 2 - (W / t / 2) % n + n) % n, offY = Math.floor(n / 2 - (H / t / 2) % n + n) % n;
  for (let j = 0; j * t < H; j++) for (let i = 0; i * t < W; i++) {
    ctx.fillStyle = ((i + j) & 3) < 2 ? full[(i + offX) % n] : full[(j + offY) % n];
    ctx.fillRect(i * t, j * t, t + 0.5, t + 0.5);
  }
  const edge = 3 * u;
  ctx.fillStyle = '#141d36'; frameRect(ctx, 0, 0, W, H, edge);
  ctx.strokeStyle = '#ece4d0'; ctx.lineWidth = 0.55 * u; ctx.lineCap = 'square';
  const o = edge * 0.45, reach = edge + 1.4 * u, inset = edge * 1.2;
  ctx.beginPath();
  const ticks = (len, at) => { const { n: k, d } = evenSteps(len, 2.4 * u); for (let i = 1; i < k; i++) at(i * d); };
  ticks(W - 2 * inset, (a) => { ctx.moveTo(inset + a, o); ctx.lineTo(inset + a, reach); ctx.moveTo(inset + a, H - o); ctx.lineTo(inset + a, H - reach); });
  ticks(H - 2 * inset, (a) => { ctx.moveTo(o, inset + a); ctx.lineTo(reach, inset + a); ctx.moveTo(W - o, inset + a); ctx.lineTo(W - reach, inset + a); });
  for (const [cx, cy, sx, sy] of [[o, o, 1, 1], [W - o, o, -1, 1], [o, H - o, 1, -1], [W - o, H - o, -1, -1]]) { ctx.moveTo(cx, cy); ctx.lineTo(cx + sx * (reach - o) * 1.1, cy + sy * (reach - o) * 1.1); }
  ctx.stroke();
  ctx.lineWidth = 0.45 * u; ctx.strokeRect(o, o, W - 2 * o, H - 2 * o);
}

// Border for the Canadian folk pictures: like the American one, with a little maple leaf in each corner.
function canadaBorder(x, cols, rows, C) {
  pictureBorder(x, cols, rows, C);
  for (const [cx, cy] of [[2.6, 2.6], [cols - 2.6, 2.6], [2.6, rows - 2.6], [cols - 2.6, rows - 2.6]]) {
    x.fillStyle = C.frame; x.fillRect(cx - 2.6, cy - 2.6, 5.2, 5.2);
    x.fillStyle = C.star; mapleLeaf(x, cx, cy + 0.2, 2.5);
  }
}

// Folk picture: a moose standing in a lake at dusk, a pale moon, a pine ridge behind.
function canadaMoose(ctx, W, H) {
  const C = { frame: '#1f2a24', line: '#e8dcbc', accent: '#c0532f', star: '#e8dcbc',
    sky: '#f0c27c', sky2: '#e89a6c', sky3: '#b4677c', moon: '#f7e9bd', ridge: '#6b5577', pine: '#243a30', pine2: '#30493b',
    water: '#6d8ca8', water2: '#56718d', water3: '#a6bccc', fur: '#4a3020', fur2: '#2f1d10', fur3: '#6e4a32', antler: '#d2b98e', reed: '#6b5c32' };
  weavePicture(ctx, W, H, 104, Object.values(C), (x, cols, rows) => {
    canadaBorder(x, cols, rows, C);
    const fx = 8, fy = 8, fw = cols - 16, fh = rows - 16, wy = fy + fh * 0.66;
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    for (let y = fy; y < wy; y++) { const t = (y - fy) / (wy - fy); x.fillStyle = t < 0.3 ? C.sky3 : t < 0.62 ? C.sky2 : C.sky; x.fillRect(fx, y, fw, 1); }
    x.fillStyle = C.moon; x.beginPath(); x.arc(fx + fw * 0.2, fy + fh * 0.2, fh * 0.08, 0, Math.PI * 2); x.fill();
    // far ridge and a row of pines along it
    x.fillStyle = C.ridge; x.beginPath(); x.moveTo(fx, wy); x.lineTo(fx, fy + fh * 0.5); x.quadraticCurveTo(fx + fw * 0.35, fy + fh * 0.4, fx + fw * 0.6, fy + fh * 0.5); x.quadraticCurveTo(fx + fw * 0.85, fy + fh * 0.56, fx + fw, fy + fh * 0.46); x.lineTo(fx + fw, wy); x.fill();
    for (let i = 0, px = fx; px < fx + fw; i++, px += 3.4) {
      const h = 6 + ((i * 7) % 5) * 1.6, by = wy + 0.5;
      x.fillStyle = i % 2 ? C.pine : C.pine2; x.beginPath(); x.moveTo(px, by - h); x.lineTo(px + 2.4, by); x.lineTo(px - 2.4, by); x.fill();
    }
    // lake with ripples
    x.fillStyle = C.water; x.fillRect(fx, wy, fw, fh);
    x.fillStyle = C.water3; for (let y = wy + 3; y < fy + fh; y += 4) for (let k = 0; k < 6; k++) x.fillRect(fx + ((k * 37 + y * 11) % fw), y, 5 + (k % 3) * 2, 1);
    // the moose, facing left, standing in the shallows
    const s = fh / 100, bx = fx + fw * 0.55, by = wy + 6 * s;
    // reflection first, broken by ripples
    x.fillStyle = C.water2; x.beginPath(); x.ellipse(bx + 3 * s, by + 9 * s, 26 * s, 5 * s, 0, 0, Math.PI * 2); x.fill();
    x.fillStyle = C.fur2; for (const lx of [-16, -9, 12, 19]) x.fillRect(bx + lx * s, by - 26 * s, 4.4 * s, 28 * s); // legs, into the water
    x.fillStyle = C.water3; for (const lx of [-16, -9, 12, 19]) x.fillRect(bx + (lx - 2) * s, by + 2 * s, 8.4 * s, 1); // ripples round the legs
    x.fillStyle = C.fur; x.beginPath(); x.ellipse(bx + 5 * s, by - 30 * s, 22 * s, 10.5 * s, 0, 0, Math.PI * 2); x.fill(); // body
    x.fillStyle = C.fur3; x.beginPath(); x.ellipse(bx - 7 * s, by - 35 * s, 12 * s, 9 * s, -0.2, 0, Math.PI * 2); x.fill(); // shoulder hump
    x.fillStyle = C.fur; x.beginPath(); x.moveTo(bx - 12 * s, by - 42 * s); x.lineTo(bx - 23 * s, by - 37 * s); x.lineTo(bx - 20 * s, by - 26 * s); x.lineTo(bx - 8 * s, by - 26 * s); x.closePath(); x.fill(); // neck
    x.fillStyle = C.fur2; x.beginPath(); // long head with the heavy muzzle
    x.moveTo(bx - 20 * s, by - 41 * s); x.lineTo(bx - 33 * s, by - 32 * s); x.quadraticCurveTo(bx - 38 * s, by - 26 * s, bx - 33 * s, by - 23 * s); x.lineTo(bx - 25 * s, by - 26 * s); x.lineTo(bx - 18 * s, by - 32 * s); x.closePath(); x.fill();
    x.beginPath(); x.moveTo(bx - 27 * s, by - 26 * s); x.lineTo(bx - 25 * s, by - 17 * s); x.lineTo(bx - 22 * s, by - 27 * s); x.fill(); // bell
    x.beginPath(); x.moveTo(bx - 18 * s, by - 40 * s); x.lineTo(bx - 15 * s, by - 45 * s); x.lineTo(bx - 16 * s, by - 39 * s); x.fill(); // ear
    // palmate antlers: broad flat palms with tines along the top
    const palm = (ax, ay, rx, ry, rot, tines) => {
      x.fillStyle = C.antler; x.beginPath(); x.ellipse(ax, ay, rx, ry, rot, 0, Math.PI * 2); x.fill();
      for (let k = 0; k < tines; k++) { const t = -0.8 + (1.6 * k) / (tines - 1), tx = ax + Math.cos(rot) * rx * t, ty = ay + Math.sin(rot) * rx * t - ry * 0.7; x.beginPath(); x.moveTo(tx - 1.2 * s, ty + 1 * s); x.lineTo(tx, ty - 4.5 * s); x.lineTo(tx + 1.2 * s, ty + 1 * s); x.fill(); }
    };
    x.fillStyle = C.antler; x.fillRect(bx - 22 * s, by - 44 * s, 6 * s, 2.5 * s);
    palm(bx - 10 * s, by - 48 * s, 10 * s, 3.6 * s, -0.25, 5);
    palm(bx - 30 * s, by - 48 * s, 8 * s, 3.2 * s, 0.3, 4);
    x.fillStyle = C.moon; x.beginPath(); x.arc(bx - 26 * s, by - 34 * s, 0.9, 0, Math.PI * 2); x.fill(); // eye
    // reeds in the front corners
    x.fillStyle = C.reed; for (let k = 0; k < 14; k++) { const rx = k < 7 ? fx + 2 + k * 1.6 : fx + fw - 4 - (k - 7) * 1.7, rh = 6 + (k * 5) % 7; x.fillRect(rx, fy + fh - rh, 1, rh); }
    x.restore();
  });
}

// Folk picture: Canada geese flying south in a V over a marsh at sunset, with cattails in front.
function canadaGeese(ctx, W, H) {
  const C = { frame: '#2a2017', line: '#ecdcb8', accent: '#b5532c', star: '#ecdcb8',
    sky: '#f3d08a', sky2: '#efab66', sky3: '#d97f5c', sky4: '#a8607a', sun: '#fbe4a2', far: '#6f4f5c', water: '#d6936c', water2: '#b9785c', water3: '#f2c38c',
    reed: '#4d3c22', reed2: '#6f5a30', cat: '#5a3218', goose: '#262220', goose2: '#6b5444', chin: '#efe6d2' };
  weavePicture(ctx, W, H, 104, Object.values(C), (x, cols, rows) => {
    canadaBorder(x, cols, rows, C);
    const fx = 8, fy = 8, fw = cols - 16, fh = rows - 16, hz = fy + fh * 0.64;
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    for (let y = fy; y < hz; y++) { const t = (y - fy) / (hz - fy); x.fillStyle = t < 0.25 ? C.sky4 : t < 0.5 ? C.sky3 : t < 0.78 ? C.sky2 : C.sky; x.fillRect(fx, y, fw, 1); }
    x.fillStyle = C.sun; x.beginPath(); x.arc(fx + fw * 0.74, hz, fh * 0.12, Math.PI, 0); x.fill();
    // far shore
    x.fillStyle = C.far; x.beginPath(); x.moveTo(fx, hz + 1); for (let k = 0; k <= 30; k++) x.lineTo(fx + (fw * k) / 30, hz - 1.5 - ((k * 7) % 4)); x.lineTo(fx + fw, hz + 1); x.fill();
    // marsh water with the sun's reflection
    x.fillStyle = C.water; x.fillRect(fx, hz + 1, fw, fh);
    for (let y = hz + 3; y < fy + fh; y += 3) { x.fillStyle = C.water2; x.fillRect(fx + ((y * 23) % 30), y, fw * 0.3, 1); x.fillStyle = C.water3; const w = fh * 0.2 * (1 - (y - hz) / fh); x.fillRect(fx + fw * 0.74 - w / 2, y, w, 1); }
    // cattails and reeds in the front corners
    for (let k = 0; k < 22; k++) {
      const left = k < 11, rx = left ? fx + 1 + (k % 11) * 2.1 : fx + fw - 2 - (k % 11) * 2.1, rh = 10 + ((k * 7) % 9) * 1.4, by = fy + fh;
      x.fillStyle = k % 2 ? C.reed : C.reed2; x.fillRect(rx, by - rh, 1, rh);
      if (k % 3 === 0) { x.fillStyle = C.cat; x.fillRect(rx - 0.4, by - rh - 3, 1.8, 4); }
    }
    // the V: leader in front (left), two trailing arms
    const goose = (gx, gy, g, up) => {
      x.fillStyle = C.goose2; x.beginPath(); x.ellipse(gx, gy, 2.3 * g, 0.85 * g, 0, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.goose; x.beginPath(); x.moveTo(gx - 1.2 * g, gy - 0.3 * g); x.lineTo(gx - 3.4 * g, gy - 0.5 * g); x.lineTo(gx - 3.4 * g, gy + 0.2 * g); x.lineTo(gx - 1.2 * g, gy + 0.5 * g); x.fill(); // neck
      x.beginPath(); x.ellipse(gx - 3.8 * g, gy - 0.2 * g, 0.8 * g, 0.55 * g, 0, 0, Math.PI * 2); x.fill(); // head
      x.fillStyle = C.chin; x.fillRect(gx - 3.9 * g, gy - 0.1 * g, 0.7 * g, 0.5 * g); // white chinstrap
      x.fillStyle = C.goose; x.beginPath(); // wing, up or down
      if (up) { x.moveTo(gx - 1 * g, gy - 0.4 * g); x.lineTo(gx + 1.6 * g, gy - 3 * g); x.lineTo(gx + 1 * g, gy - 0.4 * g); }
      else { x.moveTo(gx - 1 * g, gy + 0.2 * g); x.lineTo(gx + 0.6 * g, gy + 2.8 * g); x.lineTo(gx + 1.2 * g, gy + 0.2 * g); }
      x.fill();
      x.fillStyle = C.goose; x.beginPath(); x.moveTo(gx + 2 * g, gy - 0.5 * g); x.lineTo(gx + 3 * g, gy); x.lineTo(gx + 2 * g, gy + 0.5 * g); x.fill(); // tail
    };
    const g = fh * 0.036, lx = fx + fw * 0.28, ly = fy + fh * 0.32, dx = fw * 0.08, dy = fh * 0.07;
    goose(lx, ly, g, true);
    for (let k = 1; k <= 4; k++) { goose(lx + k * dx, ly - k * dy * 0.7, g * (1 - k * 0.04), true); goose(lx + k * dx, ly + k * dy * 0.85, g * (1 - k * 0.04), true); }
    x.restore();
  });
}

// Folk picture: a loon on a still northern lake at dawn, mist on the water, a pine shore behind. The black-and-white
// bird stands out against the bright water.
function canadaLoon(ctx, W, H) {
  const C = { frame: '#16222a', line: '#e6dcc0', accent: '#4f8fa0', star: '#e6dcc0',
    sky: '#3d5f7e', sky2: '#7f8fa8', sky3: '#d9a99a', sky4: '#f4cfa4', sun: '#fde6b4', ridge: '#24382f', pine: '#16291f',
    water: '#e7b897', water2: '#c99c86', water3: '#f6dcbc', mist: '#efe0cc', black: '#121314', white: '#f1f2ee', grey: '#3e444e', eye: '#c0302c' };
  weavePicture(ctx, W, H, 104, Object.values(C), (x, cols, rows) => {
    canadaBorder(x, cols, rows, C);
    const fx = 8, fy = 8, fw = cols - 16, fh = rows - 16, hz = fy + fh * 0.48;
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    for (let y = fy; y < hz; y++) { const t = (y - fy) / (hz - fy); x.fillStyle = t < 0.25 ? C.sky : t < 0.5 ? C.sky2 : t < 0.78 ? C.sky3 : C.sky4; x.fillRect(fx, y, fw, 1); }
    x.fillStyle = C.sun; x.beginPath(); x.arc(fx + fw * 0.7, hz - 7, fh * 0.08, 0, Math.PI * 2); x.fill();
    // far shore: low ridge with pines
    x.fillStyle = C.ridge; x.fillRect(fx, hz - 2, fw, 4);
    for (let i = 0, px = fx; px < fx + fw; i++, px += 2.6) { const h = 4 + ((i * 5) % 4) * 1.6; x.fillStyle = C.pine; x.beginPath(); x.moveTo(px, hz - h - 1); x.lineTo(px + 1.8, hz + 1); x.lineTo(px - 1.8, hz + 1); x.fill(); }
    // bright still water with bands of mist and the sun's path
    x.fillStyle = C.water; x.fillRect(fx, hz + 2, fw, fh);
    for (let y = hz + 3; y < fy + fh; y += 3) { x.fillStyle = C.water2; x.fillRect(fx + ((y * 31) % fw), y, 8, 1); x.fillStyle = C.water3; const w = 4 + (y - hz) * 0.25; x.fillRect(fx + fw * 0.7 - w / 2, y, w, 1); }
    x.fillStyle = C.mist; x.fillRect(fx, hz + 3, fw * 0.4, 1); x.fillRect(fx + fw * 0.55, hz + 5, fw * 0.45, 1);
    // the loon, floating, facing left
    const s = fh / 100, bx = fx + fw * 0.44, wy = fy + fh * 0.8;
    x.fillStyle = C.water2; x.beginPath(); x.ellipse(bx + 2 * s, wy + 4 * s, 34 * s, 3.5 * s, 0, 0, Math.PI * 2); x.fill(); // reflection
    x.fillStyle = C.black;
    x.beginPath(); x.moveTo(bx - 24 * s, wy); x.quadraticCurveTo(bx - 22 * s, wy - 15 * s, bx + 4 * s, wy - 14 * s); x.quadraticCurveTo(bx + 26 * s, wy - 13 * s, bx + 34 * s, wy - 5 * s); x.lineTo(bx + 29 * s, wy); x.closePath(); x.fill(); // body
    x.beginPath(); x.moveTo(bx - 23 * s, wy - 4 * s); x.lineTo(bx - 28 * s, wy - 25 * s); x.lineTo(bx - 17 * s, wy - 27 * s); x.lineTo(bx - 13 * s, wy - 10 * s); x.fill(); // neck
    x.beginPath(); x.ellipse(bx - 23 * s, wy - 29 * s, 8 * s, 6.5 * s, 0, 0, Math.PI * 2); x.fill(); // head
    x.beginPath(); x.moveTo(bx - 29 * s, wy - 32 * s); x.lineTo(bx - 45 * s, wy - 27 * s); x.lineTo(bx - 29 * s, wy - 25 * s); x.fill(); // dagger bill
    x.fillStyle = C.eye; x.fillRect(bx - 26 * s, wy - 31 * s, 1.6, 1.4);
    x.fillStyle = C.white; // striped necklace, checkered back, white flank line
    for (let k = 0; k < 4; k++) x.fillRect(bx - 26 * s + k * 2.8 * s, wy - 19 * s, 1, 3);
    for (let r = 0; r < 3; r++) for (let k = 0; k < 8; k++) { const px = bx - 6 * s + k * 4.6 * s + (r % 2) * 2.3 * s, py = wy - 11.5 * s + r * 3.2 * s; if (px < bx + 28 * s - r * 4 * s) x.fillRect(px, py, 1.6, 1.4); }
    x.fillRect(bx - 20 * s, wy - 2.5 * s, 16 * s, 1.2);
    x.restore();
  });
}

// Hooked border in Canada's colours: red and white sawtooth on a dark band, a white line round the picture.
const CANADA_FRAME = { dark: '#231a1a', a: '#b3282d', b: '#efe6d2', line: '#efe6d2' };

// Letter scenes for the Canadian postcard.
const CANADA_SCENES = [
  (c, w, h) => { c.fillStyle = '#e8a83a'; c.fillRect(0, 0, w, h); c.fillStyle = '#b3282d'; mapleLeaf(c, w * 0.5, h * 0.48, w * 0.48); }, // maple leaf
  (c, w, h) => { // Rockies over a turquoise lake
    c.fillStyle = '#8fc0de'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#6a7290'; c.beginPath(); c.moveTo(-w * 0.2, h * 0.66); c.lineTo(w * 0.35, h * 0.14); c.lineTo(w * 0.62, h * 0.4); c.lineTo(w * 0.82, h * 0.24); c.lineTo(w * 1.2, h * 0.66); c.fill();
    c.fillStyle = '#f4f2ec'; c.beginPath(); c.moveTo(w * 0.24, h * 0.25); c.lineTo(w * 0.35, h * 0.14); c.lineTo(w * 0.46, h * 0.26); c.fill();
    c.fillStyle = '#38a6a6'; c.fillRect(0, h * 0.66, w, h);
  },
  (c, w, h) => { // northern lights
    c.fillStyle = '#122247'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#4fdc9c'; c.fillRect(0, h * 0.24, w, h * 0.14); c.fillStyle = '#7d5cc4'; c.fillRect(0, h * 0.14, w, h * 0.1);
    c.fillStyle = '#2fa58a'; c.fillRect(0, h * 0.38, w, h * 0.1);
    c.fillStyle = '#e6edf4'; c.fillRect(0, h * 0.8, w, h);
    c.fillStyle = '#16301f'; c.beginPath(); c.moveTo(w * 0.5, h * 0.42); c.lineTo(w * 0.85, h * 0.85); c.lineTo(w * 0.15, h * 0.85); c.fill();
  },
  (c, w, h) => { // lighthouse stripes
    for (let i = 0; i < 6; i++) { c.fillStyle = i % 2 ? '#f2efe8' : '#b3282d'; c.fillRect(0, (h * i) / 6, w, h / 6 + 1); }
  },
  (c, w, h) => { // prairie with a grain elevator
    c.fillStyle = '#9fcbe2'; c.fillRect(0, 0, w, h); c.fillStyle = '#e3b448'; c.fillRect(0, h * 0.62, w, h);
    c.fillStyle = '#a3302f'; c.fillRect(w * 0.3, h * 0.24, w * 0.4, h * 0.42); c.beginPath(); c.moveTo(w * 0.26, h * 0.26); c.lineTo(w * 0.5, h * 0.1); c.lineTo(w * 0.74, h * 0.26); c.fill();
  },
  (c, w, h) => { // the flag
    c.fillStyle = '#b3282d'; c.fillRect(0, 0, w, h); c.fillStyle = '#f2ece0'; c.fillRect(w * 0.25, 0, w * 0.5, h);
    c.fillStyle = '#b3282d'; mapleLeaf(c, w * 0.5, h * 0.5, w * 0.22);
  },
];
function canadaPostcard(ctx, W, H) { americaPostcard(ctx, W, H, 'CANADA', CANADA_SCENES); }

// A hockey rink from above: the boards, white ice, the red centre line and goal lines, the blue lines, face-off
// circles, the creases and nets, and a maple leaf at centre ice.
function canadaHockey(ctx, W, H) {
  const u = H / 100;
  ctx.fillStyle = '#1d2a44'; ctx.fillRect(0, 0, W, H);                      // stands
  const m = 5 * u, rx = m, ry = m, rw = W - 2 * m, rh = H - 2 * m, rad = 16 * u;
  ctx.fillStyle = '#f2c13a'; roundRect(ctx, rx, ry, rw, rh, rad); ctx.fill(); // kickplate
  const b = 1.8 * u;
  ctx.fillStyle = '#e8f0f3'; roundRect(ctx, rx + b, ry + b, rw - 2 * b, rh - 2 * b, rad - b); ctx.fill(); // ice
  const cx = W / 2, cy = H / 2, RED = '#c0302c', BLUE = '#2b55a6';
  const gl = rx + rw * 0.07, gr = rx + rw * 0.93, bl = cx - rw * 0.16, brl = cx + rw * 0.16;
  ctx.save(); roundRect(ctx, rx + b, ry + b, rw - 2 * b, rh - 2 * b, rad - b); ctx.clip();
  ctx.fillStyle = RED; ctx.fillRect(cx - 1.1 * u, ry, 2.2 * u, rh);                 // centre line
  ctx.fillRect(gl - 0.6 * u, ry, 1.2 * u, rh); ctx.fillRect(gr - 0.6 * u, ry, 1.2 * u, rh); // goal lines
  ctx.fillStyle = BLUE; ctx.fillRect(bl - 1.4 * u, ry, 2.8 * u, rh); ctx.fillRect(brl - 1.4 * u, ry, 2.8 * u, rh); // blue lines
  ctx.restore();
  // centre circle with the leaf
  ctx.strokeStyle = BLUE; ctx.lineWidth = 2 * u; ctx.beginPath(); ctx.arc(cx, cy, 12 * u, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = RED; mapleLeaf(ctx, cx, cy + 0.6 * u, 8 * u);
  // face-off circles and dots in each end, dots in the neutral zone
  ctx.strokeStyle = RED; ctx.lineWidth = 1.9 * u;
  for (const [ex, side] of [[gl + rw * 0.14, -1], [gr - rw * 0.14, 1]]) for (const dy of [-1, 1]) {
    ctx.beginPath(); ctx.arc(ex, cy + dy * rh * 0.24, 10 * u, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(ex, cy + dy * rh * 0.24, 2.2 * u, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + side * rw * 0.22, cy + dy * rh * 0.24, 2.2 * u, 0, Math.PI * 2); ctx.fill();
  }
  // creases and nets
  for (const [x, dir] of [[gl, 1], [gr, -1]]) {
    ctx.fillStyle = '#7fb0e0'; ctx.beginPath(); ctx.moveTo(x, cy - 5 * u); ctx.arc(x, cy, 5 * u, -Math.PI / 2, Math.PI / 2, dir < 0); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = RED; ctx.lineWidth = 0.9 * u; ctx.stroke();
    ctx.fillStyle = RED; ctx.fillRect(dir > 0 ? x - 3.4 * u : x, cy - 3.6 * u, 3.4 * u, 7.2 * u);
    ctx.fillStyle = '#f4f4f0'; ctx.fillRect(dir > 0 ? x - 2.6 * u : x + 0.8 * u, cy - 2.8 * u, 1.8 * u, 5.6 * u);
  }
}

// Northern lights over the snow: green and violet curtains, stars, dark pines and a log cabin with a lit window.
function canadaAurora(ctx, W, H) {
  const u = H / 100, R = rng(626);
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.7); sky.addColorStop(0, '#0a1430'); sky.addColorStop(0.6, '#13305a'); sky.addColorStop(1, '#1f5068');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#e6ecf6'; for (let i = 0; i < 70; i++) { ctx.beginPath(); ctx.arc(R() * W, R() * H * 0.55, (0.35 + R() * 0.5) * u, 0, Math.PI * 2); ctx.fill(); }
  // curtains: wavy ribbons, bright at the lower edge and fading upward
  const curtain = (base, amp, phase, len, col, alpha) => {
    for (let x = 0; x < W; x += 0.8 * u) {
      const y = base + Math.sin(x / (W * 0.16) + phase) * amp + Math.sin(x / (W * 0.05) + phase * 2) * amp * 0.2;
      const g = ctx.createLinearGradient(0, y - len, 0, y);
      g.addColorStop(0, col.replace('A', '0')); g.addColorStop(0.7, col.replace('A', String(alpha * 0.7))); g.addColorStop(1, col.replace('A', String(alpha)));
      ctx.fillStyle = g; ctx.fillRect(x, y - len, 0.9 * u, len);
    }
  };
  curtain(H * 0.3, 7 * u, 0.4, 22 * u, 'rgba(140,90,210,A)', 0.55);
  curtain(H * 0.42, 9 * u, 1.6, 26 * u, 'rgba(70,225,160,A)', 0.9);
  curtain(H * 0.5, 6 * u, 2.9, 14 * u, 'rgba(60,200,190,A)', 0.6);
  // snowy hills
  const hill = (y0, amp, f0, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, H); for (let k = 0; k <= 40; k++) { const t = k / 40; ctx.lineTo(W * t, y0 - amp * Math.sin(t * Math.PI * 2.2 + f0)); } ctx.lineTo(W, H); ctx.fill(); };
  hill(H * 0.66, 4 * u, 0.3, '#7d93b6'); hill(H * 0.76, 5 * u, 2.2, '#c7d5e6'); hill(H * 0.86, 3 * u, 4.1, '#e8eef6');
  // pines
  const pine = (x, by, h) => { ctx.fillStyle = '#10241b'; for (let k = 0; k < 3; k++) { const ty = by - h + k * h * 0.27, w = h * (0.17 + k * 0.08); ctx.beginPath(); ctx.moveTo(x, ty); ctx.lineTo(x + w, ty + h * 0.38); ctx.lineTo(x - w, ty + h * 0.38); ctx.fill(); } ctx.fillRect(x - h * 0.03, by - h * 0.06, h * 0.06, h * 0.08); };
  for (const [fx, fy, h] of [[0.05, 0.86, 30], [0.12, 0.84, 22], [0.19, 0.8, 15], [0.3, 0.72, 9], [0.36, 0.73, 7], [0.62, 0.71, 8], [0.88, 0.84, 26], [0.95, 0.88, 34], [0.8, 0.79, 14]]) pine(W * fx, H * fy, h * u);
  // log cabin with snow on the roof and a warm window
  const cxb = W * 0.66, cyb = H * 0.8, cw = 22 * u, ch = 11 * u;
  ctx.fillStyle = '#5a3a26'; ctx.fillRect(cxb - cw / 2, cyb - ch, cw, ch);
  ctx.fillStyle = '#4a2f1f'; for (let k = 1; k < 4; k++) ctx.fillRect(cxb - cw / 2, cyb - ch + k * ch / 4, cw, 0.5 * u);
  ctx.fillStyle = '#f4f7fb'; ctx.beginPath(); ctx.moveTo(cxb - cw / 2 - 2.5 * u, cyb - ch); ctx.lineTo(cxb, cyb - ch - 9 * u); ctx.lineTo(cxb + cw / 2 + 2.5 * u, cyb - ch); ctx.fill();
  ctx.fillStyle = '#3a2a24'; ctx.fillRect(cxb + cw * 0.22, cyb - ch - 9 * u, 2.6 * u, 6 * u); // chimney
  ctx.fillStyle = '#ffd36a'; ctx.fillRect(cxb - cw * 0.3, cyb - ch * 0.7, 5 * u, 4.4 * u); ctx.fillRect(cxb + cw * 0.08, cyb - ch * 0.7, 5 * u, 4.4 * u);
  ctx.fillStyle = '#e8eef6'; ctx.fillRect(0, cyb, W, H - cyb);
}

// A red-roofed lighthouse on the granite rocks of the Atlantic shore, with waves, a fishing boat and gulls.
function canadaLighthouse(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.56); sky.addColorStop(0, '#4f97cc'); sky.addColorStop(1, '#bfe0ee');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#f7f9fb'; for (const [x, y, r] of [[0.14, 0.16, 6], [0.22, 0.13, 8], [0.3, 0.17, 5], [0.72, 0.1, 6], [0.8, 0.12, 7.5], [0.88, 0.14, 5]]) { ctx.beginPath(); ctx.ellipse(W * x, H * y, r * u * 1.7, r * u, 0, 0, Math.PI * 2); ctx.fill(); }
  const hz = H * 0.56;
  ctx.fillStyle = '#2a6f5a'; ctx.beginPath(); ctx.moveTo(W * 0.7, hz); ctx.quadraticCurveTo(W * 0.86, hz - 6 * u, W, hz - 4 * u); ctx.lineTo(W, hz); ctx.fill(); // far headland
  const sea = ctx.createLinearGradient(0, hz, 0, H); sea.addColorStop(0, '#255f8f'); sea.addColorStop(1, '#2f7aa8');
  ctx.fillStyle = sea; ctx.fillRect(0, hz, W, H - hz);
  ctx.fillStyle = '#d9eef6'; for (let i = 0; i < 26; i++) { const y = hz + 3 * u + (i % 6) * 5 * u, x = ((i * 173) % 100) / 100 * W; ctx.fillRect(x, y, 7 * u, 0.9 * u); }
  // fishing boat
  ctx.fillStyle = '#b3282d'; ctx.beginPath(); ctx.moveTo(W * 0.74, hz + 8 * u); ctx.lineTo(W * 0.84, hz + 8 * u); ctx.lineTo(W * 0.82, hz + 11 * u); ctx.lineTo(W * 0.76, hz + 11 * u); ctx.fill();
  ctx.fillStyle = '#f2efe8'; ctx.fillRect(W * 0.775, hz + 4.5 * u, W * 0.03, 3.5 * u);
  // the lighthouse
  const lx = W * 0.36, base = H * 0.74, top = H * 0.2, bw = 16 * u, tw = 10 * u;
  ctx.fillStyle = '#f2efe8'; ctx.beginPath(); ctx.moveTo(lx - bw / 2, base); ctx.lineTo(lx - tw / 2, top); ctx.lineTo(lx + tw / 2, top); ctx.lineTo(lx + bw / 2, base); ctx.fill();
  ctx.fillStyle = '#d6d1c7'; ctx.beginPath(); ctx.moveTo(lx + bw * 0.15, base); ctx.lineTo(lx + tw * 0.15, top); ctx.lineTo(lx + tw / 2, top); ctx.lineTo(lx + bw / 2, base); ctx.fill(); // shade
  ctx.fillStyle = '#b3282d'; ctx.fillRect(lx - tw / 2 - 2 * u, top - 2 * u, tw + 4 * u, 2.4 * u);          // gallery
  ctx.fillStyle = '#ffe08a'; ctx.fillRect(lx - tw / 2 + 1 * u, top - 8.5 * u, tw - 2 * u, 6.5 * u);       // lantern
  ctx.fillStyle = '#2a2a2e'; for (let k = 0; k < 4; k++) ctx.fillRect(lx - tw / 2 + 1 * u + k * (tw - 2.8 * u) / 3, top - 8.5 * u, 0.8 * u, 6.5 * u);
  ctx.fillStyle = '#b3282d'; ctx.beginPath(); ctx.moveTo(lx - tw / 2 - 0.5 * u, top - 8.5 * u); ctx.lineTo(lx, top - 15 * u); ctx.lineTo(lx + tw / 2 + 0.5 * u, top - 8.5 * u); ctx.fill(); // roof
  ctx.fillStyle = '#b3282d'; ctx.fillRect(lx - 2 * u, base - 8 * u, 4 * u, 8 * u);                         // door
  ctx.fillStyle = '#3a4250'; ctx.fillRect(lx - 1.4 * u, top + 14 * u, 2.8 * u, 3.6 * u); ctx.fillRect(lx - 1.4 * u, top + 30 * u, 2.8 * u, 3.6 * u);
  // granite rocks in front
  const rock = (x, y, rx, ry, col, hi) => { ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = hi; ctx.beginPath(); ctx.ellipse(x - rx * 0.2, y - ry * 0.35, rx * 0.55, ry * 0.4, 0, 0, Math.PI * 2); ctx.fill(); };
  for (const [x, y, rx, ry, c] of [[0.1, 0.92, 22, 12, 0], [0.3, 0.86, 30, 13, 1], [0.5, 0.95, 26, 12, 0], [0.62, 0.84, 16, 8, 1], [0.86, 0.95, 28, 12, 1], [0.44, 0.78, 14, 6, 0]]) {
    rock(W * x, H * y, rx * u, ry * u, c ? '#a39389' : '#b8aaa0', c ? '#c4b6ac' : '#d6cabf');
  }
  ctx.fillStyle = '#f4f8fa'; for (const [x, y] of [[0.56, 0.8], [0.7, 0.83], [0.2, 0.83]]) { ctx.beginPath(); ctx.ellipse(W * x, H * y, 5 * u, 1.6 * u, 0, 0, Math.PI * 2); ctx.fill(); } // spray
  // gulls
  ctx.strokeStyle = '#f7f8fa'; ctx.lineWidth = 1.2 * u; ctx.lineCap = 'round';
  for (const [x, y, s] of [[0.56, 0.24, 3], [0.62, 0.3, 2.4], [0.5, 0.32, 2]]) { ctx.beginPath(); ctx.moveTo(W * x - s * u, H * y - s * 0.4 * u); ctx.quadraticCurveTo(W * x - s * 0.4 * u, H * y - s * 0.8 * u, W * x, H * y); ctx.quadraticCurveTo(W * x + s * 0.4 * u, H * y - s * 0.8 * u, W * x + s * u, H * y - s * 0.4 * u); ctx.stroke(); }
}

// A polar bear walking on an ice floe under the low Arctic sun, icebergs on the horizon.
function canadaPolarBear(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.5); sky.addColorStop(0, '#4d7fae'); sky.addColorStop(0.7, '#9ab9d2'); sky.addColorStop(1, '#f2cdb0');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  const hz = H * 0.5;
  ctx.fillStyle = '#ffe2b0'; ctx.beginPath(); ctx.arc(W * 0.78, hz - 2 * u, 8 * u, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#e4eef4'; for (const [x, w, h] of [[0.08, 0.14, 8], [0.3, 0.08, 5], [0.55, 0.12, 10], [0.9, 0.1, 6]]) { ctx.beginPath(); ctx.moveTo(W * x, hz); ctx.lineTo(W * (x + w * 0.25), hz - h * u); ctx.lineTo(W * (x + w * 0.6), hz - h * 0.8 * u); ctx.lineTo(W * (x + w), hz); ctx.fill(); }
  const sea = ctx.createLinearGradient(0, hz, 0, H); sea.addColorStop(0, '#2c5f86'); sea.addColorStop(1, '#3a76a0');
  ctx.fillStyle = sea; ctx.fillRect(0, hz, W, H - hz);
  ctx.fillStyle = '#ffd9a8'; for (let k = 0; k < 6; k++) ctx.fillRect(W * 0.78 - (7 - k) * u, hz + 2 * u + k * 2.6 * u, (14 - 2 * k) * u, 0.8 * u); // sun on the water
  ctx.fillStyle = '#5f93b8'; for (let i = 0; i < 16; i++) ctx.fillRect(((i * 211) % 100) / 100 * W, hz + 4 * u + (i % 5) * 4 * u, 6 * u, 0.7 * u);
  // the floe: a flat slab with a blue-grey edge
  const fy = H * 0.72;
  ctx.fillStyle = '#9fbdd0'; ctx.beginPath(); ctx.moveTo(W * 0.12, fy); ctx.lineTo(W * 0.8, fy - 2 * u); ctx.lineTo(W * 0.86, fy + 4 * u); ctx.lineTo(W * 0.8, fy + 10 * u); ctx.lineTo(W * 0.16, fy + 10 * u); ctx.lineTo(W * 0.1, fy + 5 * u); ctx.fill();
  ctx.fillStyle = '#dceaf2'; ctx.beginPath(); ctx.moveTo(W * 0.12, fy); ctx.lineTo(W * 0.3, fy - 6 * u); ctx.lineTo(W * 0.72, fy - 8 * u); ctx.lineTo(W * 0.8, fy - 2 * u); ctx.lineTo(W * 0.6, fy + 2 * u); ctx.lineTo(W * 0.2, fy + 3 * u); ctx.fill();
  ctx.fillStyle = '#4a7fa6'; ctx.beginPath(); ctx.ellipse(W * 0.48, fy + 14 * u, 30 * u, 2 * u, 0, 0, Math.PI * 2); ctx.fill(); // reflection
  // the bear, walking left: drawn once a little larger in a shadow tone as an outline, then in cream
  const s = u * 1.15, bx = W * 0.5, by = fy - 4 * u;
  const shape = (grow, body, shade) => {
    const g = grow * s;
    for (const [lx, back] of [[-13, 0], [-6, 1], [10, 0], [16, 1]]) { ctx.fillStyle = shade || (back ? '#d2c6ad' : '#efe5cc'); roundRect(ctx, bx + lx * s - g, by - 12 * s - g, 5 * s + 2 * g, 13 * s + 2 * g, 2 * s); ctx.fill(); }
    ctx.fillStyle = shade || body;
    ctx.beginPath(); ctx.ellipse(bx + 2 * s, by - 16 * s, 21 * s + g, 10 * s + g, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(bx + 14 * s, by - 18 * s, 10 * s + g, 9 * s + g, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(bx - 14 * s, by - 22 * s - g); ctx.lineTo(bx - 25 * s - g, by - 17 * s - g); ctx.lineTo(bx - 24 * s - g, by - 10 * s + g); ctx.lineTo(bx - 12 * s, by - 10 * s + g); ctx.fill();
    ctx.beginPath(); ctx.ellipse(bx - 27 * s, by - 13 * s, 6.5 * s + g, 4.6 * s + g, 0.15, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(bx - 32 * s, by - 11 * s, 3.4 * s + g, 2.6 * s + g, 0.1, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(bx - 25 * s, by - 18 * s, 1.6 * s + g, 0, Math.PI * 2); ctx.fill();
  };
  shape(0.9, null, '#8f8a80');
  shape(0, '#f1e7cc');
  ctx.fillStyle = '#d9cdb2'; ctx.beginPath(); ctx.ellipse(bx + 2 * s, by - 9.5 * s, 18 * s, 3.5 * s, 0, 0, Math.PI * 2); ctx.fill(); // belly shadow
  ctx.fillStyle = '#1a1a1c'; ctx.beginPath(); ctx.arc(bx - 35 * s, by - 11.5 * s, 1.3 * s, 0, Math.PI * 2); ctx.fill(); // nose
  ctx.beginPath(); ctx.arc(bx - 28.5 * s, by - 14.5 * s, 0.9 * s, 0, Math.PI * 2); ctx.fill(); // eye
}

// ---------- Mexico pack ----------
// Woven rugs first (Mexico's own strongest rug craft: sarapes and flat-woven wool rugs), then folk pictures knotted on
// a grid, then hooked pictures.

// Sarape: bright stripes across the cloth in graded bands, and a serrated diamond in the middle on a black ground.
function mexicoSarape(ctx, W, H) {
  const g = knotGrid(ctx, W, H, 96), { cols, rows, blk } = g;
  const C = { black: '#1c1418', white: '#f2ead8', red: '#c22a32', pink: '#e2477a', orange: '#ee7a2a', yellow: '#f4c13a',
    green: '#3f9a4a', teal: '#1f9a9a', blue: '#2c4fa0', purple: '#6a3a8f', maroon: '#7a1f2c' };
  const seq = [], add = (c, n) => { for (let k = 0; k < n; k++) seq.push(c); };
  add(C.black, 2); add(C.white, 1); add(C.red, 3); add(C.orange, 2); add(C.yellow, 2); add(C.white, 1); add(C.teal, 2); add(C.blue, 3);
  add(C.purple, 2); add(C.white, 1); add(C.pink, 3); add(C.red, 2); add(C.maroon, 2); add(C.black, 1); add(C.yellow, 1); add(C.black, 1);
  add(C.green, 3); add(C.teal, 2); add(C.white, 1); add(C.orange, 3); add(C.yellow, 2); add(C.pink, 2); add(C.purple, 2);
  // stripes run across the rug, mirrored about the middle so both ends match
  for (let x = 0; x < cols; x++) { const k = Math.min(x, cols - 1 - x), c = seq[k % seq.length]; for (let y = 0; y < rows; y++) blk(x, y, c); }
  // centre: black field in a stepped lozenge, holding concentric serrated diamonds
  const cx = (cols - 1) / 2, cy = (rows - 1) / 2, hw = cols * 0.19, hh = rows * 0.38;
  const rings = [C.yellow, C.orange, C.red, C.maroon, C.black, C.white, C.teal, C.blue, C.black, C.pink, C.red, C.black, C.yellow, C.black];
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const d = Math.abs(x - cx) / hw + Math.abs(y - cy) / hh;
    if (d > 1.12) continue;
    if (d > 1) { blk(x, y, C.black); continue; }
    const teeth = ((Math.abs(x - cx) + Math.abs(y - cy)) % 2) * 0.03; // serrated ring edges
    blk(x, y, rings[Math.min(rings.length - 1, Math.floor((d + teeth) * rings.length))]);
  }
  // black binding round the edge with little white stitches on the long sides
  for (let x = 0; x < cols; x++) { blk(x, 0, C.black); blk(x, rows - 1, C.black); if (x % 3 === 1) { blk(x, 1, C.white); blk(x, rows - 2, C.white); } }
  for (let y = 0; y < rows; y++) { blk(0, y, C.black); blk(cols - 1, y, C.black); }
}

// Flat-woven wool rug in natural dyes (cochineal red, indigo, marigold) with a running step-fret (greca) border and a
// big stepped diamond in the field.
function mexicoGreca(ctx, W, H) {
  const g = knotGrid(ctx, W, H, 90), { cols, rows, blk } = g;
  const C = { cream: '#ebdfc4', red: '#a32b2f', red2: '#922529', indigo: '#24365e', gold: '#d99a2b', char: '#2b2422', brown: '#7a5236' };
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) blk(x, y, C.char);
  // the fret: a key that spirals in, its baseline running on into the next one
  const KEY = ['#####.', '#...#.', '#.#.#.', '#.###.', '#.....', '######'];
  const B = 1, band = 6, inner = B + band;          // char edge, then the fret band
  for (let y = B; y < rows - B; y++) for (let x = B; x < cols - B; x++) if (x < inner || y < inner || x >= cols - inner || y >= rows - inner) blk(x, y, C.cream);
  const runH = (y0, flip) => { const len = cols - 2 * inner, n = Math.floor(len / 6), off = inner + Math.floor((len - n * 6) / 2);
    for (let i = 0; i < n * 6; i++) for (let r = 0; r < 6; r++) if (KEY[flip ? 5 - r : r][i % 6] === '#') blk(off + i, y0 + r, C.char); };
  const runV = (x0, flip) => { const len = rows - 2 * inner, n = Math.floor(len / 6), off = inner + Math.floor((len - n * 6) / 2);
    for (let i = 0; i < n * 6; i++) for (let r = 0; r < 6; r++) if (KEY[flip ? 5 - r : r][i % 6] === '#') blk(x0 + r, off + i, C.char); };
  runH(B, false); runH(rows - B - 6, true); runV(B, false); runV(cols - B - 6, true);
  // corner blocks: a small stepped diamond
  for (const [x0, y0] of [[B, B], [cols - inner, B], [B, rows - inner], [cols - inner, rows - inner]]) {
    for (let dy = 0; dy < band; dy++) for (let dx = 0; dx < band; dx++) {
      const d = Math.abs(dx - 2.5) + Math.abs(dy - 2.5);
      blk(x0 + dx, y0 + dy, d < 1.5 ? C.red : d < 2.6 ? C.char : C.cream);
    }
  }
  // lines between border and field
  for (let x = inner; x < cols - inner; x++) { blk(x, inner, C.gold); blk(x, rows - 1 - inner, C.gold); blk(x, inner + 1, C.char); blk(x, rows - 2 - inner, C.char); }
  for (let y = inner; y < rows - inner; y++) { blk(inner, y, C.gold); blk(cols - 1 - inner, y, C.gold); blk(inner + 1, y, C.char); blk(cols - 2 - inner, y, C.char); }
  // red field with lazy lines
  const fx0 = inner + 2, fy0 = inner + 2, fx1 = cols - inner - 3, fy1 = rows - inner - 3;
  for (let y = fy0; y <= fy1; y++) for (let x = fx0; x <= fx1; x++) blk(x, y, (y - fy0) % 5 === 4 && (x + y) % 9 < 6 ? C.red2 : C.red);
  // big stepped diamond: concentric rings, a hook on each side point
  const cx = (fx0 + fx1) / 2, cy = (fy0 + fy1) / 2, hh = (fy1 - fy0) / 2 - 2, hw = hh * 1.5;
  const rings = [C.char, C.char, C.cream, C.cream, C.indigo, C.indigo, C.indigo, C.gold, C.gold, C.cream, C.cream, C.red, C.red, C.char, C.gold];
  for (let y = fy0; y <= fy1; y++) for (let x = fx0; x <= fx1; x++) {
    const d = Math.abs(x - cx) / hw + Math.abs(y - cy) / hh;
    if (d <= 1) blk(x, y, rings[Math.min(rings.length - 1, Math.floor((1 - d) * rings.length))]);
  }
  // corner quarter-diamonds in indigo, outlined in cream
  for (const [ax, ay, sx, sy] of [[fx0, fy0, 1, 1], [fx1, fy0, -1, 1], [fx0, fy1, 1, -1], [fx1, fy1, -1, 1 * -1]]) {
    for (let dy = 0; dy < 12; dy++) for (let dx = 0; dx < 18; dx++) { const d = dx / 18 + dy / 12; if (d < 1) blk(ax + sx * dx, ay + sy * dy, d > 0.86 ? C.cream : C.indigo); }
  }
  // little stepped crosses in gold between the diamond and the corners
  for (const [x, y] of [[cx - hw * 0.95, cy - hh * 0.62], [cx + hw * 0.95, cy - hh * 0.62], [cx - hw * 0.95, cy + hh * 0.62], [cx + hw * 0.95, cy + hh * 0.62]]) {
    const X = Math.round(x), Y = Math.round(y);
    for (const [dx, dy] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [2, 0], [-2, 0], [0, 2], [0, -2]]) blk(X + dx, Y + dy, C.gold);
    blk(X, Y, C.char);
  }
}

// Blue-and-white painted tiles: a cobalt flower in each tile, quarter circles in the corners that join into rings
// across four tiles, yellow and orange touches, set in grout with a cobalt border.
function mexicoTile(ctx, W, H) {
  const u = H / 100;
  const C = { glaze: '#f3ecdc', glaze2: '#ebe2cf', cobalt: '#1f3f8f', blue: '#5a82c8', yellow: '#e7b638', orange: '#d9682b', green: '#3f7d4a', grout: '#bdb5a5' };
  const bw = 6 * u;
  ctx.fillStyle = C.cobalt; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = C.yellow; frameRect(ctx, bw * 0.55, bw * 0.55, W - bw * 1.1, H - bw * 1.1, 0.9 * u);
  ctx.fillStyle = C.glaze; for (const [x, y, len, horiz] of [[bw, bw * 0.28, W - 2 * bw, 1], [bw, H - bw * 0.28, W - 2 * bw, 1], [bw * 0.28, bw, H - 2 * bw, 0], [W - bw * 0.28, bw, H - 2 * bw, 0]]) {
    const { n, d } = evenSteps(len, 3 * u); for (let i = 0; i <= n; i++) { ctx.beginPath(); ctx.arc(horiz ? x + i * d : x, horiz ? y : y + i * d, 0.5 * u, 0, Math.PI * 2); ctx.fill(); }
  }
  const fx = bw, fy = bw, fw = W - 2 * bw, fh = H - 2 * bw, nr = 4, nc = Math.round(fw / (fh / nr)), tw = fw / nc, th = fh / nr;
  ctx.fillStyle = C.grout; ctx.fillRect(fx, fy, fw, fh);
  const g = 0.35 * u;
  for (let j = 0; j < nr; j++) for (let i = 0; i < nc; i++) {
    const x = fx + i * tw, y = fy + j * th;
    ctx.save(); ctx.beginPath(); ctx.rect(x + g, y + g, tw - 2 * g, th - 2 * g); ctx.clip();
    ctx.fillStyle = (i + j) % 2 ? C.glaze : C.glaze2; ctx.fillRect(x, y, tw, th);
    const T = Math.min(tw, th);
    // corner quarter circles: cobalt ring, yellow, orange eye
    for (const [cx, cy] of [[x, y], [x + tw, y], [x, y + th], [x + tw, y + th]]) {
      ctx.fillStyle = C.cobalt; ctx.beginPath(); ctx.arc(cx, cy, T * 0.3, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(cx, cy, T * 0.19, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = C.orange; ctx.beginPath(); ctx.arc(cx, cy, T * 0.08, 0, Math.PI * 2); ctx.fill();
    }
    // centre flower: eight petals, a yellow and orange heart
    const mx = x + tw / 2, my = y + th / 2;
    for (let k = 0; k < 8; k++) { const a = (k / 8) * Math.PI * 2; ctx.fillStyle = k % 2 ? C.blue : C.cobalt; ctx.beginPath(); ctx.ellipse(mx + Math.cos(a) * T * 0.17, my + Math.sin(a) * T * 0.17, T * 0.12, T * 0.055, a, 0, Math.PI * 2); ctx.fill(); }
    ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(mx, my, T * 0.075, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.orange; ctx.beginPath(); ctx.arc(mx, my, T * 0.035, 0, Math.PI * 2); ctx.fill();
    // green leaves toward the middle of each edge
    ctx.fillStyle = C.green;
    for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) { ctx.beginPath(); ctx.ellipse(mx + dx * tw * 0.4, my + dy * th * 0.4, T * (dx ? 0.03 : 0.06), T * (dx ? 0.06 : 0.03), 0, 0, Math.PI * 2); ctx.fill(); }
    // glaze highlight
    const hl = ctx.createLinearGradient(x, y, x + tw, y + th); hl.addColorStop(0, 'rgba(255,255,255,.14)'); hl.addColorStop(0.5, 'rgba(255,255,255,0)');
    ctx.fillStyle = hl; ctx.fillRect(x, y, tw, th);
    ctx.restore();
  }
}

// A woven landscape of the blue agave fields: rows of spiky rosettes on red earth running off to a volcano at sunset.
function mexicoAgave(ctx, W, H) {
  const g = knotGrid(ctx, W, H, 96), { cols, rows, blk } = g;
  const C = { frame: '#2a1a24', line: '#f0dcc0', tooth: '#e2477a', tooth2: '#ee7a2a',
    sky: ['#3b2a5e', '#5f3474', '#93407a', '#c8566a', '#e8795a', '#f4a35a', '#f8cc72'], sun: '#fde6a0',
    far: '#6a4a7e', far2: '#7f5a8a', vol: '#4f3a6a', vol2: '#5f4878', earth: '#9c4f36', earth2: '#87422e', earth3: '#b5623f', ag: '#6aa8a0', ag2: '#3f7f7a', ag3: '#8fc4b8' };
  const fb = 4;
  ctx.fillStyle = C.frame; ctx.fillRect(0, 0, W, H);
  const x0 = fb + 1, y0 = fb + 1, x1 = cols - fb - 2, y1 = rows - fb - 2;
  for (let x = fb; x <= cols - fb - 1; x++) { blk(x, fb, C.line); blk(x, rows - fb - 1, C.line); }
  for (let y = fb; y <= rows - fb - 1; y++) { blk(fb, y, C.line); blk(cols - fb - 1, y, C.line); }
  const teethRow = (len, put) => { const n = Math.max(1, Math.round(len / 4)), per = len / n; for (let i = 0; i < len; i++) { const ph = (i % per) / per, k = Math.floor(i / per); const h = ph < 0.5 ? Math.round(ph * 4) : Math.round((1 - ph) * 4); for (let j = 0; j < Math.min(2, h); j++) put(i, j, k % 2 ? C.tooth2 : C.tooth); } };
  teethRow(cols - 2 * fb - 2, (i, j, c) => { blk(fb + 1 + i, 1 + j, c); blk(fb + 1 + i, rows - 2 - j, c); });
  teethRow(rows - 2 * fb - 2, (i, j, c) => { blk(1 + j, fb + 1 + i, c); blk(cols - 2 - j, fb + 1 + i, c); });
  for (const [cx, cy] of [[2, 2], [cols - 3, 2], [2, rows - 3], [cols - 3, rows - 3]]) { blk(cx, cy, C.line); blk(cx - 1, cy, C.tooth); blk(cx + 1, cy, C.tooth); blk(cx, cy - 1, C.tooth); blk(cx, cy + 1, C.tooth); }

  const fw = x1 - x0 + 1, fh = y1 - y0 + 1, hz = y0 + Math.round(fh * 0.42);
  for (let y = y0; y < hz; y++) for (let x = x0; x <= x1; x++) { const t = (y - y0) / (hz - y0); blk(x, y, C.sky[Math.min(C.sky.length - 1, Math.max(0, Math.floor(t * C.sky.length + (((x * 7 + y * 3) % 5) - 2) * 0.06)))]); }
  const sx = x0 + Math.round(fw * 0.72), sr = Math.round(fh * 0.1);
  for (let dy = -sr; dy <= 0; dy++) for (let dx = -sr; dx <= sr; dx++) if (dx * dx + dy * dy <= sr * sr) blk(sx + dx, hz + dy, C.sun);
  // far hills and the volcano: a cone with a flat top
  for (let x = x0; x <= x1; x++) {
    const h1 = Math.round(4 + 2 * Math.sin(x * 0.11) + ((x * 7) % 3 === 0 ? 1 : 0));
    for (let k = 0; k < h1; k++) blk(x, hz - 1 - k, k === h1 - 1 ? C.far2 : C.far);
    const vx = x0 + fw * 0.3, vh = Math.round(fh * 0.28 - Math.max(0, Math.abs(x - vx) - 3) * 0.75);
    for (let k = 0; k < vh; k++) blk(x, hz - 1 - k, x < vx ? C.vol2 : C.vol);
  }
  // earth, then rows of agaves in perspective, small and close together far away
  for (let y = hz; y <= y1; y++) for (let x = x0; x <= x1; x++) blk(x, y, (y - hz) % 4 === 1 ? C.earth2 : C.earth);
  const vpx = x0 + fw * 0.5, N = 7;
  for (let r = 0; r < N; r++) {
    const t = (r + 2) / (N + 1), y = Math.round(hz + 2 + (y1 - hz - 3) * t * t), size = 1 + Math.round(t * t * 8), gap = 5 + t * t * 15;
    for (let x = vpx - Math.floor((vpx - x0) / gap) * gap; x <= x1; x += gap) {
      const X = Math.round(x);
      blk(X, y + 1, C.earth3);
      for (const [ang, len] of [[-90, 0.8], [-68, 1], [-112, 1], [-45, 0.95], [-135, 0.95], [-22, 0.8], [-158, 0.8], [-5, 0.5], [-175, 0.5]]) {
        const L = Math.max(1, Math.round(size * len)), a = (ang * Math.PI) / 180;
        for (let k = 1; k <= L; k++) { const px = X + Math.round(Math.cos(a) * k * 1.3), py = y + Math.round(Math.sin(a) * k); if (px >= x0 && px <= x1 && py >= hz) blk(px, py, k === L && size > 3 ? C.ag3 : ang === -90 || size < 3 ? C.ag : C.ag2); }
      }
      blk(X, y, C.ag2);
    }
  }
}

// Border for the Mexican folk pictures: like the others, with a little four-petal flower in each corner.
function mexicoBorder(x, cols, rows, C) {
  pictureBorder(x, cols, rows, C);
  for (const [cx, cy] of [[2.6, 2.6], [cols - 2.6, 2.6], [2.6, rows - 2.6], [cols - 2.6, rows - 2.6]]) {
    x.fillStyle = C.frame; x.fillRect(cx - 2.6, cy - 2.6, 5.2, 5.2);
    x.fillStyle = C.star; for (const [dx, dy] of [[0, -1.3], [0, 1.3], [-1.3, 0], [1.3, 0]]) { x.beginPath(); x.arc(cx + dx, cy + dy, 1.1, 0, Math.PI * 2); x.fill(); }
    x.fillStyle = C.accent; x.fillRect(cx - 0.6, cy - 0.6, 1.2, 1.2);
  }
}

// Folk picture: a sugar skull for the Day of the Dead, flowers for eyes, among marigolds on a dark ground.
function mexicoSkull(ctx, W, H) {
  const C = { frame: '#1b1420', line: '#f0e2c4', accent: '#e8782a', star: '#e4407a',
    bg: '#2a1a36', bg2: '#33204a', bone: '#f3ece0', bone2: '#d6ccbd', black: '#141016', pink: '#e4407a', teal: '#2fb3b0',
    yellow: '#f2c23a', orange: '#e8782a', purple: '#8a4aa8', green: '#4f9a4a', red: '#c22a32' };
  weavePicture(ctx, W, H, 104, Object.values(C), (x, cols, rows) => {
    mexicoBorder(x, cols, rows, C);
    const fx = 8, fy = 8, fw = cols - 16, fh = rows - 16;
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    x.fillStyle = C.bg; x.fillRect(fx, fy, fw, fh);
    x.fillStyle = C.bg2; for (let y = fy + 3; y < fy + fh; y += 6) x.fillRect(fx, y, fw, 1);
    // marigolds and leaves down both sides
    const marigold = (mx, my, r, col, col2) => {
      x.fillStyle = C.green; x.beginPath(); x.ellipse(mx - r * 1.1, my + r * 0.9, r * 0.9, r * 0.35, -0.5, 0, Math.PI * 2); x.ellipse(mx + r * 1.1, my + r * 0.9, r * 0.9, r * 0.35, 0.5, 0, Math.PI * 2); x.fill();
      x.fillStyle = col; for (let k = 0; k < 10; k++) { const a = (k / 10) * Math.PI * 2; x.beginPath(); x.arc(mx + Math.cos(a) * r * 0.7, my + Math.sin(a) * r * 0.7, r * 0.42, 0, Math.PI * 2); x.fill(); }
      x.fillStyle = col2; x.beginPath(); x.arc(mx, my, r * 0.5, 0, Math.PI * 2); x.fill();
    };
    for (const [mx, my, r, k] of [[0.08, 0.18, 6, 0], [0.2, 0.42, 5, 1], [0.07, 0.68, 7, 1], [0.2, 0.88, 5, 0], [0.92, 0.2, 6, 1], [0.8, 0.44, 5, 0], [0.93, 0.68, 7, 0], [0.8, 0.9, 5, 1]]) {
      marigold(fx + fw * mx, fy + fh * my, r, k ? C.orange : C.yellow, k ? C.yellow : C.orange);
    }
    // the skull
    const s = fh / 100, cx = fx + fw / 2, cy = fy + fh * 0.48;
    x.fillStyle = C.bone2; x.beginPath(); x.ellipse(cx + 1, cy - 6 * s + 1, 33 * s, 31 * s, 0, 0, Math.PI * 2); x.fill(); // shadow
    x.fillStyle = C.bone;
    x.beginPath(); x.ellipse(cx, cy - 8 * s, 33 * s, 31 * s, 0, 0, Math.PI * 2); x.fill();           // cranium
    x.beginPath(); x.ellipse(cx, cy + 12 * s, 26 * s, 14 * s, 0, 0, Math.PI * 2); x.fill();          // cheeks
    roundRect(x, cx - 17 * s, cy + 14 * s, 34 * s, 22 * s, 7 * s); x.fill();                           // jaw
    // eyes: black sockets ringed with pink and teal petals
    for (const sx of [-1, 1]) {
      const ex = cx + sx * 13 * s, ey = cy + 2 * s;
      for (let k = 0; k < 8; k++) { const a = (k / 8) * Math.PI * 2; x.fillStyle = k % 2 ? C.teal : C.pink; x.beginPath(); x.arc(ex + Math.cos(a) * 10 * s, ey + Math.sin(a) * 10 * s, 3.4 * s, 0, Math.PI * 2); x.fill(); }
      x.fillStyle = C.black; x.beginPath(); x.arc(ex, ey, 8 * s, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.yellow; x.beginPath(); x.arc(ex, ey, 2.4 * s, 0, Math.PI * 2); x.fill();
    }
    // nose: an upside-down heart
    x.fillStyle = C.black; x.beginPath(); x.moveTo(cx, cy + 13 * s); x.lineTo(cx - 4.5 * s, cy + 20 * s); x.lineTo(cx, cy + 22 * s); x.lineTo(cx + 4.5 * s, cy + 20 * s); x.fill();
    // mouth: stitched smile and teeth
    x.fillStyle = C.black; x.fillRect(cx - 15 * s, cy + 27 * s, 30 * s, 1.4);
    for (let k = -3; k <= 3; k++) x.fillRect(cx + k * 4.4 * s - 0.5, cy + 24 * s, 1, 7 * s);
    // forehead flower and dotted arcs
    const ffx = cx, ffy = cy - 25 * s;
    for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2; x.fillStyle = k % 2 ? C.orange : C.yellow; x.beginPath(); x.arc(ffx + Math.cos(a) * 6 * s, ffy + Math.sin(a) * 6 * s, 3.6 * s, 0, Math.PI * 2); x.fill(); }
    x.fillStyle = C.pink; x.beginPath(); x.arc(ffx, ffy, 3.2 * s, 0, Math.PI * 2); x.fill();
    for (const [sx, col] of [[-1, C.purple], [1, C.purple]]) for (let k = 0; k < 5; k++) { const a = Math.PI * (sx < 0 ? 0.62 + k * 0.08 : 0.38 - k * 0.08); x.fillStyle = col; x.beginPath(); x.arc(ffx + Math.cos(a) * 16 * s * -1, ffy + 6 * s - Math.sin(a) * 9 * s, 1.6 * s, 0, Math.PI * 2); x.fill(); }
    // cheek swirls: dots and a little leaf
    for (const sx of [-1, 1]) {
      x.fillStyle = C.green; x.beginPath(); x.ellipse(cx + sx * 22 * s, cy + 14 * s, 4 * s, 1.8 * s, sx * 0.6, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.red; x.beginPath(); x.arc(cx + sx * 24 * s, cy + 9 * s, 2 * s, 0, Math.PI * 2); x.fill();
    }
    // chin: a teal heart
    x.fillStyle = C.teal; x.beginPath(); x.arc(cx - 2.2 * s, cy + 33 * s, 2.4 * s, 0, Math.PI * 2); x.arc(cx + 2.2 * s, cy + 33 * s, 2.4 * s, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.moveTo(cx - 4.4 * s, cy + 33.6 * s); x.lineTo(cx, cy + 38 * s); x.lineTo(cx + 4.4 * s, cy + 33.6 * s); x.fill();
    x.restore();
  });
}

// Folk picture: monarch butterflies flying over the fir forest where they spend the winter.
function mexicoMonarch(ctx, W, H) {
  const C = { frame: '#1d2a1f', line: '#efe3c6', accent: '#e8782a', star: '#efe3c6',
    sky: '#8fc8e2', sky2: '#b9def0', fir: '#1f4a35', fir2: '#2c5e43', fir3: '#163a2a', ground: '#3d5a35',
    orange: '#ec7a22', orange2: '#f5a03a', black: '#141414', white: '#f6f2ea' };
  weavePicture(ctx, W, H, 104, Object.values(C), (x, cols, rows) => {
    mexicoBorder(x, cols, rows, C);
    const fx = 8, fy = 8, fw = cols - 16, fh = rows - 16;
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    for (let y = fy; y < fy + fh; y++) { x.fillStyle = (y - fy) < fh * 0.32 ? C.sky : C.sky2; x.fillRect(fx, y, fw, 1); }
    // layered fir forest
    const firRow = (base, h, step, col, seed) => { for (let i = 0, px = fx - 2; px < fx + fw + 4; i++, px += step) { const hh = h * (0.8 + ((i * seed) % 5) * 0.1); x.fillStyle = col; x.beginPath(); x.moveTo(px, base - hh); x.lineTo(px + hh * 0.22, base); x.lineTo(px - hh * 0.22, base); x.fill(); } x.fillRect(fx, base, fw, fh); };
    firRow(fy + fh * 0.62, fh * 0.3, 6, C.fir2, 3); firRow(fy + fh * 0.78, fh * 0.34, 7, C.fir, 7); firRow(fy + fh * 0.95, fh * 0.3, 9, C.fir3, 5);
    // butterflies
    const butterfly = (bx, by, s, rot) => {
      x.save(); x.translate(bx, by); x.rotate(rot);
      const wing = (sx, top) => {
        const rx = top ? 7 * s : 5 * s, ry = top ? 5 * s : 4 * s, wx = sx * (top ? 6.5 * s : 4.5 * s), wy = top ? -3 * s : 3.6 * s;
        x.fillStyle = C.black; x.beginPath(); x.ellipse(wx, wy, rx, ry, sx * (top ? -0.35 : 0.4), 0, Math.PI * 2); x.fill();
        x.fillStyle = top ? C.orange : C.orange2; x.beginPath(); x.ellipse(wx - sx * 0.6 * s, wy, rx * 0.72, ry * 0.68, sx * (top ? -0.35 : 0.4), 0, Math.PI * 2); x.fill();
        if (s > 1.4) { // veins and white dots on the big ones
          x.strokeStyle = C.black; x.lineWidth = Math.max(0.8, s * 0.35);
          for (const k of [-0.5, 0, 0.5]) { x.beginPath(); x.moveTo(sx * 0.6 * s, 0); x.lineTo(wx + sx * rx * 0.5, wy + k * ry); x.stroke(); }
          x.fillStyle = C.white; for (let k = 0; k < 4; k++) { const a = (top ? -1.4 : 0.6) + k * 0.4; x.beginPath(); x.arc(wx + Math.cos(a) * rx * 0.88 * sx, wy + Math.sin(a) * ry * 0.88, Math.max(0.5, s * 0.4), 0, Math.PI * 2); x.fill(); }
        }
      };
      for (const sx of [-1, 1]) { wing(sx, false); wing(sx, true); }
      x.fillStyle = C.black; x.beginPath(); x.ellipse(0, 0, 1 * s, 5 * s, 0, 0, Math.PI * 2); x.fill();
      x.restore();
    };
    const R = rng(1919);
    for (let i = 0; i < 22; i++) butterfly(fx + R() * fw, fy + R() * fh * 0.7, 0.55 + R() * 0.35, (R() - 0.5) * 0.8);
    butterfly(fx + fw * 0.26, fy + fh * 0.4, 2.3, -0.2);
    butterfly(fx + fw * 0.74, fy + fh * 0.64, 1.9, 0.25);
    x.restore();
  });
}

// Folk picture: a painted wooden jaguar in the colours of the carved animals from Oaxaca: patterned all over, on pink.
function mexicoJaguar(ctx, W, H) {
  const C = { frame: '#2a1430', line: '#f2e4c4', accent: '#2fb3b0', star: '#f2c23a',
    bg: '#d6246e', bg2: '#c01e62', dot: '#f2c23a', yellow: '#f2b52e', orange: '#e8782a', teal: '#2fb3b0', purple: '#6a3a8f',
    black: '#1b1420', white: '#f6efe0', green: '#4f9a4a', pink: '#f07aa8' };
  weavePicture(ctx, W, H, 104, Object.values(C), (x, cols, rows) => {
    mexicoBorder(x, cols, rows, C);
    const fx = 8, fy = 8, fw = cols - 16, fh = rows - 16;
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    x.fillStyle = C.bg; x.fillRect(fx, fy, fw, fh);
    x.fillStyle = C.bg2; for (let y = fy + 2; y < fy + fh; y += 5) for (let k = 0; k < fw; k += 5) x.fillRect(fx + k + (y % 10 ? 2.5 : 0), y, 1, 1);
    // flowers around
    for (const [px, py, col] of [[0.1, 0.18, C.yellow], [0.88, 0.15, C.teal], [0.08, 0.8, C.teal], [0.9, 0.82, C.yellow], [0.5, 0.1, C.purple]]) {
      const X = fx + fw * px, Y = fy + fh * py;
      x.fillStyle = col; for (let k = 0; k < 5; k++) { const a = (k / 5) * Math.PI * 2; x.beginPath(); x.arc(X + Math.cos(a) * 2.6, Y + Math.sin(a) * 2.6, 1.8, 0, Math.PI * 2); x.fill(); }
      x.fillStyle = C.white; x.beginPath(); x.arc(X, Y, 1.2, 0, Math.PI * 2); x.fill();
    }
    // the jaguar, walking left
    const s = fh / 76, bx = fx + fw * 0.54, by = fy + fh * 0.84;
    const legs = [[-22, 1], [-12, 0], [14, 1], [24, 0]];
    for (const [lx, back] of legs) { // legs, striped
      x.fillStyle = back ? C.orange : C.yellow; roundRect(x, bx + lx * s, by - 20 * s, 6 * s, 26 * s, 2.5 * s); x.fill();
      x.fillStyle = C.purple; for (let k = 0; k < 3; k++) x.fillRect(bx + lx * s, by - 10 * s + k * 5 * s, 6 * s, 1.4);
      x.fillStyle = C.black; x.fillRect(bx + lx * s - 0.5, by + 5 * s, 7 * s, 1.4);
    }
    // tail curling up
    x.strokeStyle = C.yellow; x.lineWidth = 4.5 * s; x.lineCap = 'round';
    x.beginPath(); x.moveTo(bx + 28 * s, by - 26 * s); x.quadraticCurveTo(bx + 46 * s, by - 26 * s, bx + 44 * s, by - 46 * s); x.stroke();
    x.strokeStyle = C.teal; x.lineWidth = 1.4; for (let k = 0; k < 4; k++) { const t = 0.25 + k * 0.2, tx = bx + (28 + 18 * t) * s, ty = by - (26 + 20 * t * t) * s; x.beginPath(); x.moveTo(tx - 2 * s, ty); x.lineTo(tx + 2 * s, ty); x.stroke(); }
    x.fillStyle = C.yellow; x.beginPath(); x.ellipse(bx + 2 * s, by - 24 * s, 31 * s, 12 * s, 0, 0, Math.PI * 2); x.fill(); // body
    // rosettes: rings with a dot
    for (let r = 0; r < 2; r++) for (let k = 0; k < 5; k++) {
      const px = bx - 16 * s + k * 9 * s + r * 4.5 * s, py = by - 28 * s + r * 8 * s;
      x.fillStyle = [C.teal, C.purple, C.orange][(k + r) % 3]; x.beginPath(); x.arc(px, py, 3.2 * s, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.yellow; x.beginPath(); x.arc(px, py, 1.5 * s, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.black; x.fillRect(px - 0.5, py - 0.5, 1, 1);
    }
    x.fillStyle = C.orange; x.fillRect(bx - 26 * s, by - 14 * s, 52 * s, 1.4); // belly line
    // head
    const hx = bx - 33 * s, hy = by - 30 * s;
    x.fillStyle = C.yellow; x.beginPath(); x.arc(hx, hy, 11 * s, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.ellipse(hx - 8 * s, hy + 4 * s, 7 * s, 5.5 * s, 0, 0, Math.PI * 2); x.fill(); // muzzle
    for (const ex of [-1, 1]) { x.fillStyle = C.yellow; x.beginPath(); x.arc(hx + ex * 6 * s + 2 * s, hy - 10 * s, 3.6 * s, 0, Math.PI * 2); x.fill(); x.fillStyle = C.pink; x.beginPath(); x.arc(hx + ex * 6 * s + 2 * s, hy - 10 * s, 1.8 * s, 0, Math.PI * 2); x.fill(); }
    x.fillStyle = C.white; x.beginPath(); x.ellipse(hx - 4 * s, hy - 2 * s, 3.4 * s, 2.6 * s, 0, 0, Math.PI * 2); x.fill();
    x.fillStyle = C.black; x.beginPath(); x.arc(hx - 4.6 * s, hy - 2 * s, 1.6 * s, 0, Math.PI * 2); x.fill();
    x.fillStyle = C.pink; x.beginPath(); x.moveTo(hx - 15 * s, hy + 1 * s); x.lineTo(hx - 11 * s, hy + 1 * s); x.lineTo(hx - 13 * s, hy + 4 * s); x.fill(); // nose
    x.fillStyle = C.black; x.fillRect(hx - 14 * s, hy + 7 * s, 8 * s, 1.2); // mouth
    x.fillStyle = C.teal; for (let k = 0; k < 3; k++) x.fillRect(hx + 2 * s + k * 3 * s, hy - 6 * s + k * 0.5, 1.2, 1.2); // forehead dots
    x.fillStyle = C.purple; x.fillRect(hx + 3 * s, hy + 3 * s, 6 * s, 1.2);
    x.restore();
  });
}

// Hooked border in festive colours: Mexican pink and marigold sawtooth on a dark plum band.
const MEXICO_FRAME = { dark: '#2a1630', a: '#d6246e', b: '#e8902a', line: '#efe3c6' };

// Letter scenes for the Mexican postcard.
const MEXICO_SCENES = [
  (c, w, h) => { // stepped pyramid in the jungle
    c.fillStyle = '#7cc3e6'; c.fillRect(0, 0, w, h); c.fillStyle = '#2f7a3f'; c.fillRect(0, h * 0.72, w, h);
    c.fillStyle = '#c9bfa8'; for (let k = 0; k < 5; k++) c.fillRect(w * (0.05 + k * 0.08), h * (0.72 - (k + 1) * 0.09), w * (0.9 - k * 0.16), h * 0.09);
    c.fillStyle = '#9b8f78'; c.fillRect(w * 0.44, h * 0.27, w * 0.12, h * 0.45);
  },
  (c, w, h) => { const cols = ['#c22a32', '#ee7a2a', '#f4c13a', '#3f9a4a', '#1f9a9a', '#2c4fa0', '#6a3a8f', '#e2477a']; for (let i = 0; i < 8; i++) { c.fillStyle = cols[i]; c.fillRect(0, (h * i) / 8, w, h / 8 + 1); } }, // sarape
  (c, w, h) => { // papel picado
    c.fillStyle = '#e2477a'; c.fillRect(0, 0, w, h * 0.5); c.fillStyle = '#1f9a9a'; c.fillRect(0, h * 0.5, w, h);
    c.fillStyle = '#f6efe0'; for (let k = 0; k < 6; k++) { c.beginPath(); c.arc(w * (0.2 + (k % 3) * 0.3), h * (0.25 + Math.floor(k / 3) * 0.5), w * 0.07, 0, Math.PI * 2); c.fill(); }
  },
  (c, w, h) => { // saguaro on the sand
    c.fillStyle = '#f2b45a'; c.fillRect(0, 0, w, h); c.fillStyle = '#d99a5a'; c.fillRect(0, h * 0.75, w, h);
    c.fillStyle = '#2f6b3f'; c.fillRect(w * 0.35, h * 0.15, w * 0.3, h * 0.65);
  },
  (c, w, h) => { // Caribbean beach
    c.fillStyle = '#8fd0ea'; c.fillRect(0, 0, w, h); c.fillStyle = '#2bb5b0'; c.fillRect(0, h * 0.45, w, h * 0.3); c.fillStyle = '#f3e3bd'; c.fillRect(0, h * 0.75, w, h);
    c.fillStyle = '#ffd36a'; c.beginPath(); c.arc(w * 0.7, h * 0.2, w * 0.14, 0, Math.PI * 2); c.fill();
  },
  (c, w, h) => { // marigolds
    c.fillStyle = '#4f9a4a'; c.fillRect(0, 0, w, h);
    for (let k = 0; k < 6; k++) { const x = w * (0.25 + (k % 2) * 0.5), y = h * (0.18 + Math.floor(k / 2) * 0.32); c.fillStyle = '#ee8a22'; c.beginPath(); c.arc(x, y, w * 0.2, 0, Math.PI * 2); c.fill(); c.fillStyle = '#f4c13a'; c.beginPath(); c.arc(x, y, w * 0.09, 0, Math.PI * 2); c.fill(); }
  },
];
function mexicoPostcard(ctx, W, H) { americaPostcard(ctx, W, H, 'MEXICO', MEXICO_SCENES); }

// The stepped pyramid at Chichén Itzá: nine terraces, the central stair, the temple on top, jungle round the plaza.
function mexicoPyramid(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.7); sky.addColorStop(0, '#3f8fcf'); sky.addColorStop(1, '#bfe3f2');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#f7f9fb'; for (const [x, y, r] of [[0.15, 0.14, 6], [0.24, 0.12, 7.5], [0.78, 0.16, 6], [0.86, 0.13, 7]]) { ctx.beginPath(); ctx.ellipse(W * x, H * y, r * u * 1.7, r * u, 0, 0, Math.PI * 2); ctx.fill(); }
  const base = H * 0.8, top = H * 0.24, cx = W * 0.5, bw = W * 0.66, tw = W * 0.2, n = 9, th = (base - top) / n;
  // jungle behind
  ctx.fillStyle = '#2f6b3a'; for (let i = 0; i < 26; i++) { const x = (i / 25) * W, r = (7 + (i * 7) % 5) * u; ctx.beginPath(); ctx.arc(x, base - 2 * u, r, 0, Math.PI * 2); ctx.fill(); }
  for (let k = 0; k < n; k++) {
    const w = bw - (bw - tw) * (k / n), y = base - (k + 1) * th;
    ctx.fillStyle = '#cbbfa4'; ctx.fillRect(cx - w / 2, y, w, th);
    ctx.fillStyle = '#ab9f86'; ctx.fillRect(cx + w * 0.08, y, w * 0.42, th);          // shaded right side
    ctx.fillStyle = '#e3d9c2'; ctx.fillRect(cx - w / 2, y, w, th * 0.18);             // terrace edge light
  }
  // the stair: a lighter band with step lines, and balustrades
  const sw = 12 * u;
  ctx.fillStyle = '#ded4bd'; ctx.fillRect(cx - sw / 2, top, sw, base - top);
  ctx.fillStyle = '#a99c82'; for (let y = top + 1.4 * u; y < base; y += 2.2 * u) ctx.fillRect(cx - sw / 2, y, sw, 0.6 * u);
  ctx.fillStyle = '#9b8f78'; ctx.fillRect(cx - sw / 2 - 1.6 * u, top, 1.6 * u, base - top); ctx.fillRect(cx + sw / 2, top, 1.6 * u, base - top);
  // temple on top
  ctx.fillStyle = '#c4b89d'; ctx.fillRect(cx - tw * 0.38, top - 11 * u, tw * 0.76, 11 * u);
  ctx.fillStyle = '#a2967c'; ctx.fillRect(cx - tw * 0.38, top - 12.5 * u, tw * 0.76, 1.8 * u);
  ctx.fillStyle = '#3a3228'; for (const dx of [-0.22, 0, 0.22]) ctx.fillRect(cx + dx * tw - 1.6 * u, top - 8 * u, 3.2 * u, 8 * u);
  // plaza and near trees
  ctx.fillStyle = '#86b25e'; ctx.fillRect(0, base, W, H - base);
  ctx.fillStyle = '#76a352'; for (let y = base + 3 * u; y < H; y += 4 * u) ctx.fillRect(0, y, W, 0.8 * u);
  ctx.fillStyle = '#245a2f'; for (const [x, r] of [[0.03, 14], [0.12, 10], [0.92, 13], [0.99, 16]]) { ctx.beginPath(); ctx.arc(W * x, base - r * 0.3 * u, r * u, 0, Math.PI * 2); ctx.fill(); }
}

// A street of brightly painted houses under strings of papel picado.
function mexicoStreet(ctx, W, H) {
  const u = H / 100;
  ctx.fillStyle = '#7cc6ea'; ctx.fillRect(0, 0, W, H);
  // houses
  const houses = [['#e2477a', '#f4c13a'], ['#f4c13a', '#1f9a9a'], ['#1f9a9a', '#ee7a2a'], ['#ee7a2a', '#2c4fa0'], ['#6a3a8f', '#f4c13a'], ['#3f9a4a', '#e2477a']];
  const base = H * 0.82, n = houses.length, hw = W / n;
  houses.forEach(([wall, trim], i) => {
    const x = i * hw, top = H * (0.34 + (i % 3) * 0.04);
    ctx.fillStyle = wall; ctx.fillRect(x, top, hw + 1, base - top);
    ctx.fillStyle = trim; ctx.fillRect(x, top, hw, 2.6 * u);                         // cornice
    ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(x + hw - 1.2 * u, top, 1.2 * u, base - top);
    // arched door
    const dw = hw * 0.32, dh = (base - top) * 0.46, dx = x + hw * 0.34;
    ctx.fillStyle = trim; roundRect(ctx, dx - 1 * u, base - dh - 1 * u, dw + 2 * u, dh + 1 * u, dw * 0.5); ctx.fill();
    ctx.fillStyle = '#5a3424'; roundRect(ctx, dx, base - dh, dw, dh, dw * 0.45); ctx.fill();
    // window with shutters and a flower pot
    const wy = top + 7 * u, ww = hw * 0.28, wx = x + hw * 0.36;
    ctx.fillStyle = trim; ctx.fillRect(wx - 1 * u, wy - 1 * u, ww + 2 * u, 9 * u);
    ctx.fillStyle = '#2b3550'; ctx.fillRect(wx, wy, ww, 7 * u);
    ctx.fillStyle = '#b5623f'; ctx.fillRect(wx, wy + 7.4 * u, ww, 2.4 * u);
    ctx.fillStyle = '#c22a32'; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(wx + ww * (0.2 + k * 0.3), wy + 6.6 * u, 1.4 * u, 0, Math.PI * 2); ctx.fill(); }
  });
  // cobbled street
  ctx.fillStyle = '#9a8a78'; ctx.fillRect(0, base, W, H - base);
  ctx.fillStyle = '#857565'; for (let y = base + 2 * u; y < H; y += 3 * u) for (let x = ((y / u) % 6) * u; x < W; x += 6 * u) ctx.fillRect(x, y, 4.4 * u, 2 * u);
  // papel picado: strings across the sky with cut-paper flags
  const cols = ['#e2477a', '#f4c13a', '#1f9a9a', '#ee7a2a', '#6a3a8f', '#3f9a4a', '#2c4fa0'];
  for (const [y0, sag, off] of [[H * 0.07, 7 * u, 0], [H * 0.2, 6 * u, 3]]) {
    const yAt = (x) => y0 + sag * Math.sin((x / W) * Math.PI);
    ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 0.6 * u; ctx.beginPath(); for (let x = 0; x <= W; x += 2 * u) x ? ctx.lineTo(x, yAt(x)) : ctx.moveTo(x, yAt(x)); ctx.stroke();
    const fw = 9 * u, fh = 11 * u;
    for (let i = 0, x = 3 * u; x < W - fw; i++, x += fw + 2 * u) {
      const y = yAt(x + fw / 2);
      ctx.fillStyle = cols[(i + off) % cols.length]; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + fw, y); ctx.lineTo(x + fw, y + fh);
      for (let k = 4; k >= 0; k--) ctx.lineTo(x + (fw * k) / 4 + (k % 2 ? 0 : 0), y + fh - (k % 2 ? 1.6 * u : 0)); ctx.fill();
      ctx.fillStyle = '#7cc6ea'; // the cut-outs show the sky
      ctx.beginPath(); ctx.arc(x + fw / 2, y + fh * 0.48, 1.8 * u, 0, Math.PI * 2); ctx.fill();
      ctx.fillRect(x + fw * 0.2, y + fh * 0.18, 1.2 * u, 1.2 * u); ctx.fillRect(x + fw * 0.68, y + fh * 0.18, 1.2 * u, 1.2 * u);
    }
  }
}

// Trajineras on the canals of Xochimilco: bright boats under painted arches, willows along the banks.
function mexicoTrajinera(ctx, W, H) {
  const u = H / 100;
  ctx.fillStyle = '#9fd3ea'; ctx.fillRect(0, 0, W, H * 0.45);
  ctx.fillStyle = '#4f8f4f'; for (let i = 0; i < 16; i++) { const x = (i / 15) * W, r = (14 + (i * 5) % 7) * u; ctx.beginPath(); ctx.ellipse(x, H * 0.36, r, r * 1.3, 0, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = '#3f7d46'; for (let i = 0; i < 24; i++) { const x = (i / 23) * W, r = (9 + (i * 5) % 6) * u; ctx.beginPath(); ctx.arc(x, H * 0.42, r, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = '#2f6b3a'; for (let i = 0; i < 18; i++) { const x = (i / 17) * W + 3 * u, r = (6 + (i * 3) % 5) * u; ctx.beginPath(); ctx.arc(x, H * 0.47, r, 0, Math.PI * 2); ctx.fill(); }
  const water = ctx.createLinearGradient(0, H * 0.48, 0, H); water.addColorStop(0, '#3e8b7c'); water.addColorStop(1, '#2f6f64');
  ctx.fillStyle = water; ctx.fillRect(0, H * 0.48, W, H * 0.52);
  ctx.fillStyle = '#6fb3a0'; for (let i = 0; i < 20; i++) ctx.fillRect(((i * 157) % 100) / 100 * W, H * 0.55 + (i % 6) * 6 * u, 8 * u, 0.9 * u);
  const boat = (cx, y, s, hull, roof, arch) => {
    const U = s * u, L = 72 * U, Hh = 8 * U;
    ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(cx - L * 0.46, y + Hh, L * 0.92, 2.4 * U);       // shadow on the water
    // hull: two colours with a white band
    ctx.fillStyle = hull[0]; ctx.beginPath(); ctx.moveTo(cx - L / 2, y); ctx.lineTo(cx + L / 2, y); ctx.lineTo(cx + L * 0.45, y + Hh); ctx.lineTo(cx - L * 0.45, y + Hh); ctx.fill();
    ctx.fillStyle = '#f6efe0'; ctx.fillRect(cx - L * 0.48, y + Hh * 0.3, L * 0.96, Hh * 0.18);
    ctx.fillStyle = hull[1]; ctx.fillRect(cx - L * 0.47, y + Hh * 0.55, L * 0.94, Hh * 0.22);
    // posts and a flat canopy with a scalloped edge in alternating colours
    ctx.fillStyle = '#5a3424'; for (const k of [-0.32, -0.08, 0.16, 0.4]) ctx.fillRect(cx + L * k - 0.9 * U, y - 20 * U, 1.8 * U, 20 * U);
    ctx.fillStyle = roof; ctx.fillRect(cx - L * 0.36, y - 24 * U, L * 0.8, 4.4 * U);
    const pal = ['#c22a32', '#f4c13a', '#3f9a4a', '#2c4fa0', '#e2477a'];
    for (let k = 0, x = cx - L * 0.36; x < cx + L * 0.44; k++, x += 4 * U) { ctx.fillStyle = pal[k % pal.length]; ctx.beginPath(); ctx.arc(x + 2 * U, y - 19.6 * U, 2 * U, 0, Math.PI); ctx.fill(); }
    // the painted arch at the bow: an open arch in a thick band of colours, a flower at the top
    const ax = cx - L * 0.44, aw = 22 * U, ah = 30 * U, r = aw / 2;
    ctx.lineWidth = 4.4 * U; ctx.lineCap = 'butt';
    const segs = 7;
    for (let k = 0; k < segs; k++) {
      ctx.strokeStyle = [arch, '#e2477a', '#3f9a4a', '#2c4fa0'][k % 4];
      ctx.beginPath(); ctx.arc(ax + r, y - ah + r, r, Math.PI + (k / segs) * Math.PI, Math.PI + ((k + 1) / segs) * Math.PI); ctx.stroke();
    }
    ctx.strokeStyle = arch; ctx.beginPath(); ctx.moveTo(ax, y - ah + r); ctx.lineTo(ax, y); ctx.moveTo(ax + aw, y - ah + r); ctx.lineTo(ax + aw, y); ctx.stroke();
    ctx.fillStyle = '#c22a32'; ctx.beginPath(); ctx.arc(ax + r, y - ah - 1 * U, 3.4 * U, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f4c13a'; ctx.beginPath(); ctx.arc(ax + r, y - ah - 1 * U, 1.5 * U, 0, Math.PI * 2); ctx.fill();
  };
  boat(W * 0.8, H * 0.6, 0.55, ['#2c4fa0', '#f4c13a'], '#3f9a4a', '#ee7a2a');
  boat(W * 0.46, H * 0.84, 1.35, ['#c22a32', '#f4c13a'], '#e2477a', '#f4c13a');
}

// Tulum: a Mayan temple on the cliff above a turquoise Caribbean sea, white sand and palms.
function mexicoTulum(ctx, W, H) {
  const u = H / 100;
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.5); sky.addColorStop(0, '#3f9ad6'); sky.addColorStop(1, '#c6ecf6');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#f7f9fb'; for (const [x, y, r] of [[0.6, 0.12, 6], [0.68, 0.1, 7.5], [0.8, 0.15, 5]]) { ctx.beginPath(); ctx.ellipse(W * x, H * y, r * u * 1.7, r * u, 0, 0, Math.PI * 2); ctx.fill(); }
  const hz = H * 0.46;
  ctx.fillStyle = '#1f7fa8'; ctx.fillRect(0, hz, W, H * 0.12);
  ctx.fillStyle = '#25b3b8'; ctx.fillRect(0, hz + H * 0.12, W, H * 0.12);
  ctx.fillStyle = '#7fdcd2'; ctx.fillRect(0, hz + H * 0.24, W, H * 0.07);
  ctx.fillStyle = '#f2f8f8'; for (let i = 0; i < 12; i++) ctx.fillRect(((i * 137) % 100) / 100 * W, hz + 4 * u + (i % 4) * 6 * u, 7 * u, 0.9 * u);
  // beach
  ctx.fillStyle = '#f3e3bd'; ctx.beginPath(); ctx.moveTo(0, H * 0.82); ctx.quadraticCurveTo(W * 0.5, H * 0.74, W, H * 0.8); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.moveTo(0, H * 0.82); ctx.quadraticCurveTo(W * 0.5, H * 0.74, W, H * 0.8); ctx.lineTo(W, H * 0.815); ctx.quadraticCurveTo(W * 0.5, H * 0.755, 0, H * 0.835); ctx.fill();
  // the cliff and the temple on it
  ctx.fillStyle = '#c9b88f'; ctx.beginPath(); ctx.moveTo(0, H * 0.4); ctx.lineTo(W * 0.3, H * 0.42); ctx.lineTo(W * 0.38, H * 0.6); ctx.lineTo(W * 0.42, H * 0.8); ctx.lineTo(0, H * 0.84); ctx.fill();
  ctx.fillStyle = '#a8966e'; ctx.beginPath(); ctx.moveTo(W * 0.24, H * 0.44); ctx.lineTo(W * 0.3, H * 0.42); ctx.lineTo(W * 0.38, H * 0.6); ctx.lineTo(W * 0.42, H * 0.8); ctx.lineTo(W * 0.3, H * 0.8); ctx.fill();
  ctx.fillStyle = '#4f7f3a'; ctx.fillRect(0, H * 0.38, W * 0.3, 3 * u);
  const tx = W * 0.14, ty = H * 0.38, tw = 22 * u, thh = 13 * u;
  ctx.fillStyle = '#b7a77f'; ctx.fillRect(tx - tw / 2 - 2 * u, ty - 3 * u, tw + 4 * u, 3 * u);
  ctx.fillStyle = '#d2c39c'; ctx.fillRect(tx - tw / 2, ty - 3 * u - thh, tw, thh);
  ctx.fillStyle = '#b7a77f'; ctx.fillRect(tx - tw / 2 - 1 * u, ty - 3 * u - thh - 2.4 * u, tw + 2 * u, 2.4 * u);
  ctx.fillStyle = '#3a3228'; for (const dx of [-0.3, 0, 0.3]) ctx.fillRect(tx + dx * tw - 1.8 * u, ty - 3 * u - thh * 0.7, 3.6 * u, thh * 0.7);
  // palms on the beach
  const palm = (x, y, h, lean) => {
    ctx.strokeStyle = '#7a5a3a'; ctx.lineWidth = 2.4 * u; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + lean * h * 0.4, y - h * 0.5, x + lean * h * 0.3, y - h); ctx.stroke();
    const tx2 = x + lean * h * 0.3, ty2 = y - h;
    ctx.strokeStyle = '#2f7a3a'; ctx.lineWidth = 2.6 * u;
    for (let k = 0; k < 8; k++) {
      const a = Math.PI * (0.92 + k * 0.165), ex = tx2 + Math.cos(a) * h * 0.34, ey = ty2 + Math.sin(a) * h * 0.16 + h * 0.08;
      ctx.beginPath(); ctx.moveTo(tx2, ty2); ctx.quadraticCurveTo(tx2 + Math.cos(a) * h * 0.22, ty2 + Math.sin(a) * h * 0.2 - h * 0.06, ex, ey); ctx.stroke();
    }
    ctx.fillStyle = '#5a3a24'; ctx.beginPath(); ctx.arc(tx2, ty2 + 1 * u, 1.8 * u, 0, Math.PI * 2); ctx.fill();
  };
  palm(W * 0.78, H * 0.92, 40 * u, -0.4); palm(W * 0.9, H * 0.94, 46 * u, -0.25); palm(W * 0.66, H * 0.9, 28 * u, 0.3);
}

// ---------- USA pack: woven, pieced and knotted rugs (restored from the earlier drafts) ----------
// Dashed stitching around a rectangle; each side starts and ends on a stitch, so the corners join up.
function stitchRect(ctx, x, y, w, h, step, thick, color) {
  ctx.fillStyle = color;
  const side = (x0, y0, len, horiz) => {
    const { n, d } = evenSteps(len, step), l = d * 0.58;
    for (let i = 0; i <= n; i++) {
      // first and last stitch are centred on the corner so the two sides meet in one stitch
      const a = i * d - l / 2, a0 = Math.max(0, a), a1 = Math.min(len, a + l);
      if (a1 <= a0) continue;
      if (horiz) ctx.fillRect(x0 + a0 - (i === 0 ? thick / 2 : 0), y0 - thick / 2, a1 - a0 + (i === 0 || i === n ? thick / 2 : 0), thick);
      else ctx.fillRect(x0 - thick / 2, y0 + a0 - (i === 0 ? thick / 2 : 0), thick, a1 - a0 + (i === 0 || i === n ? thick / 2 : 0));
    }
  };
  side(x, y, w, true); side(x, y + h, w, true); side(x, y, h, false); side(x + w, y, h, false);
}
// A sun-faded flag woven as a rug: 13 stripes, a 50-star canton, a narrow navy binding with a stitched edge.
function americaFlag(ctx, W, H, seed) {
  const R = rng(seed + 13);
  const C = { red: '#9e2b2f', red2: '#8a2428', cream: '#ece0c4', navy: '#20304f', navy2: '#1a2843', star: '#f1e7cf', bind: '#182238' };
  const u = H / 100, b = 4.2 * u; // binding width
  ctx.fillStyle = C.bind; ctx.fillRect(0, 0, W, H);
  const x0 = b, y0 = b, fw = W - 2 * b, fh = H - 2 * b, sh = fh / 13;
  for (let i = 0; i < 13; i++) {
    ctx.fillStyle = i % 2 ? C.cream : (i % 4 === 0 ? C.red : C.red2);
    ctx.fillRect(x0, y0 + i * sh, fw, sh + 0.5);
  }
  const cw = fw * 0.4, ch = sh * 7;
  ctx.fillStyle = C.navy; ctx.fillRect(x0, y0, cw, ch);
  // faint woven rows in the canton
  ctx.fillStyle = C.navy2; for (let y = 0; y < ch; y += 0.9 * u) if ((y / (0.9 * u)) % 2 < 1) ctx.fillRect(x0, y0 + y, cw, 0.45 * u);
  ctx.fillStyle = C.star;
  for (let row = 0; row < 9; row++) {
    const n = row % 2 ? 5 : 6;
    for (let k = 0; k < n; k++) {
      const sx = x0 + cw * ((row % 2 ? 2 : 1) + k * 2) / 12, sy = y0 + ch * (row + 1) / 10;
      star5(ctx, sx, sy, ch * 0.042, -Math.PI / 2 + (R() - 0.5) * 0.08);
    }
  }
  // sun fading toward one corner, the way an old rug in a window gets
  const fade = ctx.createLinearGradient(0, 0, W, H);
  fade.addColorStop(0, 'rgba(255,240,215,0)'); fade.addColorStop(1, 'rgba(255,240,215,.13)');
  ctx.fillStyle = fade; ctx.fillRect(0, 0, W, H);
  // stitched edge on the binding
  stitchRect(ctx, b * 0.5, b * 0.5, W - b, H - b, 2.2 * u, 0.4 * u, 'rgba(236,224,196,.72)');
}

// Southwestern desert kilim: sand field, stepped diamonds in terracotta, turquoise and black, lightning-zigzag borders.
function americaMesa(ctx, W, H) {
  const C = { sand: '#d8c09a', sand2: '#cdb48b', terra: '#b4532f', rust: '#8e3b22', turq: '#3f9a92', black: '#1d1714', cream: '#f0e5cc', ochre: '#c98f37' };
  const g = knotGrid(ctx, W, H, 72), { cols, rows, blk } = g;
  ctx.fillStyle = C.sand; ctx.fillRect(0, 0, W, H);
  for (let y = 0; y < rows; y++) if (y % 6 === 0) for (let x = 0; x < cols; x++) blk(x, y, C.sand2); // lazy lines
  // outer bands
  const band = (k, c) => { for (let x = k; x < cols - k; x++) { blk(x, k, c); blk(x, rows - 1 - k, c); } for (let y = k; y < rows - k; y++) { blk(k, y, c); blk(cols - 1 - k, y, c); } };
  band(0, C.black); band(1, C.black); band(2, C.terra); band(3, C.terra); band(4, C.cream);
  // zigzag lightning band (rows/cols 5..9) between square corner blocks that each hold a small stepped diamond;
  // every side holds a whole number of zigzags so they end the same way at both corners
  const zig = (len) => { const n = Math.max(1, Math.round(len / 8)), per = len / n; return (i) => Math.round(Math.abs(((i % per) / per) * 8 - 4)); };
  const zx = zig(cols - 20), zy = zig(rows - 20);
  for (let x = 10; x < cols - 10; x++) {
    const h = zx(x - 10);
    for (const [y, c] of [[5 + h, C.black], [6 + h, C.turq]]) if (y <= 9) { blk(x, y, c); blk(x, rows - 1 - y, c); }
  }
  for (let y = 10; y < rows - 10; y++) {
    const h = zy(y - 10);
    for (const [x, c] of [[5 + h, C.black], [6 + h, C.turq]]) if (x <= 9) { blk(x, y, c); blk(cols - 1 - x, y, c); }
  }
  for (const [cx, cy] of [[7, 7], [cols - 8, 7], [7, rows - 8], [cols - 8, rows - 8]]) {
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
      const d = Math.abs(dx) + Math.abs(dy);
      if (d <= 2) blk(cx + dx, cy + dy, d === 2 ? C.black : d === 1 ? C.turq : C.terra);
    }
  }
  band(10, C.rust);
  // stepped diamond with outline, filled in rings
  const diamond = (cx, cy, n, ring) => {
    for (let dy = -n; dy <= n; dy++) {
      const w = n - Math.abs(dy);
      for (let dx = -w; dx <= w; dx++) {
        const d = Math.abs(dx) + Math.abs(dy);
        blk(cx + dx, cy + dy, d >= n - 1 ? C.black : ring[Math.floor((n - d) / 2) % ring.length]);
      }
    }
  };
  const ix = 12, iy = 12, iw = cols - 2 * ix, ih = rows - 2 * iy, midY = iy + Math.floor(ih / 2);
  const n = Math.floor(ih / 2) - 3;
  diamond(Math.floor(cols / 2), midY, n, [C.cream, C.terra, C.turq, C.ochre, C.black, C.cream]);
  // side diamonds, fully inside the field, and small ones above and below the arrows
  const side = Math.floor(n * 0.55), cxm = Math.floor(cols / 2);
  const leftC = ix + side + 3, rightC = cols - ix - side - 4;
  for (const cx of [leftC, rightC]) diamond(cx, midY, side, [C.turq, C.cream, C.terra]);
  // arrows centred in the gaps between the side diamonds and the big one, pointing outward
  for (const [a, bnd, dir] of [[leftC + side, cxm - n, -1], [rightC - side, cxm + n, 1]]) {
    const ax = Math.round((a + bnd) / 2), half = Math.max(2, Math.floor(Math.abs(bnd - a) / 2) - 3);
    for (let k = -half; k <= half; k++) blk(ax + k, midY, C.black);
    for (let k = 1; k <= 2; k++) { blk(ax + dir * (half - k), midY - k, C.black); blk(ax + dir * (half - k), midY + k, C.black); }
    for (let k = 0; k < 2; k++) { blk(ax - dir * (half - k), midY - 1, C.terra); blk(ax - dir * (half - k), midY + 1, C.terra); }
    for (const oy of [-Math.round(ih * 0.3), Math.round(ih * 0.3)]) diamond(ax, midY + oy, 3, [C.terra, C.cream]);
  }
}

// Patchwork quilt made into a rug: log-cabin blocks in calico colours, a sawtooth border, running-stitch quilting.
function americaQuilt(ctx, W, H, seed) {
  const R = rng(seed + 51);
  const fabrics = ['#9b2f2f', '#c4683a', '#d9a940', '#2f4b6e', '#5d7f62', '#7a4b6e', '#e9dcc0', '#b9c7cf'];
  const C = { border: '#24365a', saw1: '#e9dcc0', saw2: '#9b2f2f', center: '#b8312f', stitch: 'rgba(250,240,220,.55)' };
  const u = H / 100, bw = 9 * u;
  ctx.fillStyle = C.border; ctx.fillRect(0, 0, W, H);
  // sawtooth triangles between square corner blocks; each side fits a whole number of teeth
  const cb = bw * 0.9, m = bw * 0.05; // corner block size and margin
  const teeth = (x0, y0, len, horiz, flip) => {
    const { n, d } = evenSteps(len, 4.5 * u), depth = cb * 0.62;
    for (let k = 0; k < n; k++) {
      ctx.fillStyle = k % 2 ? C.saw1 : C.saw2;
      ctx.beginPath();
      if (horiz) { const x = x0 + k * d; ctx.moveTo(x, y0); ctx.lineTo(x + d, y0); ctx.lineTo(x + d / 2, y0 + flip * depth); }
      else { const y = y0 + k * d; ctx.moveTo(x0, y); ctx.lineTo(x0, y + d); ctx.lineTo(x0 + flip * depth, y + d / 2); }
      ctx.closePath(); ctx.fill();
    }
  };
  const top = m + cb * 0.19, bot = H - m - cb * 0.19, lft = m + cb * 0.19, rgt = W - m - cb * 0.19;
  teeth(m + cb, top, W - 2 * (m + cb), true, 1); teeth(m + cb, bot, W - 2 * (m + cb), true, -1);
  teeth(lft, m + cb, H - 2 * (m + cb), false, 1); teeth(rgt, m + cb, H - 2 * (m + cb), false, -1);
  // corner blocks: a little four-patch with a navy centre
  for (const [x, y] of [[m, m], [W - m - cb, m], [m, H - m - cb], [W - m - cb, H - m - cb]]) {
    const q = cb / 2;
    ctx.fillStyle = C.saw1; ctx.fillRect(x, y, q, q); ctx.fillRect(x + q, y + q, q, q);
    ctx.fillStyle = C.saw2; ctx.fillRect(x + q, y, q, q); ctx.fillRect(x, y + q, q, q);
    ctx.fillStyle = C.border; ctx.fillRect(x + q * 0.6, y + q * 0.6, q * 0.8, q * 0.8);
  }
  // log cabin blocks
  const fx = bw, fy = bw, fw = W - 2 * bw, fh = H - 2 * bw;
  const bc = 6, br = 4, bwid = fw / bc, bhei = fh / br;
  const calico = (x, y, w, h, col) => {
    ctx.fillStyle = col; ctx.fillRect(x, y, w + 0.5, h + 0.5);
    ctx.fillStyle = 'rgba(255,255,255,.18)'; // tiny print
    for (let yy = y + 0.6 * u; yy < y + h; yy += 1.3 * u) for (let xx = x + 0.6 * u + ((yy / u) % 2) * 0.6 * u; xx < x + w; xx += 1.3 * u) { ctx.beginPath(); ctx.arc(xx, yy, 0.18 * u, 0, Math.PI * 2); ctx.fill(); }
  };
  for (let j = 0; j < br; j++) for (let i = 0; i < bc; i++) {
    const x = fx + i * bwid, y = fy + j * bhei;
    const light = [fabrics[6], fabrics[7], fabrics[2]], dark = [fabrics[0], fabrics[3], fabrics[4], fabrics[5], fabrics[1]];
    const steps = 4, sx = bwid / (2 * steps + 1), sy = bhei / (2 * steps + 1);
    // logs spiral outward: light on two sides, dark on the other two (classic log cabin light/dark split)
    for (let k = steps; k >= 1; k--) {
      const pick = (arr) => arr[Math.floor(R() * arr.length)];
      const L = pick(light), D = pick(dark);
      const ox = x + (steps - k) * sx, oy = y + (steps - k) * sy, ow = bwid - 2 * (steps - k) * sx, oh = bhei - 2 * (steps - k) * sy;
      calico(ox, oy, ow, sy, (i + j) % 2 ? L : D);            // top
      calico(ox, oy + oh - sy, ow, sy, (i + j) % 2 ? D : L);  // bottom
      calico(ox, oy + sy, sx, oh - 2 * sy, (i + j) % 2 ? L : D);       // left
      calico(ox + ow - sx, oy + sy, sx, oh - 2 * sy, (i + j) % 2 ? D : L); // right
    }
    ctx.fillStyle = C.center; ctx.fillRect(x + steps * sx, y + steps * sy, sx + 0.5, sy + 0.5); // red hearth in the middle
  }
  // running-stitch quilting along the block seams
  ctx.strokeStyle = C.stitch; ctx.lineWidth = 0.32 * u; ctx.setLineDash([1.1 * u, 0.9 * u]);
  for (let i = 0; i <= bc; i++) { ctx.beginPath(); ctx.moveTo(fx + i * bwid, fy); ctx.lineTo(fx + i * bwid, fy + fh); ctx.stroke(); }
  for (let j = 0; j <= br; j++) { ctx.beginPath(); ctx.moveTo(fx, fy + j * bhei); ctx.lineTo(fx + fw, fy + j * bhei); ctx.stroke(); }
  ctx.setLineDash([]);
}

// A woven landscape: a desert canyon at sunset. Banded sky, a stepped sun on the horizon, layers of mesas getting
// warmer and closer, a river winding through the desert floor and saguaros in front, all on the knot grid.
function americaCanyon(ctx, W, H, seed) {
  const R = rng(seed + 66);
  const g = knotGrid(ctx, W, H, 96), { cols, rows, blk } = g;
  const C = { frame: '#2a1a14', line: '#ecdcbc', tooth: '#c2562a',
    sky: ['#2b2350', '#43306a', '#6b3b78', '#9c3f6e', '#cf5a55', '#e9814a', '#f2a74a', '#f6c766'],
    sun: '#ffe08a', sun2: '#fbd06a', far: '#7a4a6e', far2: '#8f5674', mid: '#a5442e', mid2: '#8a3826', midTop: '#c2603a',
    near: '#c98a4a', near2: '#b5773c', sand: '#d9a65c', river: '#4aa6a3', river2: '#2f7f86', cactus: '#2f4a33', cactus2: '#24392a', bird: '#2a1a24' };
  // border: dark frame, cream line, terracotta stepped teeth (whole number per side, mirrored at the corners)
  const fb = 4;
  ctx.fillStyle = C.frame; ctx.fillRect(0, 0, W, H);
  const x0 = fb + 1, y0 = fb + 1, x1 = cols - fb - 2, y1 = rows - fb - 2; // field, inclusive
  for (let x = fb; x <= cols - fb - 1; x++) { blk(x, fb, C.line); blk(x, rows - fb - 1, C.line); }
  for (let y = fb; y <= rows - fb - 1; y++) { blk(fb, y, C.line); blk(cols - fb - 1, y, C.line); }
  const teethRow = (len, put) => { const n = Math.max(1, Math.round(len / 4)), per = len / n; for (let i = 0; i < len; i++) { const ph = (i % per) / per; const h = ph < 0.5 ? Math.round(ph * 4) : Math.round((1 - ph) * 4); for (let k = 0; k < Math.min(2, h); k++) put(i, k); } };
  teethRow(cols - 2 * fb - 2, (i, k) => { blk(fb + 1 + i, 1 + k, C.tooth); blk(fb + 1 + i, rows - 2 - k, C.tooth); });
  teethRow(rows - 2 * fb - 2, (i, k) => { blk(1 + k, fb + 1 + i, C.tooth); blk(cols - 2 - k, fb + 1 + i, C.tooth); });
  for (const [cx, cy] of [[2, 2], [cols - 3, 2], [2, rows - 3], [cols - 3, rows - 3]]) { blk(cx, cy, C.tooth); blk(cx - 1, cy, C.tooth); blk(cx + 1, cy, C.tooth); blk(cx, cy - 1, C.tooth); blk(cx, cy + 1, C.tooth); }

  const fw = x1 - x0 + 1, fh = y1 - y0 + 1;
  const horizon = y0 + Math.round(fh * 0.56);
  // sky: woven bands, each band's edge jitters a knot so it reads as weaving, not a gradient
  for (let y = y0; y < horizon; y++) {
    for (let x = x0; x <= x1; x++) {
      const t = (y - y0) / (horizon - y0);
      const band = Math.min(C.sky.length - 1, Math.floor(t * C.sky.length + (((x * 7 + y * 3) % 5) - 2) * 0.06));
      blk(x, y, C.sky[Math.max(0, band)]);
    }
  }
  // stars in the dark top bands
  for (let i = 0; i < 26; i++) { const x = x0 + Math.floor(R() * fw), y = y0 + Math.floor(R() * (horizon - y0) * 0.28); blk(x, y, '#e8dcf0'); }
  // sun sitting on the horizon, with stepped rays
  const sx = x0 + Math.round(fw * 0.62), sr = Math.round(fh * 0.13);
  for (let dy = -sr; dy <= 0; dy++) for (let dx = -sr; dx <= sr; dx++) if (dx * dx + dy * dy <= sr * sr) blk(sx + dx, horizon + dy, (dx * dx + dy * dy) > (sr - 2) * (sr - 2) ? C.sun2 : C.sun);
  for (let k = 0; k < 7; k++) {
    const a = Math.PI * (0.12 + k * 0.127), r0 = sr + 2, r1 = sr + 4 + (k % 2 ? 1 : 3);
    for (let r = r0; r <= r1; r++) blk(sx + Math.round(Math.cos(a) * r), horizon - Math.round(Math.sin(a) * r), C.sun2);
  }
  // a stepped skyline: heights per column from a few flat-topped mesas (plateau, cliff, plateau)
  const ridge = (base, peaks, jag) => {
    const h = new Array(cols).fill(0);
    for (const [cx, w, top] of peaks) for (let x = Math.round(cx - w / 2); x <= Math.round(cx + w / 2); x++) if (x >= x0 && x <= x1) {
      const edge = Math.min(x - (cx - w / 2), (cx + w / 2) - x);
      h[x] = Math.max(h[x], Math.min(top, Math.floor(edge * jag) + 1));
    }
    return (x) => base - h[x];
  };
  const fill = (top, bottom, c1, c2, shade) => { for (let x = x0; x <= x1; x++) for (let y = Math.max(y0, top(x)); y <= Math.min(y1, bottom); y++) blk(x, y, (shade && (x + y) % 9 === 0) || y === top(x) ? c2 : c1); };
  const far = ridge(horizon + 1, [[x0 + fw * 0.12, fw * 0.22, 8], [x0 + fw * 0.4, fw * 0.16, 6], [x0 + fw * 0.86, fw * 0.24, 9]], 1.6);
  fill((x) => Math.min(far(x), horizon), horizon + 9, C.far, C.far2, false); // no gap under the sky
  const mid = ridge(horizon + 6, [[x0 + fw * 0.22, fw * 0.3, 13], [x0 + fw * 0.7, fw * 0.2, 10], [x0 + fw * 0.98, fw * 0.18, 12]], 2.2);
  fill(mid, horizon + 9, C.mid, C.midTop, true);
  // cliff stripes (rock strata) on the mid mesas
  for (let x = x0; x <= x1; x++) for (let y = mid(x) + 2; y <= horizon + 9; y += 3) blk(x, y, C.mid2);
  // desert floor
  for (let y = horizon + 10; y <= y1; y++) for (let x = x0; x <= x1; x++) blk(x, y, (y - horizon) % 5 === 0 && (x + y) % 3 ? C.near2 : y > horizon + 18 ? C.sand : C.near);
  // river: a winding band from the sun's reflection down to the bottom
  for (let y = horizon + 10; y <= y1; y++) {
    const t = (y - horizon - 10) / (y1 - horizon - 10);
    const cx = Math.round(sx - t * fw * 0.32 + Math.sin(t * 6) * fw * 0.05), w = 1 + Math.round(t * 5);
    for (let dx = -w; dx <= w; dx++) blk(cx + dx, y, Math.abs(dx) === w ? C.river2 : (y % 4 === 0 && dx === 0 ? C.sun : C.river));
  }
  // saguaros: trunk with two arms
  const saguaro = (cx, by, h, flip) => {
    for (let y = 0; y < h; y++) { blk(cx, by - y, C.cactus); blk(cx + 1, by - y, C.cactus2); }
    const a1 = Math.round(h * 0.42), a2 = Math.round(h * 0.58), al = Math.max(3, Math.round(h * 0.26)), out = Math.max(2, Math.round(h * 0.1));
    for (let k = 1; k <= out; k++) { blk(cx - k * flip, by - a1, C.cactus); blk(cx - k * flip, by - a1 + 1, C.cactus2); }
    for (let y = 0; y < al; y++) { blk(cx - out * flip, by - a1 - y, C.cactus); blk(cx - (out - 1) * flip, by - a1 - y, C.cactus); }
    for (let k = 1; k <= out; k++) { blk(cx + 1 + k * flip, by - a2, C.cactus2); blk(cx + 1 + k * flip, by - a2 + 1, C.cactus); }
    for (let y = 0; y < al - 1; y++) { blk(cx + 1 + out * flip, by - a2 - y, C.cactus2); blk(cx + out * flip, by - a2 - y, C.cactus2); }
  };
  saguaro(x0 + Math.round(fw * 0.1), y1 - 2, Math.round(fh * 0.3), 1);
  saguaro(x0 + Math.round(fw * 0.86), y1 - 1, Math.round(fh * 0.26), -1);
  saguaro(x0 + Math.round(fw * 0.32), horizon + 18, Math.round(fh * 0.12), 1);
  // two birds
  for (const [bx, by] of [[x0 + Math.round(fw * 0.3), y0 + Math.round(fh * 0.22)], [x0 + Math.round(fw * 0.36), y0 + Math.round(fh * 0.17)]]) {
    blk(bx, by, C.bird); blk(bx - 1, by - 1, C.bird); blk(bx - 2, by - 1, C.bird); blk(bx + 1, by - 1, C.bird); blk(bx + 2, by - 1, C.bird);
  }
}

// ---------- woven pictures ----------
// Draw a scene with ordinary canvas shapes on a tiny canvas (one pixel per knot), snap every pixel to the rug's
// palette, then lay it down knot by knot: smooth shapes come out with the stepped edges of a hand-knotted rug.
function weavePicture(ctx, W, H, rowsWanted, palette, draw) {
  const g = knotGrid(ctx, W, H, rowsWanted), { cols, rows, blk } = g;
  const c = document.createElement('canvas'); c.width = cols; c.height = rows;
  const x = c.getContext('2d');
  draw(x, cols, rows);
  const d = x.getImageData(0, 0, cols, rows).data;
  const pal = palette.map((h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16), h]);
  for (let i = 0; i < cols * rows; i++) {
    const r = d[i * 4], gg = d[i * 4 + 1], b = d[i * 4 + 2];
    let best = pal[0], bd = Infinity;
    for (const p of pal) { const e = (p[0] - r) ** 2 + (p[1] - gg) ** 2 + (p[2] - b) ** 2; if (e < bd) { bd = e; best = p; } }
    blk(i % cols, (i / cols) | 0, best[3]);
  }
  return g;
}

// Border shared by the picture rugs: dark band, cream line, and a whole number of little diamonds per side with a
// star in each corner.
function pictureBorder(x, cols, rows, C) {
  x.fillStyle = C.frame; x.fillRect(0, 0, cols, rows);
  x.fillStyle = C.line; x.fillRect(5, 5, cols - 10, rows - 10);
  x.fillStyle = C.frame; x.fillRect(6, 6, cols - 12, rows - 12);
  x.fillStyle = C.accent;
  const dia = (cx, cy) => { x.beginPath(); x.moveTo(cx, cy - 1.6); x.lineTo(cx + 1.6, cy); x.lineTo(cx, cy + 1.6); x.lineTo(cx - 1.6, cy); x.closePath(); x.fill(); };
  const row = (len, put) => { const { n, d } = evenSteps(len, 6); for (let i = 0; i <= n; i++) put(i * d); };
  row(cols - 16, (a) => { dia(8 + a, 2.6); dia(8 + a, rows - 2.6); });
  row(rows - 16, (a) => { dia(2.6, 8 + a); dia(cols - 2.6, 8 + a); });
  x.fillStyle = C.star; for (const [cx, cy] of [[2.6, 2.6], [cols - 2.6, 2.6], [2.6, rows - 2.6], [cols - 2.6, rows - 2.6]]) { x.beginPath(); star5(x, cx, cy, 2.4); }
}

// Barn star: the round painted hex sign of Pennsylvania barns, on weathered red planks, with two daisy hexes
// beside it and tulips in the corners.
function americaHex(ctx, W, H) {
  const C = { frame: '#1d2a44', line: '#efe3c6', accent: '#d8a33a', star: '#efe3c6',
    barn: '#8e2a25', barn2: '#7a231f', disc: '#efe3c6', ring: '#1b1714', red: '#b5312b', blue: '#2f5a8c', gold: '#e1a83a', green: '#4c7a43', cream2: '#d9c9a4' };
  weavePicture(ctx, W, H, 108, Object.values(C), (x, cols, rows) => {
    pictureBorder(x, cols, rows, C);
    const fx = 8, fy = 8, fw = cols - 16, fh = rows - 16;
    x.fillStyle = C.barn; x.fillRect(fx, fy, fw, fh);
    x.fillStyle = C.barn2; for (let y = fy + 6; y < fy + fh; y += 7) x.fillRect(fx, y, fw, 1); // planks
    const rosette = (cx, cy, r, points, cols2) => {
      // scalloped cream disc with a dark ring
      x.fillStyle = C.disc;
      for (let i = 0; i < points * 2; i++) { const a = (i / (points * 2)) * Math.PI * 2; x.beginPath(); x.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, r * 0.13, 0, Math.PI * 2); x.fill(); }
      x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill();
      x.strokeStyle = C.ring; x.lineWidth = Math.max(1, r * 0.06); x.beginPath(); x.arc(cx, cy, r * 0.9, 0, Math.PI * 2); x.stroke();
      // star points: long diamonds, each split into a light and a dark half
      for (let i = 0; i < points; i++) {
        const a = (i / points) * Math.PI * 2 - Math.PI / 2, L = r * 0.84, w = r * Math.tan(Math.PI / points) * 0.42;
        const tip = [cx + Math.cos(a) * L, cy + Math.sin(a) * L], mid = [cx + Math.cos(a) * L * 0.45, cy + Math.sin(a) * L * 0.45];
        const side = (sgn) => [mid[0] + Math.cos(a + Math.PI / 2) * w * sgn, mid[1] + Math.sin(a + Math.PI / 2) * w * sgn];
        x.fillStyle = cols2[i % cols2.length]; x.beginPath(); x.moveTo(cx, cy); x.lineTo(...side(1)); x.lineTo(...tip); x.closePath(); x.fill();
        x.fillStyle = cols2[(i + 1) % cols2.length]; x.beginPath(); x.moveTo(cx, cy); x.lineTo(...side(-1)); x.lineTo(...tip); x.closePath(); x.fill();
      }
      x.fillStyle = C.ring; x.beginPath(); x.arc(cx, cy, r * 0.14, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.gold; x.beginPath(); x.arc(cx, cy, r * 0.08, 0, Math.PI * 2); x.fill();
    };
    const cy = fy + fh / 2;
    rosette(cols / 2, cy, fh * 0.37, 8, [C.red, C.blue, C.gold, C.red, C.blue, C.gold, C.red, C.blue]);
    for (const sx of [-1, 1]) rosette(cols / 2 + sx * fw * 0.355, cy, fh * 0.15, 6, [C.gold, C.red, C.blue]);
    // tulips in the four corners: three petals on a stem with two leaves
    for (const [tx, ty] of [[fx + 7, fy + 9], [fx + fw - 7, fy + 9], [fx + 7, fy + fh - 3], [fx + fw - 7, fy + fh - 3]]) {
      x.fillStyle = C.green; x.fillRect(tx - 0.5, ty - 2, 1.2, 7);
      x.beginPath(); x.ellipse(tx - 2.2, ty + 2, 2.2, 0.9, -0.6, 0, Math.PI * 2); x.ellipse(tx + 2.4, ty + 2.5, 2.2, 0.9, 0.6, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.gold; x.beginPath(); x.ellipse(tx, ty - 4, 1.6, 2.6, 0, 0, Math.PI * 2); x.fill();
      x.fillStyle = C.red; x.beginPath(); x.ellipse(tx - 1.8, ty - 3.4, 1.3, 2.4, -0.4, 0, Math.PI * 2); x.ellipse(tx + 1.8, ty - 3.4, 1.3, 2.4, 0.4, 0, Math.PI * 2); x.fill();
    }
  });
}

// Lone Star quilt: one big eight-pointed star pieced from little diamonds whose colours ripple out from the
// centre, on navy with scattered stars. Drawn as fabric pieces (crisp edges, a dark seam round each diamond).
function americaLoneStar(ctx, W, H, seed) {
  const R = rng(seed + 91);
  const ring = ['#f2d27a', '#e9a43f', '#d4672f', '#a8322f', '#7c2346', '#3f4f8c', '#5f86b8', '#a9c4d8', '#efe3c6'];
  const C = { navy: '#1f2c4c', bind: '#141c33', red: '#a8322f', cream: '#efe3c6', dot: '#d9cdb0', seam: 'rgba(15,20,38,.55)' };
  const u = H / 100, bw = 6 * u;
  ctx.fillStyle = C.bind; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = C.red; ctx.fillRect(bw - 1.2 * u, bw - 1.2 * u, W - 2 * bw + 2.4 * u, H - 2 * bw + 2.4 * u);
  ctx.fillStyle = C.navy; ctx.fillRect(bw, bw, W - 2 * bw, H - 2 * bw);
  stitchRect(ctx, bw * 0.5, bw * 0.5, W - bw, H - bw, 2.2 * u, 0.35 * u, 'rgba(239,227,198,.7)');
  const cx = W / 2, cy = H / 2, L = (H - 2 * bw) * 0.47, half = Math.PI / 8, steps = 7;
  const edge = L / (2 * Math.cos(half)), cell = edge / steps;
  // scattered stars, clear of the big one
  ctx.fillStyle = C.dot;
  for (let i = 0; i < 70; i++) {
    const sx = bw + 3 * u + R() * (W - 2 * bw - 6 * u), sy = bw + 3 * u + R() * (H - 2 * bw - 6 * u);
    if (Math.hypot(sx - cx, sy - cy) < L + 3 * u) continue;
    star5(ctx, sx, sy, (0.7 + R() * 0.6) * u);
  }
  ctx.lineJoin = 'round';
  for (let k = 0; k < 8; k++) {
    const axis = -Math.PI / 2 + k * Math.PI / 4;
    const e1 = [Math.cos(axis + half) * cell, Math.sin(axis + half) * cell], e2 = [Math.cos(axis - half) * cell, Math.sin(axis - half) * cell];
    for (let i = 0; i < steps; i++) for (let j = 0; j < steps; j++) {
      const p = (a, b) => [cx + e1[0] * a + e2[0] * b, cy + e1[1] * a + e2[1] * b];
      const q = [p(i, j), p(i + 1, j), p(i + 1, j + 1), p(i, j + 1)];
      ctx.fillStyle = ring[Math.round(((i + j) / (2 * steps - 2)) * (ring.length - 1))];
      ctx.beginPath(); q.forEach(([x, y], n) => (n ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = C.seam; ctx.lineWidth = 0.32 * u; ctx.stroke();
    }
  }
}

// Bison on the plains, in the manner of an old hooked rug: a big shaggy bull against a low sun and rolling hills.
function americaBison(ctx, W, H) {
  const C = { frame: '#2a1d14', line: '#ead9b5', accent: '#c8742f', star: '#ead9b5',
    sky: '#e9d3a2', sky2: '#e3bf86', sun: '#d9672e', hill: '#9a8a52', hill2: '#7d7444', grass: '#c39b48', grass2: '#a8823a',
    fur: '#4a2f1d', fur2: '#6b4429', fur3: '#2f1d12', horn: '#e6dcc4' };
  weavePicture(ctx, W, H, 104, Object.values(C), (x, cols, rows) => {
    pictureBorder(x, cols, rows, C);
    const fx = 8, fy = 8, fw = cols - 16, fh = rows - 16;
    // sky in hooked rows, with abrash bands
    for (let y = fy; y < fy + fh; y++) { x.fillStyle = (Math.floor((y - fy) / 4) % 3 === 1) ? C.sky2 : C.sky; x.fillRect(fx, y, fw, 1); }
    x.save(); x.beginPath(); x.rect(fx, fy, fw, fh); x.clip();
    x.fillStyle = C.sun; x.beginPath(); x.arc(fx + fw * 0.78, fy + fh * 0.42, fh * 0.16, 0, Math.PI * 2); x.fill();
    // hills and prairie
    x.fillStyle = C.hill; x.beginPath(); x.moveTo(fx, fy + fh * 0.58); x.quadraticCurveTo(fx + fw * 0.3, fy + fh * 0.44, fx + fw * 0.55, fy + fh * 0.57); x.quadraticCurveTo(fx + fw * 0.8, fy + fh * 0.68, fx + fw, fy + fh * 0.55); x.lineTo(fx + fw, fy + fh); x.lineTo(fx, fy + fh); x.fill();
    x.fillStyle = C.hill2; x.beginPath(); x.moveTo(fx, fy + fh * 0.68); x.quadraticCurveTo(fx + fw * 0.5, fy + fh * 0.6, fx + fw, fy + fh * 0.7); x.lineTo(fx + fw, fy + fh); x.lineTo(fx, fy + fh); x.fill();
    x.fillStyle = C.grass; x.fillRect(fx, fy + fh * 0.76, fw, fh);
    x.fillStyle = C.grass2; for (let i = 0; i < 70; i++) { const gx = fx + (i * 37) % fw, gy = fy + fh * 0.78 + ((i * 13) % 18); x.fillRect(gx, gy, 1, 2.5); }
    x.restore();
    // the bison, facing left. Body and hump, head low with beard, horns, legs, tail.
    const bx = fx + fw * 0.46, by = fy + fh * 0.66, s = fh / 100;
    x.fillStyle = C.fur;
    x.beginPath(); x.ellipse(bx + 8 * s, by - 6 * s, 26 * s, 15 * s, 0, 0, Math.PI * 2); x.fill();          // body
    x.fillStyle = C.fur3; for (const [lx, w] of [[-10, 4.5], [-3, 4.5], [20, 4], [27, 4]]) x.fillRect(bx + lx * s, by + 2 * s, w * s, 15 * s); // legs
    // shaggy hump and mane: big and high over the front legs, in the lighter brown, with tufts
    x.fillStyle = C.fur2; x.beginPath(); x.ellipse(bx - 6 * s, by - 16 * s, 18 * s, 17 * s, -0.25, 0, Math.PI * 2); x.fill();
    x.fillStyle = C.fur; for (const [tx, ty] of [[-14, -22], [-6, -27], [2, -25], [-18, -12], [-10, -10]]) { x.beginPath(); x.ellipse(bx + tx * s, by + ty * s, 3 * s, 1.6 * s, 0.4, 0, Math.PI * 2); x.fill(); }
    // head held low, darker, with a beard
    x.fillStyle = C.fur3; x.beginPath(); x.ellipse(bx - 25 * s, by - 1 * s, 8.5 * s, 10 * s, 0.25, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.moveTo(bx - 31 * s, by + 5 * s); x.lineTo(bx - 21 * s, by + 5 * s); x.lineTo(bx - 27 * s, by + 14 * s); x.closePath(); x.fill();
    // short horn curving up from the top of the head, and a small dark eye with a light rim
    x.strokeStyle = C.horn; x.lineWidth = 2.2; x.lineCap = 'round';
    x.beginPath(); x.moveTo(bx - 23 * s, by - 9 * s); x.quadraticCurveTo(bx - 21 * s, by - 15 * s, bx - 26 * s, by - 17 * s); x.stroke();
    x.fillStyle = C.horn; x.beginPath(); x.arc(bx - 28.5 * s, by - 3 * s, 1.5, 0, Math.PI * 2); x.fill();
    x.fillStyle = '#000000'; x.beginPath(); x.arc(bx - 28.5 * s, by - 3 * s, 0.8, 0, Math.PI * 2); x.fill();
    x.strokeStyle = C.fur3; x.lineWidth = 1.5 * s * 1.4; x.beginPath(); x.moveTo(bx + 33 * s, by - 10 * s); x.quadraticCurveTo(bx + 38 * s, by - 4 * s, bx + 36 * s, by + 4 * s); x.stroke(); // tail
  });
}

// Buffalo check: red and black squares with a twill weave, wrapped in a cream blanket-stitch edge.
function americaPlaid(ctx, W, H) {
  const C = { red: '#a3242a', black: '#17121a', mix: '#5b1a20', cream: '#ece1c8' };
  const u = H / 100, sq = 10 * u, edge = 3 * u;
  ctx.fillStyle = C.red; ctx.fillRect(0, 0, W, H);
  for (let y = 0; y < H; y += sq) for (let x = 0; x < W; x += sq) {
    const a = Math.floor(x / sq) % 2, b = Math.floor(y / sq) % 2;
    ctx.fillStyle = a && b ? C.black : (a || b ? C.mix : C.red);
    ctx.fillRect(x, y, sq + 0.5, sq + 0.5);
  }
  // twill: fine diagonal threads over everything
  ctx.strokeStyle = 'rgba(0,0,0,.18)'; ctx.lineWidth = 0.28 * u;
  for (let d = -H; d < W; d += 0.9 * u) { ctx.beginPath(); ctx.moveTo(d, H); ctx.lineTo(d + H, 0); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(255,230,220,.07)';
  for (let d = -H + 0.45 * u; d < W; d += 0.9 * u) { ctx.beginPath(); ctx.moveTo(d, H); ctx.lineTo(d + H, 0); ctx.stroke(); }
  // blanket-stitch edge
  ctx.fillStyle = C.black; frameRect(ctx, 0, 0, W, H, edge);
  // blanket stitch: a cream line along the edge with evenly spaced ticks reaching in; each side fits a whole
  // number of ticks and the corners get one diagonal tick, like a hand-finished blanket
  ctx.strokeStyle = C.cream; ctx.lineWidth = 0.55 * u; ctx.lineCap = 'square';
  const o = edge * 0.45, reach = edge + 1.4 * u, inset = edge * 1.2;
  ctx.beginPath();
  const ticks = (len, at) => { const { n, d } = evenSteps(len, 2.4 * u); for (let i = 1; i < n; i++) at(i * d); };
  ticks(W - 2 * inset, (a) => { ctx.moveTo(inset + a, o); ctx.lineTo(inset + a, reach); ctx.moveTo(inset + a, H - o); ctx.lineTo(inset + a, H - reach); });
  ticks(H - 2 * inset, (a) => { ctx.moveTo(o, inset + a); ctx.lineTo(reach, inset + a); ctx.moveTo(W - o, inset + a); ctx.lineTo(W - reach, inset + a); });
  for (const [cx, cy, sx, sy] of [[o, o, 1, 1], [W - o, o, -1, 1], [o, H - o, 1, -1], [W - o, H - o, -1, -1]]) {
    ctx.moveTo(cx, cy); ctx.lineTo(cx + sx * (reach - o) * 1.1, cy + sy * (reach - o) * 1.1);
  }
  ctx.stroke();
  ctx.lineWidth = 0.45 * u; ctx.lineJoin = 'miter';
  ctx.strokeRect(o, o, W - 2 * o, H - 2 * o);
}


// Hooked rug: re-make a finished picture out of rows of wool loops, the way American hooked rugs are made.
// The loops sit on a fixed lattice: `rows` rows, every other row shifted by half a loop. Colours are cut down to a
// few dyed shades per channel (so skies become bands, like real hooking), each loop is a little rounded tuft with a
// light top and a shaded bottom, and each loop's hue wobbles a touch (abrash). `colorAt(r, h, rgb)` may replace a
// loop's colour: r is the row, h the position along it in half loops (even rows use even h, odd rows odd h) and
// rgb the picture's colour there; patterns that have to stay crisp (sawtooth, checks, floorboards) are laid out
// loop by loop this way instead of being drawn and sampled. The edge gets a whipped binding.
function hookify(ctx, W, H, seed, rows, colorAt) {
  const R = rng(seed + 777);
  const src = ctx.getImageData(0, 0, W, H).data;
  const p = H / rows, NC = Math.round(W / p), px = W / NC, rx = p * 0.652, ry = p * 0.609;
  const levels = 24, q = (v) => Math.round((v / 255) * (levels - 1)) / (levels - 1) * 255;
  ctx.fillStyle = '#2b2118'; ctx.fillRect(0, 0, W, H); // backing showing between loops
  for (let r = 0; r < rows; r++) {
    const y = (r + 0.5) * p, sy = Math.min(H - 1, y | 0);
    for (let c = -1; c <= NC; c++) {
      const h = 2 * c + (r & 1), x = (h / 2 + 0.5) * px, sx = Math.min(W - 1, Math.max(0, x | 0)), i = (sy * W + sx) * 4;
      const rgb = colorAt?.(r, h, [src[i], src[i + 1], src[i + 2]]) || [src[i], src[i + 1], src[i + 2]];
      const j = (R() - 0.5) * 14; // abrash
      const cr = Math.max(0, Math.min(255, q(rgb[0]) + j)), cg = Math.max(0, Math.min(255, q(rgb[1]) + j)), cb = Math.max(0, Math.min(255, q(rgb[2]) + j));
      ctx.fillStyle = `rgb(${cr * 0.62 | 0},${cg * 0.62 | 0},${cb * 0.62 | 0})`;
      ctx.beginPath(); ctx.ellipse(x, y + p * 0.087, rx, ry, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = `rgb(${cr | 0},${cg | 0},${cb | 0})`;
      ctx.beginPath(); ctx.ellipse(x - p * 0.043, y - p * 0.054, rx * 0.82, ry * 0.78, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = `rgba(255,255,255,${0.12 + R() * 0.06})`;
      ctx.beginPath(); ctx.ellipse(x - p * 0.152, y - p * 0.185, rx * 0.36, ry * 0.26, -0.5, 0, Math.PI * 2); ctx.fill();
    }
  }
  // whipped binding round the edge
  const bw = p * 1.74;
  ctx.fillStyle = '#22262e'; frameRect(ctx, 0, 0, W, H, bw);
  ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = p * 0.24;
  for (let a = 0; a < W; a += p * 0.6) { ctx.beginPath(); ctx.moveTo(a, 0); ctx.lineTo(a + p * 0.43, bw); ctx.moveTo(a, H); ctx.lineTo(a + p * 0.43, H - bw); ctx.stroke(); }
  for (let a = 0; a < H; a += p * 0.6) { ctx.beginPath(); ctx.moveTo(0, a); ctx.lineTo(bw, a + p * 0.43); ctx.moveTo(W, a); ctx.lineTo(W - bw, a + p * 0.43); ctx.stroke(); }
}

const HOOK_ROWS = 81;         // odd, so the top and bottom borders fall on rows of the same kind and come out alike
const HOOK_EDGE = 8;          // loops of border before the picture: binding, sawtooth, cream line
const rgbOf = (hex) => [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
const nearRgb = (a, b, tol = 24) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]) <= tol;
// Size of the picture area of a hooked rug, in loops, for pictures that lay patterns out loop by loop.
function hookedPictureLoops(W, H) { const NC = Math.round(W / (H / HOOK_ROWS)); return { cols: NC - 2 * HOOK_EDGE, rows: HOOK_ROWS - 2 * HOOK_EDGE }; }

// Put a finished picture inside a hooked-rug border (dark band, red and mustard sawtooth, a cream line, a little
// mustard diamond in each corner) and make the whole thing out of wool loops. The border is laid out loop by loop
// so every tooth comes out the same. `inner(r, h, rgb)` may restyle loops of the picture (r and h counted from the
// picture's top-left loop).
function hookedFrame(ctx, W, H, seed, inner, pal = {}) {
  const rows = HOOK_ROWS, E = HOOK_EDGE, p = H / rows, NC = Math.round(W / p), px = W / NC;
  const pic = document.createElement('canvas'); pic.width = W; pic.height = H;
  pic.getContext('2d').drawImage(ctx.canvas, 0, 0);
  ctx.fillStyle = pal.dark || '#2a201a'; ctx.fillRect(0, 0, W, H);
  ctx.imageSmoothingEnabled = false; ctx.drawImage(pic, E * px, E * p, W - 2 * E * px, H - 2 * E * p); ctx.imageSmoothingEnabled = true;
  const DARK = rgbOf(pal.dark || '#2a201a'), CREAM = rgbOf(pal.line || '#e9dcbc'), RED = rgbOf(pal.a || '#a8322f'), GOLD = rgbOf(pal.b || '#c99a3a');
  const T = 5;                                   // sawtooth depth (rows) and tooth width (loops)
  const B = 2, L = B + T;                        // sawtooth starts after the binding; cream line at depth L
  // teeth along the top and bottom: whole teeth, centred, every one starting on the same kind of loop
  let nTop = Math.floor((2 * NC - 4 * L - 1) / (2 * T)), h0 = NC - 1 - T * nTop;
  if ((h0 & 1) === (B & 1)) { nTop--; h0 += T; }
  // teeth down the sides: whole teeth, centred
  const sideLen = rows - 2 * L, nSide = Math.floor(sideLen / T), r0 = L + Math.floor((sideLen - nSide * T) / 2);
  hookify(ctx, W, H, seed, rows, (r, h, rgb) => {
    const dT = Math.min(r, rows - 1 - r), dS = Math.max(0, Math.min(h / 2, NC - 1 - h / 2));
    if (dT >= E && dS >= E) return inner ? inner(r - E, h - 2 * E, rgb) : null;
    if (dT < B || dS < B) return DARK;
    if (dT < L && dS < L) {                     // corner: a small stepped diamond
      const dy = dT - (B + 2), dx = dS - (B + 2), k = Math.abs(dx) + Math.abs(dy) / 2;
      return k === 0 ? RED : k <= 2 ? GOLD : DARK;
    }
    if (dT >= L && dS >= L) return CREAM;        // the cream line round the picture
    if (dT < L) {                                // top or bottom sawtooth: rows of 5, 4, 3, 2, 1 loops
      const t = dT - B, u = h - h0, k = Math.floor(u / (2 * T));
      if (k < 0 || k >= nTop) return DARK;
      return Math.abs(u - 2 * T * k - T) <= T - 1 - t ? (k % 2 ? GOLD : RED) : DARK;
    }
    // left or right sawtooth: 1, 3, 5, 3, 1 loops deep
    const v = r - r0, k = Math.floor(v / T);
    if (k < 0 || k >= nSide) return DARK;
    const e = 4.6 * (1 - Math.abs(v - k * T - (T - 1) / 2) / ((T) / 2));
    return dS - B <= e ? (k % 2 ? GOLD : RED) : DARK;
  });
}

function evenSteps(len, step) { const n = Math.max(1, Math.round(len / step)); return { n, d: len / n }; }

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
  let inner = null; // hooked pictures may lay some patterns out loop by loop
  if (P.america === 'postcard') americaPostcard(ctx, W, H);
  else if (P.america === 'park') americaPark(ctx, W, H);
  else if (P.america === 'baseball') inner = americaBaseball(ctx, W, H);
  else if (P.america === 'basketball') inner = americaBasketball(ctx, W, H);
  else if (P.america === 'diner') inner = americaDiner(ctx, W, H);
  else if (P.america === 'route66') americaRoute66(ctx, W, H);
  else if (P.america === 'flag') americaFlag(ctx, W, H, seed);
  else if (P.america === 'mesa') americaMesa(ctx, W, H);
  else if (P.america === 'quilt') americaQuilt(ctx, W, H, seed);
  else if (P.america === 'plaid') americaPlaid(ctx, W, H);
  else if (P.america === 'canyon') americaCanyon(ctx, W, H, seed);
  else if (P.america === 'hex') americaHex(ctx, W, H);
  else if (P.america === 'lonestar') americaLoneStar(ctx, W, H, seed);
  else if (P.america === 'bison') americaBison(ctx, W, H);
  else if (P.canada === 'flag') canadaFlag(ctx, W, H);
  else if (P.canada === 'quilt') canadaLeafQuilt(ctx, W, H, seed);
  else if (P.canada === 'rockies') canadaRockies(ctx, W, H, seed);
  else if (P.canada === 'tartan') canadaTartan(ctx, W, H);
  else if (P.canada === 'moose') canadaMoose(ctx, W, H);
  else if (P.canada === 'geese') canadaGeese(ctx, W, H);
  else if (P.canada === 'loon') canadaLoon(ctx, W, H);
  else if (P.canada === 'postcard') canadaPostcard(ctx, W, H);
  else if (P.canada === 'hockey') canadaHockey(ctx, W, H);
  else if (P.canada === 'aurora') canadaAurora(ctx, W, H);
  else if (P.canada === 'lighthouse') canadaLighthouse(ctx, W, H);
  else if (P.canada === 'bear') canadaPolarBear(ctx, W, H);
  else if (P.mexico === 'sarape') mexicoSarape(ctx, W, H);
  else if (P.mexico === 'greca') mexicoGreca(ctx, W, H);
  else if (P.mexico === 'tile') mexicoTile(ctx, W, H);
  else if (P.mexico === 'agave') mexicoAgave(ctx, W, H);
  else if (P.mexico === 'skull') mexicoSkull(ctx, W, H);
  else if (P.mexico === 'monarch') mexicoMonarch(ctx, W, H);
  else if (P.mexico === 'jaguar') mexicoJaguar(ctx, W, H);
  else if (P.mexico === 'postcard') mexicoPostcard(ctx, W, H);
  else if (P.mexico === 'pyramid') mexicoPyramid(ctx, W, H);
  else if (P.mexico === 'street') mexicoStreet(ctx, W, H);
  else if (P.mexico === 'trajinera') mexicoTrajinera(ctx, W, H);
  else if (P.mexico === 'tulum') mexicoTulum(ctx, W, H);
  else if (P.halloween === 'pumpkin') halloweenPumpkin(ctx, W, H);
  else if (P.halloween === 'web') halloweenWeb(ctx, W, H, seed);
  else if (P.halloween === 'ghost') halloweenGhost(ctx, W, H, seed);
  else if (P.kilim) kilim(ctx, W, H); else persian(ctx, W, H, P, seed);
  if (P.hooked) hookedFrame(ctx, W, H, seed, inner, P.canada ? CANADA_FRAME : P.mexico ? MEXICO_FRAME : undefined); else addWeave(ctx, W, H, seed);

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
