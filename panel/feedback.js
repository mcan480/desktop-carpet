// The one-time rating window: ?lang=<the app's language>. Five stars, an optional comment, an optional name to show and
// the note that they may appear on desktopcarpet.com (the name only if one is given). window.dcfb (electron/feedback-preload.cjs) sends, skips and closes;
// opened in a plain browser (a preview) it only pretends.
(() => {
  const q = new URLSearchParams(location.search);
  const I18N = window.DC_I18N, lang = I18N.LANGS[q.get('lang')] ? q.get('lang') : 'en', T = I18N.strings(lang);
  const dc = window.dcfb || { send: () => new Promise((r) => setTimeout(() => r({ ok: q.get('fail') !== '1' }), 700)), skip() {}, close() {} };
  const $ = (id) => document.getElementById(id);
  const form = $('form'), text = $('text'), name = $('name'), send = $('send'), skip = $('skip'), err = $('err'), word = $('word');
  document.documentElement.lang = lang;
  document.title = T.fbTitle;
  $('title').textContent = T.fbTitle;
  $('textLabel').textContent = T.fbPh;
  text.placeholder = T.fbPh;
  $('nameLabel').textContent = T.fbName;
  name.placeholder = T.fbName;
  $('note').textContent = T.fbNote;
  send.textContent = T.fbSend;
  skip.textContent = T.fbSkip;
  $('close').setAttribute('aria-label', T.fbClose);
  $('close').title = T.fbClose;
  $('thanksTitle').textContent = T.fbThanks;
  $('thanksSub').textContent = T.fbThanksSub;

  // the stars: a radio group (arrow keys move, the first one or the chosen one takes the Tab stop)
  const NS = 'http://www.w3.org/2000/svg';
  const points = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5, r = i % 2 ? 4.6 : 10.4;
    return `${(12 + r * Math.cos(a)).toFixed(2)},${(12.9 + r * Math.sin(a)).toFixed(2)}`;
  }).join(' ');
  let stars = 0, peek = 0, busy = false, done = false;
  const btns = [1, 2, 3, 4, 5].map((n) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'star'; b.dataset.n = String(n);
    b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', 'false');
    b.setAttribute('aria-label', `${n} · ${T.fbStars[n - 1]}`);
    b.tabIndex = n === 1 ? 0 : -1;
    const svg = document.createElementNS(NS, 'svg'), poly = document.createElementNS(NS, 'polygon');
    svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('aria-hidden', 'true'); poly.setAttribute('points', points);
    svg.append(poly); b.append(svg);
    b.addEventListener('click', () => choose(n));
    b.addEventListener('pointerenter', () => { peek = n; paint(); });
    b.addEventListener('pointerleave', () => { peek = 0; paint(); });
    $('stars').append(b);
    return b;
  });
  function paint() {
    const upTo = peek || stars;
    btns.forEach((b, i) => {
      b.classList.toggle('on', !peek && i < stars);
      b.classList.toggle('peek', !!peek && i < peek);
    });
    word.textContent = upTo ? T.fbStars[upTo - 1] : '';
  }
  function choose(n, focus) {
    if (busy || done) return;
    stars = n;
    btns.forEach((b, i) => { b.setAttribute('aria-checked', String(i === n - 1)); b.tabIndex = i === n - 1 ? 0 : -1; });
    if (focus) btns[n - 1].focus();
    send.disabled = false;
    err.hidden = true;
    paint();
  }
  $('stars').addEventListener('keydown', (e) => {
    const k = e.key, cur = stars || 0;
    let n = 0;
    if (k === 'ArrowRight' || k === 'ArrowUp') n = Math.min(5, cur + 1);
    else if (k === 'ArrowLeft' || k === 'ArrowDown') n = Math.max(1, cur - 1);
    else if (k === 'Home') n = 1;
    else if (k === 'End') n = 5;
    if (!n) return;
    e.preventDefault();
    choose(n, true);
  });

  function setBusy(on) {
    busy = on;
    send.disabled = on || !stars; skip.disabled = on; text.readOnly = on; name.readOnly = on;
    send.textContent = on ? T.fbSending : T.fbSend;
    $('card').classList.toggle('busy', on);
  }
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!stars || busy || done) return;
    err.hidden = true;
    setBusy(true);
    let r = null;
    try { r = await dc.send(stars, text.value, name.value.trim()); } catch { r = null; }
    setBusy(false);
    if (r && r.ok) {
      done = true;
      form.hidden = true; $('thanks').hidden = false;
      setTimeout(() => { $('card').classList.add('leaving'); setTimeout(() => dc.close(), 380); }, 2600);
    } else {
      err.textContent = T.fbError; err.hidden = false;
    }
  });
  const leave = () => { if (busy) return; if (done) dc.close(); else dc.skip(); };
  skip.addEventListener('click', leave);
  $('close').addEventListener('click', leave);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); leave(); }
    else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !done) { e.preventDefault(); form.requestSubmit(); }
  });
  text.addEventListener('input', () => { err.hidden = true; });
  name.addEventListener('input', () => { err.hidden = true; });
  name.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey) { e.preventDefault(); if (stars) form.requestSubmit(); } });
  paint();
})();
