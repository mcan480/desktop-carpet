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
  // America pack
  yildizlar:{ name: 'Yıldızlar ve Çizgiler', america: 'flag' },
  mesa:     { name: 'Çöl Mesası',            america: 'mesa' },
  yorgan:   { name: 'Yama Yorgan',           america: 'quilt' },
  ekose:    { name: 'Oduncu Ekose',          america: 'plaid' },
  kanyon:   { name: 'Kanyon Gün Batımı',     america: 'canyon' },
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
  const cols = Math.floor(W / s), rows = Math.floor(H / s);
  const blk = (x, y, c) => { if (x < 0 || y < 0 || x >= cols || y >= rows) return; ctx.fillStyle = c; ctx.fillRect(x * s, y * s, s + 0.5, s + 0.5); };
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
// Split a side of length `len` into a whole number of pieces close to `step`, so a row of motifs starts and ends
// exactly at the corners (no half motif or overlap where two sides meet).
function evenSteps(len, step) { const n = Math.max(1, Math.round(len / step)); return { n, d: len / n }; }

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
function star5(ctx, x, y, r, rot = -Math.PI / 2) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = rot + (i * Math.PI) / 5, rr = i % 2 ? r * 0.42 : r;
    const px = x + Math.cos(a) * rr, py = y + Math.sin(a) * rr;
    i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
  }
  ctx.closePath(); ctx.fill();
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
  if (P.america === 'flag') americaFlag(ctx, W, H, seed);
  else if (P.america === 'mesa') americaMesa(ctx, W, H);
  else if (P.america === 'quilt') americaQuilt(ctx, W, H, seed);
  else if (P.america === 'plaid') americaPlaid(ctx, W, H);
  else if (P.america === 'canyon') americaCanyon(ctx, W, H, seed);
  else if (P.halloween === 'pumpkin') halloweenPumpkin(ctx, W, H);
  else if (P.halloween === 'web') halloweenWeb(ctx, W, H, seed);
  else if (P.halloween === 'ghost') halloweenGhost(ctx, W, H, seed);
  else if (P.kilim) kilim(ctx, W, H); else persian(ctx, W, H, P, seed);
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
