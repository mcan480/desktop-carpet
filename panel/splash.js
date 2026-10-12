// Update splash: ?mode=installing (the rug is woven column by column, never quite finishing, while the update goes in)
// or ?mode=done (the last columns go in, the rug gets its fringe and a saffron seal). &v=version &lang=language
(() => {
  const q = new URLSearchParams(location.search);
  const mode = q.get('mode') === 'done' ? 'done' : 'installing', v = q.get('v') || '';
  const I18N = window.DC_I18N, T = I18N.strings(I18N.LANGS[q.get('lang')] ? q.get('lang') : 'en');
  document.documentElement.lang = q.get('lang') || 'en';
  document.getElementById('title').textContent = mode === 'done' ? T.updDone : T.updInstalling;
  document.getElementById('sub').textContent = mode === 'done' ? T.updDoneTo(v) : T.updInstallingTo(v);
  if (mode === 'done') document.getElementById('card').classList.add('done');

  // The rug: the same one as the app's mark, a madder field with an ink and ivory diamond, an ivory border.
  const COLS = 28, ROWS = 16, K = 12, FR = 14;   // knots across and down, knot size, fringe length (canvas pixels)
  const C = { ink: '#22130c', ivory: '#f2e6cc', ivory2: '#e3d2ad', madder: '#8f1b1d', madder2: '#7a1618', saffron: '#d89a2e', indigo: '#26325e' };
  function knot(c, r) {
    if (c < 2 || r < 2 || c >= COLS - 2 || r >= ROWS - 2) return (c + r) % 2 ? C.ivory : C.ivory2;
    if (c === 2 || r === 2 || c === COLS - 3 || r === ROWS - 3) return C.ink;
    const d = Math.abs(c - (COLS - 1) / 2) / 1.75 + Math.abs(r - (ROWS - 1) / 2);
    if (d < 1.2) return C.saffron;
    if (d < 2.6) return C.ivory;
    if (d < 4.4) return C.ink;
    if (d < 5.2) return C.indigo;
    return (c + r) % 2 ? C.madder : C.madder2;
  }
  const cv = document.getElementById('loom'), x = cv.getContext('2d');
  const W = COLS * K, H = ROWS * K, ox = (cv.width - W) / 2, oy = (cv.height - H) / 2;
  function draw(cols, shuttle, sealed) {
    x.clearRect(0, 0, cv.width, cv.height);
    // the warp: ivory threads waiting to be woven
    x.strokeStyle = 'rgba(242,230,204,.28)'; x.lineWidth = 1.5;
    for (let r = 0; r < ROWS; r++) { const y = oy + r * K + K / 2; x.beginPath(); x.moveTo(ox - FR, y); x.lineTo(ox + W + FR, y); x.stroke(); }
    // the knots woven so far
    const full = Math.floor(cols), part = cols - full;
    for (let c = 0; c < Math.min(COLS, Math.ceil(cols)); c++) {
      const rows = c < full ? ROWS : Math.floor(part * ROWS);
      for (let r = 0; r < rows; r++) {
        x.fillStyle = knot(c, r);
        x.beginPath(); x.roundRect(ox + c * K + 0.6, oy + r * K + 0.6, K - 1.2, K - 1.2, 3.5); x.fill();
        x.fillStyle = 'rgba(0,0,0,.16)'; x.fillRect(ox + c * K + 1.5, oy + r * K + K - 3, K - 3, 1.6);
      }
    }
    // the shuttle running along the column being woven
    if (shuttle && cols < COLS) {
      const sx = ox + Math.floor(cols) * K + K / 2, sy = oy + (part * ROWS) * K;
      x.fillStyle = C.saffron; x.beginPath(); x.roundRect(sx - 3, sy - 7, 6, 14, 3); x.fill();
    }
    // fringe once it's finished
    if (cols >= COLS) {
      x.strokeStyle = C.ivory2; x.lineWidth = 1.6;
      for (let r = 0; r < ROWS; r++) { const y = oy + r * K + K / 2; x.beginPath(); x.moveTo(ox - FR + 3, y); x.lineTo(ox, y); x.moveTo(ox + W, y); x.lineTo(ox + W + FR - 3, y); x.stroke(); }
    }
    if (sealed > 0) {
      const s = sealed, cx = ox + W - 6, cy = oy + 8;
      x.save(); x.translate(cx, cy); x.scale(s, s);
      x.fillStyle = C.saffron; x.beginPath(); x.arc(0, 0, 15, 0, Math.PI * 2); x.fill();
      x.strokeStyle = C.ink; x.lineWidth = 3.4; x.lineCap = 'round'; x.lineJoin = 'round';
      x.beginPath(); x.moveTo(-6.5, 0.5); x.lineTo(-1.8, 5.2); x.lineTo(7, -5); x.stroke();
      x.restore();
    }
  }
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const t0 = performance.now();
  function frame(now) {
    const t = (now - t0) / 1000;
    if (mode === 'installing') {
      // quick at first, then slower and slower: it never pretends to be finished
      draw(still ? COLS * 0.7 : (COLS - 1.5) * (1 - Math.exp(-t / 2.4)), !still, 0);
      if (!still) requestAnimationFrame(frame);
    } else {
      const k = still ? 1 : Math.min(1, t / 0.6), cols = COLS * (0.8 + 0.2 * (1 - (1 - k) ** 2));
      const seal = still ? 1 : t < 0.65 ? 0 : Math.min(1, (t - 0.65) / 0.25), bounce = seal < 1 ? seal * 1.15 : 1;
      draw(cols, k < 1, bounce);
      if (!still && t < 1.2) requestAnimationFrame(frame);
    }
  }
  requestAnimationFrame(frame);
})();
