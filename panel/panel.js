/* Desktop Carpet control panel. Talks to the main process through window.dc (panel-preload.cjs). */
(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const dc = window.dc;

  const I18N = window.DC_I18N;
  I18N.setPlatform(dc.platform);
  if (dc.platform === 'darwin') document.documentElement.classList.add('mac');

  let T = I18N.strings('en'), lang = 'en', st = null, busy = false;

  function applyStrings() {
    document.documentElement.lang = lang;
    $$('[data-t]').forEach((el) => { const v = T[el.dataset.t]; if (typeof v === 'string') el.textContent = v; });
    $$('[data-tp]').forEach((el) => { const v = T[el.dataset.tp]; if (typeof v === 'string') el.placeholder = v; });
  }

  const fmtDate = (iso) => {
    try { return new Date(iso).toLocaleDateString((I18N.LANGS[lang] || I18N.LANGS.en).locale, { year: 'numeric', month: 'long', day: 'numeric' }); } catch { return iso; }
  };
  const maskKey = (k) => (k ? k.replace(/^(DC-[A-Z0-9]{4})-[A-Z0-9]{4}-[A-Z0-9]{4}-([A-Z0-9]{4})$/i, '$1-••••-••••-$2') : '');

  function showView(name) {
    $$('#license [data-view]').forEach((v) => { v.hidden = v.dataset.view !== name; });
  }

  function buildLangSelect() {
    const sel = $('#langSel');
    sel.textContent = '';
    const auto = document.createElement('option'); auto.value = 'auto'; auto.textContent = T.langAuto; sel.append(auto);
    for (const [code, info] of Object.entries(I18N.LANGS)) {
      const o = document.createElement('option'); o.value = code; o.textContent = info.name; sel.append(o);
    }
    sel.value = st?.settings?.langSetting || 'auto';
  }

  // bytes as megabytes in the panel's language, e.g. "3.4 MB", "3,4 MB"
  function mb(n) {
    const v = n / 1e6;
    try { return new Intl.NumberFormat((I18N.LANGS[lang] || I18N.LANGS.en).locale, { style: 'unit', unit: 'megabyte', maximumFractionDigits: v < 10 ? 1 : 0 }).format(v); } catch { return v.toFixed(1) + ' MB'; }
  }

  function pct(n) {
    try { return new Intl.NumberFormat((I18N.LANGS[lang] || I18N.LANGS.en).locale, { style: 'percent' }).format(n / 100); } catch { return n + '%'; }
  }

  function render() {
    if (!st) return;
    // Update card: the download found at launch shows its progress (and how many MB), then turns into
    // "Restart and update" (saying how long that takes); after the click it keeps weaving until the app restarts.
    const U = st.update || {}, getting = U.state === 'downloading', ready = U.state === 'ready', inst = U.state === 'installing';
    const bar = $('#updBar');
    bar.hidden = !(getting || ready || inst);
    bar.classList.toggle('getting', getting);
    bar.classList.toggle('installing', inst);
    bar.style.setProperty('--p', `${getting ? U.progress || 0 : 100}%`);
    const updText = inst ? T.updInstalling : ready ? T.updReady(U.version) : getting ? T.updGetting(U.version) : '';
    if ($('#updText').textContent !== updText) $('#updText').textContent = updText;
    $('#updPct').textContent = getting ? pct(U.progress || 0) : '';
    const sub = getting ? (U.total ? T.updOf(mb(U.got || 0), mb(U.total)) : '')
      : ready ? (U.kind === 'app' || U.platform === 'darwin' ? T.updQuick : T.updSlow) : inst ? T.updInstallingTo(U.version) : '';
    if ($('#updSub').textContent !== sub) $('#updSub').textContent = sub;
    $('#updBtn').hidden = !ready;
    $('#updBtn').disabled = false;
    if (document.activeElement !== $('#langSel')) $('#langSel').value = st.settings?.langSetting || 'auto';
    const L = st.license || { state: 'checking' };
    const view = { active: 'active', offline: 'active', expired: 'expired', device_limit: 'device_limit', error: 'error', checking: 'checking' }[L.state] || 'none';
    showView(view);

    $('#licEyebrow').textContent = T.license + (L.plan ? ` · ${T[L.plan] || L.plan}` : '');

    if (view === 'active') {
      $('#keyShown').textContent = maskKey(L.key) || 'DC-••••';
      $('#keyState').innerHTML = '';
      const dot = document.createElement('span'); dot.textContent = '● ' + (L.state === 'offline' ? T.offline : T.active);
      $('#keyState').append(dot);
      $('#keyDays').textContent = Number.isFinite(L.daysLeft) ? (L.plan === 'trial' ? T.trialLeft(L.daysLeft) : T.daysLeft(L.daysLeft)) : '';
      $('#factPlan').textContent = T[L.plan] || L.plan || '—';
      $('#factUntil').textContent = L.expiresAt ? fmtDate(L.expiresAt) : '—';
      $('#factDevices').textContent = L.maxDevices ? `${L.devices ?? 1} / ${L.maxDevices}` : '—';
      const soon = Number.isFinite(L.daysLeft) && L.daysLeft <= 3;
      $('#soonWarn').hidden = !soon;
      if (soon) $('#soonWarn').textContent = L.plan === 'trial' ? T.trialSoon(L.daysLeft) : T.soon(L.daysLeft);
      $('#extendBtn').textContent = L.plan === 'trial' ? T.choosePlan : T.extend;
    }
    if (view === 'expired') {
      const trial = L.plan === 'trial', d = L.expiresAt ? fmtDate(L.expiresAt) : '—';
      $('#expiredTitle').textContent = trial ? T.trialExpiredTitle : T.expiredTitle;
      $('#expiredLead').textContent = trial ? T.trialExpiredLead(d) : T.expiredLead(d);
      $('#renewBtn').textContent = trial ? T.choosePlan : T.renew;
    }
    if (view === 'device_limit') {
      $('#limitLead').textContent = T.limitLead(L.maxDevices ?? '?');
      const ul = $('#deviceList'); ul.textContent = '';
      (L.devices || []).forEach((d) => {
        const li = document.createElement('li'); const n = document.createElement('span'); n.textContent = d.name || 'Computer';
        const s = document.createElement('small'); s.textContent = d.lastSeen ? fmtDate(d.lastSeen) : '';
        li.append(n, s); ul.append(li);
      });
    }
    if (view === 'none' && L.reason && L.reason !== 'none') {
      setMsg($('#keyMsg'), T.reasons[L.reason] || T.reasons.unknown, 'bad');
    }

    // Rug controls
    const expiredPaid = L.state === 'expired' && L.plan !== 'trial';
    const unlocked = ['active', 'offline'].includes(L.state) || expiredPaid;
    $('#controls').classList.toggle('locked', !unlocked);
    $('#lockNote').hidden = unlocked || L.state === 'checking';
    const r = st.rug || {};
    $$('#swatches button[data-style]').forEach((b) => {
      b.setAttribute('aria-checked', String(b.dataset.style === r.style));
      b.disabled = expiredPaid && b.dataset.style !== 'klasik';
    });
    if (r.style !== shownStyle) {
      shownStyle = r.style;
      const btn = $(`#swatches [data-style="${r.style}"]`);
      const coll = btn?.closest('.coll'), home = btn?.closest('.country');
      if (coll) showColl(coll.dataset.coll);
      if (home) showCountry(home.dataset.country);
      for (const room of rooms) if (btn && room.el.contains(btn)) room.pick = r.style;
      // A new pack gets the gallery once: the first time the panel opens after it arrives, it opens on that pack.
      if (featured && !featuredSeen) { featuredSeen = true; showColl(featured); try { localStorage.setItem('dc-featured', featured); } catch {} }
    }
    for (const room of rooms) if (!room.hover) room.show(room.pick);
    $('#patternNote').hidden = !expiredPaid;
    $$('#sizeSeg button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === r.size)));
    $$('#weightSeg button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === r.weight)));
    $('#tShow').checked = !r.hidden;
    $('#tTop').checked = !!st.settings?.onTop;
    $('#tLogin').checked = !!st.settings?.openAtLogin;
    $('#version').textContent = 'v' + (st.version || '1.0.0');
  }

  function setMsg(el, text, kind) {
    el.textContent = text; el.className = 'msg ' + (kind || ''); el.hidden = !text;
  }

  // ---- license actions ----
  const keyInput = $('#keyInput');
  keyInput.addEventListener('input', () => {
    // Normalise as the user types/pastes: uppercase, strip spaces.
    const pos = keyInput.selectionStart;
    keyInput.value = keyInput.value.toUpperCase().replace(/\s+/g, '');
    keyInput.setSelectionRange(pos, pos);
    keyInput.removeAttribute('aria-invalid');
    $('#keyMsg').hidden = true;
  });

  $('#keyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (busy) return;
    const key = keyInput.value.trim();
    if (!/^DC-?[A-Z0-9]{4}-?[A-Z0-9]{4}-?[A-Z0-9]{4}-?[A-Z0-9]{4}$/i.test(key)) {
      keyInput.setAttribute('aria-invalid', 'true');
      setMsg($('#keyMsg'), T.reasons.bad_key, 'bad');
      return;
    }
    busy = true;
    const go = $('#keyGo'); go.disabled = true; go.textContent = T.activating;
    try {
      const s = await dc.activate(key);
      if (s.state === 'invalid' || s.state === 'error') {
        if (s.reason !== 'trial_used') keyInput.setAttribute('aria-invalid', 'true');
        setMsg($('#keyMsg'), T.reasons[s.reason] || T.reasons.unknown, 'bad');
      }
    } finally {
      busy = false; go.disabled = false; go.textContent = T.activate;
    }
  });

  $('#lostBtn').addEventListener('click', () => { const f = $('#lostForm'); f.hidden = !f.hidden; if (!f.hidden) $('#lostEmail').focus(); });
  $('#lostForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const r = await dc.recover($('#lostEmail').value.trim());
    if (r?.reason === 'email_disabled') setMsg($('#lostMsg'), T.lostOff, 'bad');
    else if (r?.ok) setMsg($('#lostMsg'), T.lostSent, 'good');
    else setMsg($('#lostMsg'), T.reasons[r?.reason] || T.reasons.unknown, 'bad');
  });

  $('#removeBtn').addEventListener('click', async () => { if (confirm(T.removeAsk)) await dc.deactivate(); });
  $('#recheckBtn').addEventListener('click', () => dc.recheck());
  $('#retryBtn').addEventListener('click', () => dc.recheck());
  $('#limitBack').addEventListener('click', () => dc.forget());

  // ---- rug controls ----
  $$('#swatches button[data-style]').forEach((b) => b.addEventListener('click', () => dc.rug('style', b.dataset.style)));
  // The gallery shows one collection at a time; it opens on the collection of the rug in use.
  let shownStyle = null;
  function showColl(c) {
    $$('.shelves [data-coll]').forEach((t) => t.setAttribute('aria-selected', String(t.dataset.coll === c)));
    $$('.coll[data-coll]').forEach((p) => { p.hidden = p.dataset.coll !== c; });
  }
  $$('.shelves [data-coll]').forEach((t) => t.addEventListener('click', () => { showColl(t.dataset.coll); $('.gallery').scrollTop = 0; }));
  // Large showroom pictures: the small thumbnail shows at once, then a sharp one drawn from the rug's own code in a
  // worker replaces it (so no large pictures ship with the app). One drawing at a time, the most recently asked-for
  // rug first; drawn pictures are kept for the session.
  const previews = (() => {
    const cache = new Map(), want = new Map();   // rug -> callback, in the order they were asked for
    let worker = null, busy = null, broken = false;
    function start() {
      if (worker || broken) return !!worker;
      try { worker = new Worker('rugworker.js'); } catch { broken = true; return false; }
      worker.onmessage = ({ data }) => {
        const cb = want.get(data.key);
        want.delete(data.key);
        busy = null;
        if (data.blob) {
          const url = URL.createObjectURL(data.blob);
          cache.set(data.key, url);
          while (cache.size > 60) { const [k, u] = cache.entries().next().value; cache.delete(k); URL.revokeObjectURL(u); }
          cb?.(url);
        }
        pump();
      };
      worker.onerror = () => { broken = true; worker = null; busy = null; };
      return true;
    }
    function pump() {
      if (busy || !want.size || !start()) return;
      busy = [...want.keys()].pop();
      worker.postMessage({ key: busy, w: 960, h: 608 });
    }
    return {
      // calls back with the sharp picture's URL: now if it was drawn before (returns true), else when it's ready
      get(k, cb) {
        if (cache.has(k)) { cb(cache.get(k)); return true; }
        want.delete(k); want.set(k, cb); pump(); return false;
      },
      // no longer needed (unless it's being drawn already)
      drop(k) { if (busy !== k) want.delete(k); },
    };
  })();

  // Showrooms (Persia, Türkiye, East Asia, Mediterranean): the rug in use there (or the last one picked) hangs large, with the town it comes
  // from; pointing at another one previews it.
  const rooms = $$('.showroom').map((el) => {
    const btns = [...el.querySelectorAll('[data-style]')], img = el.querySelector('.showcase-rug img');
    const room = {
      el, pick: btns[0]?.dataset.style, hover: false, shown: null,
      show(k) {
        const b = el.querySelector(`[data-style="${k}"]`);
        if (!b) return;
        if (room.shown !== k) {
          if (room.shown) previews.drop(room.shown);
          room.shown = k;
          const sharp = previews.get(k, (url) => { if (room.shown === k) img.src = url; });
          if (!sharp) img.src = `./thumbs/${k}.webp`;
        }
        el.querySelector('.showcase-text h3').textContent = b.querySelector('span').textContent;
        el.querySelector('.showcase-origin span').textContent = T['o_' + k] || T[b.closest('.country')?.dataset.country] || '';
      },
    };
    btns.forEach((b) => {
      b.addEventListener('pointerenter', () => { room.hover = true; room.show(b.dataset.style); });
      b.addEventListener('focus', () => room.show(b.dataset.style));
    });
    el.querySelectorAll('.room-grid').forEach((g) => {
      g.addEventListener('pointerleave', () => { room.hover = false; room.show(room.pick); });
      g.addEventListener('focusout', () => { if (!room.hover) room.show(room.pick); });
    });
    return room;
  });
  // The featured pack is the wide tab on the shelf.
  const featured = $('.shelves .shelf-featured')?.dataset.coll;
  let featuredSeen = true;
  try { featuredSeen = localStorage.getItem('dc-featured') === featured; } catch {}
  // Packs with countries (Americas, East Asia, Mediterranean): one country at a time, each pack keeping its own choice.
  function showCountry(c) {
    const scope = $(`.country-tabs [data-country="${c}"]`)?.closest('.coll');
    if (!scope) return;
    scope.querySelectorAll('.country-tabs [data-country]').forEach((t) => t.setAttribute('aria-selected', String(t.dataset.country === c)));
    scope.querySelectorAll('.country[data-country]').forEach((p) => { p.hidden = p.dataset.country !== c; });
  }
  $$('.country-tabs [data-country]').forEach((t) => t.addEventListener('click', () => {
    showCountry(t.dataset.country);
    // in a showroom, the big rug follows the country: the one in use if it's from there, else the country's first
    const room = rooms.find((r) => r.el.contains(t));
    const panel = room?.el.querySelector(`.country[data-country="${t.dataset.country}"]`);
    if (room && panel) {
      const using = st?.rug?.style;
      room.pick = panel.querySelector(`[data-style="${using}"]`) ? using : panel.querySelector('[data-style]').dataset.style;
      room.show(room.pick);
    }
  }));
  $$('#sizeSeg button').forEach((b) => b.addEventListener('click', () => dc.rug('size', b.dataset.v)));
  $$('#weightSeg button').forEach((b) => b.addEventListener('click', () => dc.rug('weight', b.dataset.v)));
  $('#tShow').addEventListener('change', (e) => dc.rug(e.target.checked ? 'show' : 'hide'));
  $('#tTop').addEventListener('change', (e) => dc.setting('onTop', e.target.checked));
  $('#tLogin').addEventListener('change', (e) => dc.setting('openAtLogin', e.target.checked));
  $('#flattenBtn').addEventListener('click', () => dc.rug('flatten'));
  $('#centerBtn').addEventListener('click', () => dc.rug('center'));
  $$('[data-url]').forEach((b) => b.addEventListener('click', () => dc.open(b.dataset.url)));
  $('#quitBtn').addEventListener('click', () => dc.quit());
  $('#langSel').addEventListener('change', (e) => dc.setting('lang', e.target.value));
  $('#updBtn').addEventListener('click', (e) => { e.target.disabled = true; dc.installUpdate(); });

  // ---- report a problem: goes to the contact inbox on desktopcarpet.com ----
  const rep = $('#report'), repText = $('#reportText'), repEmail = $('#reportEmail'), repGo = $('#reportGo'), repMsg = $('#reportMsg');
  let repOpened = 0, repBusy = false;
  rep.addEventListener('toggle', () => { if (rep.open && !repOpened) repOpened = Date.now(); });
  try { repEmail.value = localStorage.getItem('dc-report-email') || ''; } catch {}
  $('#reportForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (repBusy) return;
    const message = repText.value.trim(), email = repEmail.value.trim();
    $('#reportWeb').hidden = true;
    if (message.length < 5) { setMsg(repMsg, T.reportEmpty, 'bad'); repText.focus(); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { setMsg(repMsg, T.reportBadEmail, 'bad'); repEmail.focus(); return; }
    repBusy = true; repGo.disabled = true; repGo.textContent = T.reportSending; repMsg.hidden = true;
    let r;
    try { r = await dc.report({ email, message, t: Date.now() - (repOpened || 0) }); } catch { r = { ok: false, error: 'network' }; }
    repBusy = false; repGo.disabled = false; repGo.textContent = T.reportSend;
    if (r?.ok) {
      setMsg(repMsg, T.reportSent, 'good'); repText.value = '';
      try { localStorage.setItem('dc-report-email', email); } catch {}
      return;
    }
    const why = { bad_email: 'reportBadEmail', empty: 'reportEmpty', rate_limited: 'reportRate' }[r?.error] || 'reportFail';
    setMsg(repMsg, T[why], 'bad');
    if (why === 'reportFail' || why === 'reportRate') $('#reportWeb').hidden = false;
  });
  dc.onOpenReport?.(() => { rep.open = true; rep.scrollIntoView({ behavior: 'smooth', block: 'start' }); setTimeout(() => repText.focus(), 250); });

  dc.onState((s) => {
    const first = !st;
    st = s;
    if (first || s.lang !== lang) { lang = I18N.LANGS[s.lang] ? s.lang : 'en'; T = I18N.strings(lang); applyStrings(); buildLangSelect(); window.__t_trial_used = T.reasons.trial_used; }
    render();
  });
  dc.ready();
})();
