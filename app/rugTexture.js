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

// Little scenes used inside the postcard letters. Each fills (0,0,w,h).
const SCENES = [
  (c, w, h) => { // snowy mountains over a lake
    const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#7fb6d6'); g.addColorStop(1, '#d9ecf2'); c.fillStyle = g; c.fillRect(0, 0, w, h);
    c.fillStyle = '#5b6f9a'; c.beginPath(); c.moveTo(-w * 0.1, h * 0.7); c.lineTo(w * 0.35, h * 0.22); c.lineTo(w * 0.7, h * 0.62); c.lineTo(w * 0.9, h * 0.35); c.lineTo(w * 1.1, h * 0.7); c.fill();
    c.fillStyle = '#f4f6f6'; c.beginPath(); c.moveTo(w * 0.25, h * 0.34); c.lineTo(w * 0.35, h * 0.22); c.lineTo(w * 0.45, h * 0.35); c.lineTo(w * 0.38, h * 0.32); c.lineTo(w * 0.32, h * 0.37); c.fill();
    c.fillStyle = '#2f6b52'; c.fillRect(0, h * 0.68, w, h * 0.08); c.fillStyle = '#3d86a8'; c.fillRect(0, h * 0.76, w, h);
  },
  (c, w, h) => { // beach with a palm
    const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#f7a35c'); g.addColorStop(0.55, '#ffd27d'); c.fillStyle = g; c.fillRect(0, 0, w, h);
    c.fillStyle = '#2a8fa0'; c.fillRect(0, h * 0.58, w, h * 0.2); c.fillStyle = '#f1d9a6'; c.fillRect(0, h * 0.78, w, h);
    c.strokeStyle = '#3a2f22'; c.lineWidth = w * 0.05; c.beginPath(); c.moveTo(w * 0.6, h); c.quadraticCurveTo(w * 0.62, h * 0.55, w * 0.42, h * 0.3); c.stroke();
    c.fillStyle = '#2f6b3a'; for (let k = 0; k < 6; k++) { const a = -Math.PI + k * 0.6; c.beginPath(); c.ellipse(w * 0.42 + Math.cos(a) * w * 0.16, h * 0.3 + Math.sin(a) * h * 0.06 + h * 0.03, w * 0.2, h * 0.035, a, 0, Math.PI * 2); c.fill(); }
  },
  (c, w, h) => { // desert mesas
    const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#f2b45a'); g.addColorStop(1, '#f6dca0'); c.fillStyle = g; c.fillRect(0, 0, w, h);
    c.fillStyle = '#b4532f'; c.fillRect(w * 0.1, h * 0.38, w * 0.35, h * 0.4); c.fillRect(w * 0.05, h * 0.5, w * 0.5, h * 0.3); c.fillRect(w * 0.6, h * 0.48, w * 0.3, h * 0.3);
    c.fillStyle = '#d99a5a'; c.fillRect(0, h * 0.76, w, h);
    c.fillStyle = '#2f5a3e'; c.fillRect(w * 0.72, h * 0.6, w * 0.05, h * 0.25); c.fillRect(w * 0.66, h * 0.66, w * 0.06, h * 0.03); c.fillRect(w * 0.66, h * 0.6, w * 0.03, h * 0.07);
  },
  (c, w, h) => { // city at dusk
    const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#2b3a6b'); g.addColorStop(1, '#e98a6c'); c.fillStyle = g; c.fillRect(0, 0, w, h);
    const R = rng(5); c.fillStyle = '#1b2240';
    for (let x = 0; x < w; ) { const bw = w * (0.08 + R() * 0.12), bh = h * (0.25 + R() * 0.5); c.fillRect(x, h - bh, bw, bh); x += bw + 1; }
    c.fillStyle = '#f2c75c'; for (let i = 0; i < 60; i++) c.fillRect(R() * w, h * 0.5 + R() * h * 0.5, w * 0.015, h * 0.012);
  },
  (c, w, h) => { // pine forest
    c.fillStyle = '#a8d0c4'; c.fillRect(0, 0, w, h); c.fillStyle = '#6aa58f'; c.fillRect(0, h * 0.5, w, h);
    for (let i = 0; i < 9; i++) { const x = (i / 8) * w, th = h * (0.35 + (i % 3) * 0.12); c.fillStyle = i % 2 ? '#24543f' : '#2f6b4f'; c.beginPath(); c.moveTo(x, h - th - h * 0.1); c.lineTo(x + w * 0.09, h); c.lineTo(x - w * 0.09, h); c.fill(); }
  },
  (c, w, h) => { // golden wheat field with a red barn
    c.fillStyle = '#9fcbe2'; c.fillRect(0, 0, w, h); c.fillStyle = '#e8b64c'; c.fillRect(0, h * 0.55, w, h);
    c.fillStyle = '#d29a35'; for (let y = h * 0.6; y < h; y += h * 0.06) c.fillRect(0, y, w, h * 0.015);
    c.fillStyle = '#a3302f'; c.fillRect(w * 0.3, h * 0.38, w * 0.4, h * 0.22); c.beginPath(); c.moveTo(w * 0.27, h * 0.4); c.lineTo(w * 0.5, h * 0.24); c.lineTo(w * 0.73, h * 0.4); c.fill();
    c.fillStyle = '#efe3c6'; c.fillRect(w * 0.44, h * 0.46, w * 0.12, h * 0.14);
  },
  (c, w, h) => { // stars and stripes
    for (let i = 0; i < 9; i++) { c.fillStyle = i % 2 ? '#efe3c6' : '#b5312b'; c.fillRect(0, (h * i) / 9, w, h / 9 + 1); }
    c.fillStyle = '#25345e'; c.fillRect(0, 0, w * 0.55, h * 0.45); c.fillStyle = '#efe3c6';
    for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) star5(c, w * 0.08 + k * w * 0.13, h * 0.07 + r * h * 0.1, w * 0.035);
  },
];

// Large-letter postcard: "Greetings from AMERICA", every letter a little scene, on a sky with clouds, in a white
// postcard border with a stamp.
function americaPostcard(ctx, W, H) {
  const u = H / 100;
  ctx.fillStyle = '#f3ead6'; ctx.fillRect(0, 0, W, H);                       // card
  const px = 5 * u, py = 5 * u, pw = W - 10 * u, ph = H - 10 * u;
  const sky = ctx.createLinearGradient(0, py, 0, py + ph); sky.addColorStop(0, '#5aa3c8'); sky.addColorStop(0.7, '#cfe6ea'); sky.addColorStop(1, '#f2e2b8');
  ctx.save(); roundRect(ctx, px, py, pw, ph, 3 * u); ctx.clip();
  ctx.fillStyle = sky; ctx.fillRect(px, py, pw, ph);
  ctx.fillStyle = 'rgba(255,255,255,.75)';
  for (const [cx, cy, r] of [[0.12, 0.18, 5], [0.2, 0.15, 7], [0.8, 0.2, 6], [0.88, 0.16, 5], [0.55, 0.12, 4], [0.62, 0.1, 5]]) { ctx.beginPath(); ctx.ellipse(px + pw * cx, py + ph * cy, r * u * 1.8, r * u, 0, 0, Math.PI * 2); ctx.fill(); }
  // big block letters with a scene in each, a dark extrusion behind and a cream outline
  const word = 'AMERICA';
  let size = ph * 0.56; ctx.font = blockFont(size);
  const wide = ctx.measureText(word).width + (word.length - 1) * size * 0.04;
  if (wide > pw * 0.9) size *= (pw * 0.9) / wide;
  ctx.font = blockFont(size); ctx.textBaseline = 'alphabetic';
  const gap = size * 0.04, total = ctx.measureText(word).width + gap * (word.length - 1);
  let x = W / 2 - total / 2; const base = py + ph * 0.76;
  const depth = size * 0.07;
  for (let i = 0; i < word.length; i++) {
    const ch = word[i], cw = ctx.measureText(ch).width;
    for (let d = depth; d > 0; d -= Math.max(1, depth / 12)) { ctx.fillStyle = '#1d2a4a'; ctx.fillText(ch, x + d, base + d); } // extrusion
    ctx.lineJoin = 'round'; ctx.strokeStyle = '#f6efdc'; ctx.lineWidth = size * 0.05; ctx.strokeText(ch, x, base);
    // scene clipped to the letter
    const off = document.createElement('canvas'); off.width = Math.ceil(cw) + 4; off.height = Math.ceil(size * 1.05);
    const oc = off.getContext('2d');
    SCENES[i % SCENES.length](oc, off.width, off.height);
    oc.globalCompositeOperation = 'destination-in'; oc.font = ctx.font; oc.textBaseline = 'alphabetic'; oc.fillStyle = '#000'; oc.fillText(ch, 2, size * 0.97);
    ctx.drawImage(off, x - 2, base - size * 0.97);
    x += cw + gap;
  }
  // "Greetings from" in a red script with a cream outline, tilted
  ctx.save(); ctx.translate(px + pw * 0.06, py + ph * 0.34); ctx.rotate(-0.06);
  ctx.font = `${size * 0.46}px ${SCRIPT}`; ctx.lineWidth = size * 0.07; ctx.strokeStyle = '#f6efdc'; ctx.strokeText('Greetings from', 0, 0);
  ctx.fillStyle = '#b5312b'; ctx.fillText('Greetings from', 0, 0); ctx.restore();
  ctx.restore();
  // stamp in the corner
  const sw = 13 * u, sh = 16 * u, sx = W - px - sw - 3 * u, sy = py + 3 * u;
  ctx.fillStyle = '#f6efdc'; ctx.fillRect(sx - 0.8 * u, sy - 0.8 * u, sw + 1.6 * u, sh + 1.6 * u);
  ctx.fillStyle = '#25345e'; ctx.fillRect(sx, sy, sw, sh);
  ctx.fillStyle = '#efe3c6'; star5(ctx, sx + sw / 2, sy + sh * 0.45, sw * 0.3);
  ctx.fillStyle = '#f3ead6'; for (let k = 0; k <= 8; k++) { for (const [ex, ey] of [[sx - 0.8 * u + (k / 8) * (sw + 1.6 * u), sy - 0.8 * u], [sx - 0.8 * u + (k / 8) * (sw + 1.6 * u), sy + sh + 0.8 * u]]) { ctx.beginPath(); ctx.arc(ex, ey, 0.6 * u, 0, Math.PI * 2); ctx.fill(); } }
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

// A baseball diamond from above: striped outfield grass, the dirt infield, chalk lines, bases and the mound.
function americaBaseball(ctx, W, H) {
  const u = H / 100;
  ctx.fillStyle = '#2f6b3a'; ctx.fillRect(0, 0, W, H);
  const s = 9 * u; // mowing checks
  for (let y = 0; y < H; y += s) for (let x = 0; x < W; x += s) if (((x / s) + (y / s)) % 2 < 1) { ctx.fillStyle = '#367a42'; ctx.fillRect(x, y, s, s); }
  const hx = W / 2, hy = H * 0.9, d = H * 0.42; // home plate and base distance
  // warning track arc and outfield wall
  ctx.strokeStyle = '#a8683f'; ctx.lineWidth = 5 * u; ctx.beginPath(); ctx.arc(hx, hy, H * 0.98, Math.PI * 1.22, Math.PI * 1.78); ctx.stroke();
  // infield dirt: circle-cut arc beyond the bases, and the base paths
  ctx.fillStyle = '#b97a4c';
  ctx.beginPath(); ctx.moveTo(hx, hy); ctx.arc(hx, hy, d * 1.34, Math.PI * 1.25, Math.PI * 1.75); ctx.closePath(); ctx.fill();
  const b1 = [hx + d * Math.SQRT1_2, hy - d * Math.SQRT1_2], b2 = [hx, hy - d * Math.SQRT2], b3 = [hx - d * Math.SQRT1_2, hy - d * Math.SQRT1_2];
  ctx.fillStyle = '#2f6b3a'; ctx.beginPath(); // infield grass inside the base paths
  const inset = 2.6 * u;
  ctx.moveTo(hx, hy - inset * 1.6); ctx.lineTo(b1[0] - inset * 1.6, b1[1]); ctx.lineTo(b2[0], b2[1] + inset * 1.6); ctx.lineTo(b3[0] + inset * 1.6, b3[1]); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#b97a4c'; ctx.beginPath(); ctx.arc(hx, hy - d * 0.69, 4.5 * u, 0, Math.PI * 2); ctx.fill();   // mound
  ctx.fillStyle = '#f3efe4'; ctx.fillRect(hx - 1.4 * u, hy - d * 0.69 - 0.3 * u, 2.8 * u, 0.6 * u);                 // rubber
  ctx.fillStyle = '#b97a4c'; ctx.beginPath(); ctx.arc(hx, hy, 6.5 * u, 0, Math.PI * 2); ctx.fill();             // home circle
  // foul lines out to the wall
  ctx.strokeStyle = '#f3efe4'; ctx.lineWidth = 0.7 * u;
  for (const sgn of [-1, 1]) { ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + sgn * H * 0.98 * Math.cos(Math.PI / 4), hy - H * 0.98 * Math.sin(Math.PI / 4)); ctx.stroke(); }
  // batter's boxes and home plate
  ctx.lineWidth = 0.45 * u; ctx.strokeRect(hx - 4.6 * u, hy - 3 * u, 2.6 * u, 5 * u); ctx.strokeRect(hx + 2 * u, hy - 3 * u, 2.6 * u, 5 * u);
  ctx.fillStyle = '#f3efe4'; ctx.beginPath(); ctx.moveTo(hx - 1.2 * u, hy - 1.2 * u); ctx.lineTo(hx + 1.2 * u, hy - 1.2 * u); ctx.lineTo(hx + 1.2 * u, hy); ctx.lineTo(hx, hy + 1.2 * u); ctx.lineTo(hx - 1.2 * u, hy); ctx.fill();
  // the bases
  for (const [bx, by] of [b1, b2, b3]) { ctx.save(); ctx.translate(bx, by); ctx.rotate(Math.PI / 4); ctx.fillRect(-1.3 * u, -1.3 * u, 2.6 * u, 2.6 * u); ctx.restore(); }
  // a frame like the stands' wall
  ctx.fillStyle = '#1d3a2a'; frameRect(ctx, 0, 0, W, H, 2.2 * u);
  ctx.fillStyle = '#f3efe4'; frameRect(ctx, 2.2 * u, 2.2 * u, W - 4.4 * u, H - 4.4 * u, 0.5 * u);
}

// A basketball court from above: maple boards, painted keys, the three-point arcs and a star at centre court.
function americaBasketball(ctx, W, H) {
  const u = H / 100, R = rng(808);
  const apron = 6 * u;
  ctx.fillStyle = '#25345e'; ctx.fillRect(0, 0, W, H);
  // boards
  const cx0 = apron, cy0 = apron, cw = W - 2 * apron, ch = H - 2 * apron, plank = 2.4 * u;
  for (let y = cy0; y < cy0 + ch; y += plank) {
    let x = cx0 - R() * 30 * u;
    while (x < cx0 + cw) { const len = (18 + R() * 26) * u, t = 0.85 + R() * 0.2; ctx.fillStyle = `rgb(${Math.round(222 * t)},${Math.round(176 * t)},${Math.round(116 * t)})`; ctx.fillRect(Math.max(cx0, x), y, Math.min(len, cx0 + cw - x), plank - 0.15 * u); x += len; }
  }
  ctx.strokeStyle = '#f6efe2'; ctx.lineWidth = 1.5 * u;
  ctx.strokeRect(cx0 + 1.2 * u, cy0 + 1.2 * u, cw - 2.4 * u, ch - 2.4 * u);
  const mx = W / 2, my = H / 2;
  ctx.beginPath(); ctx.moveTo(mx, cy0 + 1.2 * u); ctx.lineTo(mx, cy0 + ch - 1.2 * u); ctx.stroke();
  // centre circle with a star
  ctx.fillStyle = '#b5312b'; ctx.beginPath(); ctx.arc(mx, my, 11 * u, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#f6efe2'; star5(ctx, mx, my + 0.6 * u, 7.5 * u);
  for (const side of [-1, 1]) {
    const bx = side < 0 ? cx0 + 1.2 * u : cx0 + cw - 1.2 * u, kw = 19 * u, kh = 16 * u;
    // painted key
    ctx.fillStyle = '#25345e'; ctx.fillRect(side < 0 ? bx : bx - kw, my - kh / 2, kw, kh); ctx.strokeRect(side < 0 ? bx : bx - kw, my - kh / 2, kw, kh);
    // free-throw circle
    ctx.beginPath(); ctx.arc(bx + side * -kw, my, 6 * u, side < 0 ? -Math.PI / 2 : Math.PI / 2, side < 0 ? Math.PI / 2 : Math.PI * 1.5); ctx.stroke();
    // three-point line: short straight bits then the arc
    const r3 = 31 * u, hoop = bx + side * -5 * u;
    ctx.beginPath();
    ctx.moveTo(bx, my - 28 * u); ctx.lineTo(hoop + side * -Math.sqrt(r3 * r3 - (28 * u) ** 2) + side * 0, my - 28 * u);
    ctx.arc(hoop, my, r3, side < 0 ? -Math.asin(28 / 31) : Math.PI + Math.asin(28 / 31), side < 0 ? Math.asin(28 / 31) : Math.PI - Math.asin(28 / 31), side > 0);
    ctx.lineTo(bx, my + 28 * u); ctx.stroke();
    // hoop and backboard
    ctx.strokeStyle = '#e8742b'; ctx.beginPath(); ctx.arc(hoop, my, 1.6 * u, 0, Math.PI * 2); ctx.stroke(); ctx.strokeStyle = '#f6efe2';
    ctx.fillStyle = '#f6efe2'; ctx.fillRect(bx + side * -3.4 * u - 0.3 * u, my - 4 * u, 0.6 * u, 8 * u);
  }
}

// A diner floor: black-and-white checks, a chrome-and-red trim, and a neon sign in the middle.
function americaDiner(ctx, W, H) {
  const u = H / 100, sq = 8 * u;
  for (let j = 0; j * sq < H; j++) for (let i = 0; i * sq < W; i++) { ctx.fillStyle = (i + j) % 2 ? '#f1ece0' : '#1a1a1d'; ctx.fillRect(i * sq, j * sq, sq + 0.5, sq + 0.5); }
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
  ctx.strokeStyle = '#3b2a20'; ctx.lineWidth = 0.5 * u;
  for (let k = 0; k < 6; k++) { const t = 1 - k * 0.16, x = W * 0.5 - (2 + 40 * t * t) * u, y = hz + (H - hz) * t * t * 0.9, h = (3 + 28 * t * t) * u; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - h); ctx.moveTo(x - h * 0.18, y - h * 0.9); ctx.lineTo(x + h * 0.18, y - h * 0.9); ctx.stroke(); }
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
// Colours are cut down to a few dyed shades per channel (so skies become bands, like real hooking), each loop is
// a little rounded tuft with a light top and a shaded bottom, rows are slightly offset and each loop's hue wobbles
// a touch (abrash). The edge gets a whipped binding.
function hookify(ctx, W, H, seed, loopsDown = 120) {
  const R = rng(seed + 777);
  const src = ctx.getImageData(0, 0, W, H).data;
  const ls = H / loopsDown, rx = ls * 0.6, ry = ls * 0.56;
  const levels = 24, q = (v) => Math.round((v / 255) * (levels - 1)) / (levels - 1) * 255;
  ctx.fillStyle = '#2b2118'; ctx.fillRect(0, 0, W, H); // backing showing between loops
  for (let row = 0, y = ls / 2; y < H + ls; row++, y += ls * 0.92) {
    const off = (row % 2) * ls * 0.5;
    for (let x = -ls / 2 + off; x < W + ls; x += ls * 0.92) {
      const sx = Math.min(W - 1, Math.max(0, x | 0)), sy = Math.min(H - 1, Math.max(0, y | 0)), i = (sy * W + sx) * 4;
      const j = (R() - 0.5) * 14; // abrash
      const r = Math.max(0, Math.min(255, q(src[i]) + j)), g = Math.max(0, Math.min(255, q(src[i + 1]) + j)), b = Math.max(0, Math.min(255, q(src[i + 2]) + j));
      ctx.fillStyle = `rgb(${r * 0.62 | 0},${g * 0.62 | 0},${b * 0.62 | 0})`;
      ctx.beginPath(); ctx.ellipse(x, y + ls * 0.08, rx, ry, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
      ctx.beginPath(); ctx.ellipse(x - ls * 0.04, y - ls * 0.05, rx * 0.82, ry * 0.78, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = `rgba(255,255,255,${0.12 + R() * 0.06})`;
      ctx.beginPath(); ctx.ellipse(x - ls * 0.14, y - ls * 0.17, rx * 0.36, ry * 0.26, -0.5, 0, Math.PI * 2); ctx.fill();
    }
  }
  // whipped binding round the edge
  const bw = ls * 1.6;
  ctx.fillStyle = '#22262e'; frameRect(ctx, 0, 0, W, H, bw);
  ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = ls * 0.22;
  for (let a = 0; a < W; a += ls * 0.55) { ctx.beginPath(); ctx.moveTo(a, 0); ctx.lineTo(a + ls * 0.4, bw); ctx.moveTo(a, H); ctx.lineTo(a + ls * 0.4, H - bw); ctx.stroke(); }
  for (let a = 0; a < H; a += ls * 0.55) { ctx.beginPath(); ctx.moveTo(0, a); ctx.lineTo(bw, a + ls * 0.4); ctx.moveTo(W, a); ctx.lineTo(W - bw, a + ls * 0.4); ctx.stroke(); }
}

// Put a finished picture inside a hooked-rug border (dark band, cream line, red and mustard sawtooth) and make
// the whole thing out of wool loops.
function hookedFrame(ctx, W, H, seed) {
  const u = H / 100, inset = 9 * u;
  const pic = document.createElement('canvas'); pic.width = W; pic.height = H;
  pic.getContext('2d').drawImage(ctx.canvas, 0, 0);
  ctx.fillStyle = '#2a201a'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#e9dcbc'; ctx.fillRect(inset - 1.6 * u, inset - 1.6 * u, W - 2 * inset + 3.2 * u, H - 2 * inset + 3.2 * u);
  // sawtooth in the band, a whole number of teeth per side
  const teeth = (x0, y0, len, horiz, flip) => {
    const { n, d } = evenSteps(len, 6 * u), depth = 4.2 * u;
    for (let k = 0; k < n; k++) {
      ctx.fillStyle = k % 2 ? '#c99a3a' : '#a8322f';
      ctx.beginPath();
      if (horiz) { const x = x0 + k * d; ctx.moveTo(x, y0); ctx.lineTo(x + d, y0); ctx.lineTo(x + d / 2, y0 + flip * depth); }
      else { const y = y0 + k * d; ctx.moveTo(x0, y); ctx.lineTo(x0, y + d); ctx.lineTo(x0 + flip * depth, y + d / 2); }
      ctx.closePath(); ctx.fill();
    }
  };
  const e = 2.3 * u, c = 7 * u;
  teeth(c, e, W - 2 * c, true, 1); teeth(c, H - e, W - 2 * c, true, -1);
  teeth(e, c, H - 2 * c, false, 1); teeth(W - e, c, H - 2 * c, false, -1);
  ctx.fillStyle = '#c99a3a'; for (const [x, y] of [[c / 2 + 0.6 * u, c / 2 + 0.6 * u], [W - c / 2 - 0.6 * u, c / 2 + 0.6 * u], [c / 2 + 0.6 * u, H - c / 2 - 0.6 * u], [W - c / 2 - 0.6 * u, H - c / 2 - 0.6 * u]]) star5(ctx, x, y, 2.8 * u);
  ctx.drawImage(pic, inset, inset, W - 2 * inset, H - 2 * inset);
  hookify(ctx, W, H, seed, 74);
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
  if (P.america === 'postcard') americaPostcard(ctx, W, H);
  else if (P.america === 'park') americaPark(ctx, W, H);
  else if (P.america === 'baseball') americaBaseball(ctx, W, H);
  else if (P.america === 'basketball') americaBasketball(ctx, W, H);
  else if (P.america === 'diner') americaDiner(ctx, W, H);
  else if (P.america === 'route66') americaRoute66(ctx, W, H);
  else if (P.america === 'flag') americaFlag(ctx, W, H, seed);
  else if (P.america === 'mesa') americaMesa(ctx, W, H);
  else if (P.america === 'quilt') americaQuilt(ctx, W, H, seed);
  else if (P.america === 'plaid') americaPlaid(ctx, W, H);
  else if (P.america === 'canyon') americaCanyon(ctx, W, H, seed);
  else if (P.america === 'hex') americaHex(ctx, W, H);
  else if (P.america === 'lonestar') americaLoneStar(ctx, W, H, seed);
  else if (P.america === 'bison') americaBison(ctx, W, H);
  else if (P.halloween === 'pumpkin') halloweenPumpkin(ctx, W, H);
  else if (P.halloween === 'web') halloweenWeb(ctx, W, H, seed);
  else if (P.halloween === 'ghost') halloweenGhost(ctx, W, H, seed);
  else if (P.kilim) kilim(ctx, W, H); else persian(ctx, W, H, P, seed);
  if (P.hooked) hookedFrame(ctx, W, H, seed); else addWeave(ctx, W, H, seed);

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
