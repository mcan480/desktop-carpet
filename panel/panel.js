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

  function render() {
    if (!st) return;
    const U = st.update || {};
    $('#updBar').hidden = U.state !== 'ready';
    if (U.state === 'ready') $('#updText').textContent = T.updReady(U.version);
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
    $$('#swatches button').forEach((b) => {
      b.setAttribute('aria-checked', String(b.dataset.style === r.style));
      b.disabled = expiredPaid && b.dataset.style !== 'klasik';
    });
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
  $$('#swatches button').forEach((b) => b.addEventListener('click', () => dc.rug('style', b.dataset.style)));
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

  dc.onState((s) => {
    const first = !st;
    st = s;
    if (first || s.lang !== lang) { lang = I18N.LANGS[s.lang] ? s.lang : 'en'; T = I18N.strings(lang); applyStrings(); buildLangSelect(); window.__t_trial_used = T.reasons.trial_used; }
    render();
  });
  dc.ready();
})();
