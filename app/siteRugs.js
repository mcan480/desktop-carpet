/* Rug designs from desktopcarpet.com (site/index.html), copied verbatim so the app and the site
   draw exactly the same rugs. Update by copying the same block again when the site changes. */
function rng(seed){ let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0)/4294967296; }; }
const LW = 360, LH = 230, K = 2, FR = 28, CW = LW*K + FR*2, CH = LH*K;
function lobed(g, cx, cy, rx, ry, lobes = 20, amt = .05, mix = .62){
  g.beginPath();
  for (let i = 0; i <= 240; i++){
    const t = i/240*Math.PI*2, c = Math.cos(t), s = Math.sin(t), d = 1/(Math.abs(c) + Math.abs(s));
    const r = (1 - mix + mix*d)*(1 + amt*Math.cos(t*lobes));
    const x = cx + rx*r*c, y = cy + ry*r*s; i ? g.lineTo(x, y) : g.moveTo(x, y);
  }
  g.closePath();
}
function star(g, x, y, R1, r, n){ g.beginPath(); for (let i = 0; i < n*2; i++){ const a = i/(n*2)*Math.PI*2 - Math.PI/2, rr = i % 2 ? r : R1; g.lineTo(x + Math.cos(a)*rr, y + Math.sin(a)*rr); } g.closePath(); }
function rosette(g, x, y, r, P){
  g.fillStyle = P.accent;
  for (let k = 0; k < 6; k++){ const a = k/6*Math.PI*2; g.beginPath(); g.ellipse(x + Math.cos(a)*r*.55, y + Math.sin(a)*r*.55, r*.45, r*.3, a, 0, 7); g.fill(); }
  g.fillStyle = P.ivory; g.beginPath(); g.arc(x, y, r*.4, 0, 7); g.fill();
  g.fillStyle = P.ink; g.fillRect(x - .7, y - .7, 1.4, 1.4);
}
function diamond(g, x, y, r, f, s){ g.beginPath(); g.moveTo(x, y - r); g.lineTo(x + r, y); g.lineTo(x, y + r); g.lineTo(x - r, y); g.closePath(); g.fillStyle = f; g.fill(); g.fillStyle = s; g.fillRect(x - 1, y - 1, 2, 2); }
function small(g, x, y, t, col, sz, rot, P){
  g.save(); g.translate(x, y); g.rotate(rot); g.fillStyle = col;
  if (t === 0){ for (let k = 0; k < 4; k++){ g.beginPath(); g.ellipse(Math.cos(k*Math.PI/2)*sz*.6, Math.sin(k*Math.PI/2)*sz*.6, sz*.5, sz*.3, k*Math.PI/2, 0, 7); g.fill(); } g.fillStyle = P.ink; g.fillRect(-.7, -.7, 1.4, 1.4); }
  else if (t === 1){ g.beginPath(); g.ellipse(0, 0, sz, sz*.38, 0, 0, 7); g.fill(); }
  else if (t === 2){ for (let k = 0; k < 3; k++){ g.beginPath(); g.arc((k - 1)*sz*.7, 0, sz*.32, 0, 7); g.fill(); } }
  else { star(g, 0, 0, sz, sz*.45, 4); g.fill(); }
  g.restore();
}
function sdiam(g, cx, cy, k, ux, uy, c){ g.fillStyle = c; for (let r = -k; r <= k; r++){ const wd = (k - Math.abs(r))*2 + 1; g.fillRect(Math.round(cx - wd*ux/2), Math.round(cy + r*uy - uy/2), wd*ux, uy); } }

const STYLES = {
  persian(g, P, R){
    const w = LW, h = LH, fi = 27;
    for (const [i, c] of [[0, P.ink], [3, P.ivory], [5, P.border], [23, P.ivory], [25, P.ink], [fi, P.field]]){ g.fillStyle = c; g.fillRect(i, i, w - 2*i, h - 2*i); }
    const bc = 14;
    g.strokeStyle = P.ivory; g.globalAlpha = .5; g.lineWidth = 1.2;
    for (const y of [bc, h - bc]){ g.beginPath(); for (let x = bc; x <= w - bc; x += 2){ const yy = y + Math.sin(x/6)*3.5; x === bc ? g.moveTo(x, yy) : g.lineTo(x, yy); } g.stroke(); }
    for (const x of [bc, w - bc]){ g.beginPath(); for (let y = bc; y <= h - bc; y += 2){ const xx = x + Math.sin(y/6)*3.5; y === bc ? g.moveTo(xx, y) : g.lineTo(xx, y); } g.stroke(); }
    g.globalAlpha = 1;
    const motif = (x, y, i) => i % 2 ? rosette(g, x, y, 5.4, P) : diamond(g, x, y, 5, P.accent, P.ink);
    const nx = Math.round((w - 2*bc)/17), sx = (w - 2*bc)/nx;
    for (let i = 0; i <= nx; i++){ motif(bc + i*sx, bc, i); motif(bc + i*sx, h - bc, i); }
    const ny = Math.round((h - 2*bc)/17), sy = (h - 2*bc)/ny;
    for (let i = 1; i < ny; i++){ motif(bc, bc + i*sy, i); motif(w - bc, bc + i*sy, i); }
    g.save(); g.beginPath(); g.rect(fi, fi, w - 2*fi, h - 2*fi); g.clip();
    const cx = w/2, cy = h/2, Q = [[1, 1], [-1, 1], [1, -1], [-1, -1]];
    g.fillStyle = P.ink; g.globalAlpha = .3;
    for (let y = fi + 4, r = 0; y < h - fi; y += 8, r++) for (let x = fi + 4 + (r % 2)*4; x < w - fi; x += 8) g.fillRect(x, y, 1, 1);
    g.globalAlpha = 1;
    g.strokeStyle = P.accent; g.lineWidth = 1; g.globalAlpha = .55;
    for (let n = 0; n < 6; n++){
      const pt = () => ({ x: fi + R()*(cx - fi), y: fi + R()*(cy - fi) }); const a = pt(), b = pt(), c1 = pt();
      for (const [qx, qy] of Q){ const m = p => [cx + (p.x - cx)*qx, cy + (p.y - cy)*qy]; const A = m(a), B = m(b), C = m(c1); g.beginPath(); g.moveTo(A[0], A[1]); g.quadraticCurveTo(C[0], C[1], B[0], B[1]); g.stroke(); }
    }
    g.globalAlpha = 1;
    const cols = [P.accent, P.ivory, P.medal, P.ink];
    for (let n = 0; n < 36; n++){
      const x = fi + R()*(cx - fi), y = fi + R()*(cy - fi), t = Math.floor(R()*4), col = cols[Math.floor(R()*4)], sz = 2 + R()*3.5, rot = R()*Math.PI;
      for (const [qx, qy] of Q) small(g, cx + (x - cx)*qx, cy + (y - cy)*qy, t, col, sz, rot*qx*qy, P);
    }
    for (const [x, y] of [[fi, fi], [w - fi, fi], [fi, h - fi], [w - fi, h - fi]])
      for (const [s, c] of [[1, P.ivory], [.9, P.medal], [.62, P.accent], [.42, P.ivory], [.26, P.ink]]){ g.fillStyle = c; lobed(g, x, y, 60*s, 44*s, 18, .06); g.fill(); }
    for (const sx2 of [-1, 1]){
      const px = cx + sx2*98; g.strokeStyle = P.ivory; g.lineWidth = 1.5; g.beginPath(); g.moveTo(cx + sx2*72, cy); g.lineTo(px, cy); g.stroke();
      for (const [s, c] of [[1, P.ivory], [.75, P.medal], [.45, P.accent], [.2, P.ink]]){ g.fillStyle = c; lobed(g, px, cy, 15*s, 12*s, 8, .08, .9); g.fill(); }
    }
    const layers = [[1, P.ivory], [.95, P.medal], [.72, P.accent], [.6, P.field], [.44, P.ivory], [.32, P.medal], [.2, P.accent], [.1, P.ink]];
    layers.forEach(([s, c], li) => {
      g.fillStyle = c; lobed(g, cx, cy, 80*s, 62*s, li % 2 ? 16 : 22, .055); g.fill();
      if (li === 1 || li === 3){
        g.fillStyle = li === 1 ? P.ivory : P.accent;
        for (let k = 0; k < 32; k++){ const t = k/32*Math.PI*2, d = 1/(Math.abs(Math.cos(t)) + Math.abs(Math.sin(t))), r = (1 - .62 + .62*d)*.86*s; g.fillRect(cx + 80*r*Math.cos(t) - 1, cy + 62*r*Math.sin(t) - 1, 2, 2); }
      }
    });
    g.fillStyle = P.ivory; star(g, cx, cy, 8, 3.5, 8); g.fill();
    g.restore();
  },
  kilim(g, P){
    const w = LW, h = LH;
    g.fillStyle = P.ink; g.fillRect(0, 0, w, h);
    g.fillStyle = P.border; g.fillRect(3, 3, w - 6, h - 6);
    g.fillStyle = P.ink; g.fillRect(18, 18, w - 36, h - 36);
    const st = 14;
    for (let x = 10, i = 0; x < w - 6; x += st, i++){ sdiam(g, x, 10.5, 2, 2.2, 2.2, i % 2 ? P.ivory : P.accent); sdiam(g, x, h - 10.5, 2, 2.2, 2.2, i % 2 ? P.accent : P.ivory); }
    for (let y = 10 + st, i = 0; y < h - 14; y += st, i++){ sdiam(g, 10.5, y, 2, 2.2, 2.2, i % 2 ? P.ivory : P.accent); sdiam(g, w - 10.5, y, 2, 2.2, 2.2, i % 2 ? P.accent : P.ivory); }
    const fx = 20, fy = 20, fw = w - 40, fh = h - 40, cols = 5, cw = fw/cols;
    for (let i = 0; i < cols; i++){ g.fillStyle = i % 2 ? P.field2 : P.field; g.fillRect(fx + i*cw, fy, cw + 1, fh); }
    for (let i = 0; i < cols; i++){
      const cx = fx + i*cw + cw/2, cy = fy + fh/2;
      const seq = i % 2 ? [P.ink, P.accent, P.ivory, P.border] : [P.ink, P.ivory, P.border, P.accent];
      sdiam(g, cx, cy, 5, 5, 14, seq[0]); sdiam(g, cx, cy, 4, 5, 14, seq[1]); sdiam(g, cx, cy, 2, 5, 14, seq[2]); sdiam(g, cx, cy, 0, 5, 14, seq[3]);
      for (const s of [-1, 1]){ g.fillStyle = seq[0]; g.fillRect(cx + s*27.5 - (s < 0 ? 5 : 0), cy - 3, 5, 6); g.fillRect(cx + s*32.5 - (s < 0 ? 5 : 0), cy - 10, 5, 7); }
      sdiam(g, cx, fy + 9, 1, 3, 3, P.accent); sdiam(g, cx, fy + fh - 9, 1, 3, 3, P.accent);
    }
    for (let i = 1; i < cols; i++){ const x = fx + i*cw; g.fillStyle = P.ink; g.fillRect(x - 2, fy, 4, fh); g.fillStyle = P.accent; for (let y = fy + 4; y < fy + fh - 4; y += 10) g.fillRect(x - 1, y, 2, 4); }
    g.fillStyle = P.ivory; g.globalAlpha = .9;
    for (let x = fx; x < fx + fw; x += 6){ g.fillRect(x, fy, 3, 2); g.fillRect(x + 3, fy + 2, 3, 2); g.fillRect(x, fy + fh - 2, 3, 2); g.fillRect(x + 3, fy + fh - 4, 3, 2); }
    g.globalAlpha = 1;
  },
  berber(g, P, R){
    const w = LW, h = LH;
    g.fillStyle = P.field; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 1400; i++){ g.fillStyle = R() < .6 ? P.field2 : P.ink; g.globalAlpha = R()*.14; g.fillRect(R()*w, R()*h, 1 + R()*2, 1); }
    g.globalAlpha = 1;
    g.fillStyle = P.ink; for (const x of [7, 13, w - 9, w - 15]) g.fillRect(x, 0, 2.5, h);
    g.save(); g.beginPath(); g.rect(24, 8, w - 48, h - 16); g.clip();
    const s = 36; g.strokeStyle = P.ink; g.lineWidth = 2.8; g.lineCap = 'round'; g.lineJoin = 'round';
    for (let d = -h; d < w + h; d += s) for (const dir of [1, -1]){
      g.beginPath();
      for (let y = -6, j = 0; y <= h + 6; y += 6, j++){ const x = d + dir*(y - h/2)*.78 + (R() - .5)*1.8; j ? g.lineTo(x, y) : g.moveTo(x, y); }
      g.stroke();
    }
    g.lineWidth = 1.6; g.strokeStyle = P.accent;
    for (let d = -h + s/2, i = 0; d < w + h; d += s, i++){
      for (let y = s*.39, j = 0; y < h; y += s*.78, j++){
        if ((i + j) % 3 || d < 30 || d > w - 30) continue;
        g.beginPath(); g.moveTo(d - 3, y - 3); g.lineTo(d + 3, y + 3); g.moveTo(d + 3, y - 3); g.lineTo(d - 3, y + 3); g.stroke();
      }
    }
    g.restore();
  }
};

/* Front = the pile side. Back = the same design seen from underneath: washed out, flat, with the warp/weft grid showing.
   The back is NOT mirrored here; the 3D fold mirrors it, exactly like real wool. */
function paintRug(def){
  const lo = document.createElement('canvas'); lo.width = LW; lo.height = LH; const c = lo.getContext('2d'); const R = rng(def.seed);
  STYLES[def.style](c, def.pal, R);
  const id = c.getImageData(0, 0, LW, LH), d = id.data;
  for (let i = 0; i < d.length; i += 4){ const n = (R() - .5)*18; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
  c.putImageData(id, 0, 0);
  c.globalAlpha = .05; for (let y = 0; y < LH; y += 1 + Math.floor(R()*7)){ c.fillStyle = R() < .5 ? '#000' : '#fff'; c.fillRect(0, y, LW, 1 + R()*3); } c.globalAlpha = 1;
  const f = document.createElement('canvas'); f.width = CW; f.height = CH; const g = f.getContext('2d');
  g.imageSmoothingEnabled = false; g.drawImage(lo, FR, 0, LW*K, LH*K);
  const W2 = LW*K, fd = g.getImageData(FR, 0, W2, CH), q = fd.data;
  for (let y = 0; y < CH; y++) for (let x = 0; x < W2; x++){
    if ((x & 1) || (y & 1)){ const i = (y*W2 + x)*4, m = ((x & 1) && (y & 1)) ? .8 : .9; q[i] *= m; q[i + 1] *= m; q[i + 2] *= m; }
  }
  g.putImageData(fd, FR, 0);
  g.lineCap = 'round';
  for (const side of [0, 1]){
    const x0 = side ? FR + W2 : FR, dir = side ? 1 : -1;
    for (let y = 3; y < CH - 2; y += 3.2){
      const len = FR - 3 - R()*9; g.strokeStyle = def.pal.fringe || '#efe3c8'; g.globalAlpha = .7 + R()*.3; g.lineWidth = 1.4;
      g.beginPath(); g.moveTo(x0, y); g.quadraticCurveTo(x0 + dir*len*.5, y + (R() - .5)*4, x0 + dir*len, y + (R() - .5)*6); g.stroke();
    }
    g.globalAlpha = .45; g.fillStyle = def.pal.ink; for (let y = 4; y < CH; y += 10) g.fillRect(side ? x0 : x0 - 3, y, 3, 6);
    g.globalAlpha = 1;
  }
  const b = document.createElement('canvas'); b.width = CW; b.height = CH; const h = b.getContext('2d');
  h.drawImage(f, 0, 0);
  h.globalCompositeOperation = 'saturation'; h.globalAlpha = .5; h.fillStyle = 'hsl(0,0%,50%)'; h.fillRect(0, 0, CW, CH);
  h.globalCompositeOperation = 'source-atop';
  h.globalAlpha = .3; h.fillStyle = '#eadcbf'; h.fillRect(0, 0, CW, CH);
  h.globalAlpha = .22; h.fillStyle = '#f7eedb'; for (let y = 0; y < CH; y += 4) h.fillRect(FR, y, W2, 1);
  h.globalAlpha = .16; h.fillStyle = '#2a1a10'; for (let x = FR; x < FR + W2; x += 4) h.fillRect(x, 0, 1, CH);
  h.globalAlpha = .5; h.fillStyle = '#efe4cc'; h.fillRect(FR, 0, 3, CH); h.fillRect(FR + W2 - 3, 0, 3, CH);
  h.globalCompositeOperation = 'destination-in'; h.globalAlpha = 1; h.drawImage(f, 0, 0);
  h.globalCompositeOperation = 'source-over';
  return { f, b };
}

const IVORY = '#efe2c4', INK = '#1a1012';
const RUGS = [
  { seed: 101, style: 'persian', name: 'Tabriz After Midnight', drop: 'Drop 01 · Oct 2026', meta: 'Persian medallion · 4-way symmetry', status: 'On desktops now', live: true,
    pal: { field: '#7a1517', field2: '#6a1214', border: '#1d2447', medal: '#1d2447', accent: '#d39a32', ivory: IVORY, ink: INK } },
  { seed: 202, style: 'kilim', name: 'Anatolian Kilim No. 4', drop: 'Drop 02 · Nov 2026', meta: 'Flat-weave · stepped diamonds', status: 'Arrives 1 Nov',
    pal: { field: '#a3271f', field2: '#c0632a', border: '#23315c', medal: '#23315c', accent: '#d9a03a', ivory: IVORY, ink: INK } },
  { seed: 303, style: 'berber', name: 'Atlas Snowfield', drop: 'Drop 03 · Dec 2026', meta: 'Berber lattice · undyed wool', status: 'Arrives 1 Dec',
    pal: { field: '#ece3d0', field2: '#cdbfa5', border: '#2a2320', medal: '#2a2320', accent: '#a33a2a', ivory: '#f6efe0', ink: '#2a2320', fringe: '#f3ead8' } },
  { seed: 404, style: 'persian', name: 'Isfahan Rosewater', drop: 'Drop 04 · Jan 2027', meta: 'Persian medallion · pale field', status: 'Arrives 1 Jan',
    pal: { field: '#dcc2a6', field2: '#d1b392', border: '#8c2a3c', medal: '#8c2a3c', accent: '#2f6a6a', ivory: '#f5ead6', ink: '#2b1c22' } },
  { seed: 505, style: 'kilim', name: 'Pistachio Kilim', drop: 'Drop 05 · Feb 2027', meta: 'Flat-weave · hooked diamonds', status: 'Arrives 1 Feb',
    pal: { field: '#5c6b3a', field2: '#7b8a4c', border: '#3a1f1a', medal: '#3a1f1a', accent: '#e0b54a', ivory: IVORY, ink: '#1e1a12' } },
  { seed: 606, style: 'persian', name: 'Kashan Peacock', drop: 'Drop 06 · Mar 2027', meta: 'Persian medallion · teal field', status: 'Arrives 1 Mar',
    pal: { field: '#153d48', field2: '#123540', border: '#7a1f1f', medal: '#7a1f1f', accent: '#c9963c', ivory: IVORY, ink: '#0e1416' } }
];

const BY_SEED = Object.fromEntries(RUGS.map((r) => [r.seed, r]));

/* Returns front/back canvases of the rug body (fringe stripped: the 3D cloth draws its own edges),
   scaled up 2x with nearest-neighbour so the knots stay crisp on big screens. */
export function makeSiteRugCanvases(seed) {
  const def = BY_SEED[seed];
  const { f, b } = paintRug(def);
  const crop = (src) => {
    const c = document.createElement('canvas');
    c.width = LW * K * 2; c.height = CH * 2;
    const g = c.getContext('2d');
    g.imageSmoothingEnabled = false;
    g.drawImage(src, FR, 0, LW * K, CH, 0, 0, c.width, c.height);
    return c;
  };
  return { front: crop(f), back: crop(b) };
}
export const SITE_RUGS = RUGS;
