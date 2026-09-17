const DATAFAST_SCRIPT = '<script defer data-website-id="dfid_ILGOJScmwXB3t7WkgO5vt" data-domain="laptop.atushhhh6.workers.dev" src="https://datafa.st/js/script.js"></script>';

const SPOT_CONFIG = [
  { id: 'title', name: 'Top Sponsor', startCents: 35000 },
  ...['a', 'b', 'c', 'd'].flatMap((side) => [1, 2, 3, 4].map((n) => ({
    id: 'side-' + side + '-' + n,
    name: 'Side ' + side.toUpperCase() + ' · Spot ' + n,
    startCents: 10000,
  }))),
  { id: 'bottom', name: 'Bottom Sponsor', startCents: 20000 },
];

const SPOT_MAP = new Map(SPOT_CONFIG.map((spot) => [spot.id, spot]));
let schemaPromise;

const ENHANCEMENTS = `<style>
  .sponsorList.sponsorWallReady {
    position: relative !important;
    display: block !important;
    min-height: 610px !important;
    margin-top: 38px !important;
    overflow: hidden !important;
    border: 1px solid rgba(23,23,23,.13) !important;
    border-radius: 34px !important;
    background:
      radial-gradient(circle at 18% 18%, rgba(255,255,255,.72), transparent 28%),
      radial-gradient(circle at 82% 70%, rgba(210,170,114,.16), transparent 32%),
      linear-gradient(135deg, rgba(255,255,255,.46), rgba(255,255,255,.20)) !important;
    box-shadow: inset 0 0 70px rgba(126,89,45,.045) !important;
  }
  .sponsorList.sponsorWallReady::after {
    content: "CLICK A LOGO TO OPEN ITS PROFILE";
    position: absolute;
    left: 22px;
    bottom: 17px;
    font-size: 10px;
    letter-spacing: 1.4px;
    font-weight: 900;
    color: rgba(23,23,23,.42);
    pointer-events: none;
  }
  .sponsorList.sponsorWallReady .sponsorCard {
    --r: 0deg;
    --s: 1;
    position: absolute !important;
    left: var(--x) !important;
    top: var(--y) !important;
    width: 104px !important;
    height: 104px !important;
    display: block !important;
    padding: 0 !important;
    margin: 0 !important;
    border: 0 !important;
    border-radius: 23px !important;
    background: transparent !important;
    box-shadow: 0 15px 28px rgba(61,42,21,.18) !important;
    transform: rotate(var(--r)) scale(var(--s)) !important;
    transform-origin: center !important;
    cursor: pointer !important;
    overflow: visible !important;
    z-index: 2;
    transition: transform .18s ease, filter .18s ease, z-index 0s !important;
  }
  .sponsorList.sponsorWallReady .sponsorCard::before {
    content: "";
    position: absolute;
    z-index: 4;
    left: 50%;
    top: -8px;
    width: 42px;
    height: 16px;
    transform: translateX(-50%) rotate(-2deg);
    border-radius: 3px;
    background: rgba(239,224,193,.82);
    border: 1px solid rgba(112,87,54,.12);
    box-shadow: 0 2px 5px rgba(0,0,0,.05);
    pointer-events: none;
  }
  .sponsorList.sponsorWallReady .sponsorCard:hover {
    transform: rotate(var(--r)) scale(calc(var(--s) + .10)) translateY(-4px) !important;
    filter: brightness(1.03);
    z-index: 8;
  }
  .sponsorList.sponsorWallReady .sponsorCard > div:not(.avatar) { display: none !important; }
  .sponsorList.sponsorWallReady .sponsorCard .avatar {
    width: 100% !important;
    height: 100% !important;
    min-width: 100% !important;
    border-radius: 23px !important;
    overflow: hidden !important;
    background: #fff !important;
    border: 2px solid rgba(255,255,255,.92) !important;
    box-shadow: inset 0 0 0 1px rgba(23,23,23,.05) !important;
  }
  .sponsorList.sponsorWallReady .sponsorCard .avatar img {
    width: 100% !important;
    height: 100% !important;
    display: block !important;
    object-fit: cover !important;
    border-radius: 20px !important;
  }
  .sponsorList.sponsorWallReady .sponsorCard[data-wall-tier="top"] { z-index: 5; }
  .sponsorList.sponsorWallReady .sponsorCard[data-wall-tier="bottom"] { z-index: 4; }
  .birthdayPaymentToast {
    position: fixed;
    left: 50%;
    top: 22px;
    transform: translateX(-50%);
    z-index: 9999;
    width: min(92vw, 560px);
    padding: 14px 17px;
    border-radius: 16px;
    background: #171717;
    color: #fff;
    box-shadow: 0 18px 55px rgba(0,0,0,.25);
    font: 800 14px/1.45 Inter, ui-sans-serif, system-ui, sans-serif;
    text-align: center;
  }
  .birthdayPaymentToast[data-kind="error"] { background: #5b1512; }
  .birthdayPaymentToast[data-kind="success"] { background: #153d24; }
  @media (max-width: 760px) {
    .sponsorList.sponsorWallReady {
      min-height: auto !important;
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
      gap: 28px 12px !important;
      padding: 38px 18px 66px !important;
    }
    .sponsorList.sponsorWallReady .sponsorCard {
      position: relative !important;
      left: auto !important;
      top: auto !important;
      width: 88px !important;
      height: 88px !important;
      justify-self: center !important;
      transform: rotate(var(--r)) scale(var(--s)) !important;
    }
    .sponsorList.sponsorWallReady .sponsorCard:hover {
      transform: rotate(var(--r)) scale(calc(var(--s) + .08)) translateY(-3px) !important;
    }
  }
</style>
<script>
(function () {
  const wallPositions = [
    [6,12,-8],[24,6,5],[42,17,-4],[60,8,7],[78,16,-6],
    [12,40,6],[30,33,-8],[48,43,4],[66,35,-3],[82,45,7],
    [5,68,-5],[22,61,8],[39,73,-7],[56,64,5],[73,70,-4],
    [84,76,6],[32,84,3],[61,84,-6]
  ];

  function showToast(message, kind) {
    let toast = document.querySelector('.birthdayPaymentToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'birthdayPaymentToast';
      document.body.appendChild(toast);
    }
    toast.dataset.kind = kind || 'info';
    toast.textContent = message;
    return toast;
  }

  function linkSponsorX() {
    const profileBy = document.getElementById('profileBy');
    if (!profileBy) return;
    const bold = profileBy.querySelector('b');
    if (!bold || bold.querySelector('a')) return;
    const handleText = (bold.textContent || '').trim();
    if (!/^@[A-Za-z0-9_]{1,15}$/.test(handleText)) return;
    const link = document.createElement('a');
    link.href = 'https://x.com/' + encodeURIComponent(handleText.slice(1));
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = handleText;
    link.style.color = '#fff';
    link.style.fontWeight = '700';
    link.style.textDecoration = 'underline';
    link.style.textDecorationColor = 'rgba(255,255,255,.35)';
    link.style.textUnderlineOffset = '3px';
    bold.textContent = '';
    bold.appendChild(link);
  }

  function layoutSponsorWall() {
    const wall = document.getElementById('sponsorList');
    if (!wall) return;
    const cards = Array.from(wall.querySelectorAll('.sponsorCard'));
    const sponsorCards = cards.filter(function (card) { return card.querySelector('.avatar'); });
    wall.classList.toggle('sponsorWallReady', sponsorCards.length > 0);
    if (!sponsorCards.length) return;

    sponsorCards.forEach(function (card, i) {
      const p = wallPositions[i % wallPositions.length];
      const hiddenText = card.querySelector('div:not(.avatar)');
      const label = (hiddenText && hiddenText.textContent ? hiddenText.textContent : '').toLowerCase();
      const isTop = label.indexOf('top sponsor') !== -1;
      const isBottom = label.indexOf('bottom sponsor') !== -1;
      const scale = isTop ? 1.42 : (isBottom ? 1.24 : 1.00);
      const tier = isTop ? 'top' : (isBottom ? 'bottom' : 'regular');

      card.style.setProperty('--x', p[0] + '%');
      card.style.setProperty('--y', p[1] + '%');
      card.style.setProperty('--r', p[2] + 'deg');
      card.style.setProperty('--s', String(scale));
      card.dataset.wallTier = tier;

      const img = card.querySelector('.avatar img');
      if (img) {
        const title = hiddenText && hiddenText.querySelector('strong');
        img.alt = title ? title.textContent : 'Sponsor logo';
      }
      card.setAttribute('aria-label', ((hiddenText && hiddenText.textContent) || 'Open sponsor profile').trim());
    });
  }

  async function refreshSponsorState() {
    if (typeof state === 'undefined' || typeof config === 'undefined' || typeof render !== 'function') return;
    try {
      const response = await fetch('/api/sponsors', { cache: 'no-store' });
      if (!response.ok) return;
      const data = await response.json();
      const remoteMap = new Map((data.slots || []).map(function (slot) { return [slot.id, slot]; }));

      config.forEach(function (cfg) {
        const localSlot = state.slots[cfg.id];
        if (!localSlot) return;
        const remote = remoteMap.get(cfg.id);
        if (remote) {
          localSlot.sponsor = remote.sponsor;
          localSlot.currentPrice = remote.currentPrice;
          localSlot.views = remote.views || 0;
          if (remote.sponsor && remote.sponsor.ownerId === MYID) {
            state.myProfile = {
              name: remote.sponsor.name || '',
              description: remote.sponsor.description || '',
              website: remote.sponsor.website || '',
              twitter: remote.sponsor.twitter || '',
              logo: remote.sponsor.logo || ''
            };
          }
        } else {
          localSlot.sponsor = null;
          localSlot.currentPrice = 0;
          localSlot.views = 0;
        }
      });
      state.activity = data.activity || [];
      if (typeof save === 'function') save();
      render();
      layoutSponsorWall();
    } catch (error) {
      console.error('Sponsor sync failed', error);
    }
  }

  async function createCheckout() {
    if (typeof selected === 'undefined' || !selected) return;
    const s = state.slots[selected];
    if (!s) return;

    const nameEl = document.getElementById('brandName');
    const descEl = document.getElementById('brandDescription');
    const websiteEl = document.getElementById('brandWebsite');
    const twitterEl = document.getElementById('brandTwitter');
    const bidEl = document.getElementById('sponsorBid');
    const button = document.getElementById('payButton');

    const name = (nameEl.value || '').trim();
    const description = (descEl.value || '').trim();
    const website = typeof norm === 'function' ? norm(websiteEl.value || '') : (websiteEl.value || '').trim();
    const twitter = (twitterEl.value || '').trim();
    const amount = Number(bidEl.value);
    const min = typeof required === 'function' ? required(s) : 0;

    if (!name) return alert('Enter your brand name.');
    if (!pendingLogo) return alert('Upload and crop your logo first.');
    if (!Number.isFinite(amount) || amount < min) return alert('This spot requires at least $' + min + '.');

    const oldText = button.textContent;
    button.disabled = true;
    button.textContent = 'OPENING SECURE CHECKOUT…';

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spotId: selected,
          amount: amount,
          ownerId: MYID,
          sponsor: {
            name: name,
            description: description,
            website: website,
            twitter: twitter,
            logo: pendingLogo
          }
        })
      });
      const data = await response.json();
      if (!response.ok || !data.checkout_url) {
        throw new Error(data.error || data.detail || 'Could not create checkout.');
      }
      localStorage.setItem('birthdayPendingPayment', data.pending_id || '');
      window.location.href = data.checkout_url;
    } catch (error) {
      alert(error.message || 'Could not create checkout.');
      button.disabled = false;
      button.textContent = oldText;
    }
  }

  async function saveProfileToServer() {
    const name = (document.getElementById('editName').value || '').trim();
    if (!name) return alert('Enter your brand name.');
    const profile = {
      name: name,
      description: (document.getElementById('editDescription').value || '').trim(),
      website: typeof norm === 'function' ? norm(document.getElementById('editWebsite').value || '') : (document.getElementById('editWebsite').value || '').trim(),
      twitter: (document.getElementById('editTwitter').value || '').trim(),
      logo: editPendingLogo || (state.myProfile && state.myProfile.logo) || ''
    };

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ownerId: MYID, profile: profile })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not update profile.');
      state.myProfile = profile;
      if (typeof closeEdit === 'function') closeEdit();
      await refreshSponsorState();
    } catch (error) {
      alert(error.message || 'Could not update profile.');
    }
  }

  async function settleReturnedPayment() {
    const params = new URLSearchParams(location.search);
    if (params.get('dodo_return') !== '1') return;
    const pendingId = params.get('pending_id') || localStorage.getItem('birthdayPendingPayment') || '';
    const paymentId = params.get('payment_id') || '';
    const returnStatus = (params.get('status') || '').toLowerCase();

    if (!pendingId) return;
    if (returnStatus === 'failed' || returnStatus === 'cancelled') {
      showToast('Payment was not completed. Your sponsor spot was not changed.', 'error');
      return;
    }

    showToast('Verifying payment… your spot will appear after confirmation.', 'info');

    for (let attempt = 0; attempt < 12; attempt++) {
      try {
        let data = null;
        if (paymentId) {
          const verifyResponse = await fetch('/api/payment-status?pending_id=' + encodeURIComponent(pendingId) + '&payment_id=' + encodeURIComponent(paymentId), { cache: 'no-store' });
          data = await verifyResponse.json();
          if (data.status === 'paid') {
            await refreshSponsorState();
            localStorage.removeItem('birthdayPendingPayment');
            showToast('Payment verified — your sponsor spot is live.', 'success');
            history.replaceState({}, '', location.pathname);
            return;
          }
          if (data.status === 'conflict') {
            showToast('Payment succeeded, but this spot changed while checkout was open. Contact Ayush for resolution/refund.', 'error');
            return;
          }
        }

        const pendingResponse = await fetch('/api/pending-status?pending_id=' + encodeURIComponent(pendingId), { cache: 'no-store' });
        const pending = await pendingResponse.json();
        if (pending.status === 'paid') {
          await refreshSponsorState();
          localStorage.removeItem('birthdayPendingPayment');
          showToast('Payment verified — your sponsor spot is live.', 'success');
          history.replaceState({}, '', location.pathname);
          return;
        }
        if (pending.status === 'conflict') {
          showToast('Payment succeeded, but this spot changed while checkout was open. Contact Ayush for resolution/refund.', 'error');
          return;
        }
      } catch (error) {
        console.error(error);
      }
      await new Promise(function (resolve) { setTimeout(resolve, 1800); });
    }

    showToast('Payment is still being confirmed. Refresh this page in a moment.', 'info');
  }

  function hideDemoAdmin() {
    document.querySelectorAll('section').forEach(function (section) {
      const eyebrow = section.querySelector('.eyebrow');
      if (eyebrow && eyebrow.textContent.trim() === 'DEMO ADMIN') section.style.display = 'none';
    });
    const warning = document.querySelector('.claimView .warning');
    if (warning) warning.textContent = 'TEST MODE: payment is handled by Dodo Payments. A sponsor only goes live after the payment is verified.';
    const test = document.querySelector('.claimView .test');
    if (test) test.textContent = 'DODO PAYMENTS · TEST MODE';
  }

  function startEnhancements() {
    if (typeof window.claimSlot === 'function') window.claimSlot = createCheckout;
    if (typeof window.saveProfileEdit === 'function') window.saveProfileEdit = saveProfileToServer;

    if (typeof window.openSlot === 'function') {
      const originalOpenSlot = window.openSlot;
      window.openSlot = function (id) {
        const hadSponsor = typeof state !== 'undefined' && state.slots && state.slots[id] && state.slots[id].sponsor;
        originalOpenSlot(id);
        if (hadSponsor) {
          fetch('/api/view', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ spotId: id })
          }).catch(function () {});
        }
      };
    }

    hideDemoAdmin();
    linkSponsorX();
    layoutSponsorWall();
    refreshSponsorState();
    settleReturnedPayment();

    const bodyObserver = new MutationObserver(function () {
      linkSponsorX();
      layoutSponsorWall();
    });
    bodyObserver.observe(document.body, { childList: true, subtree: true, characterData: true });

    setInterval(refreshSponsorState, 15000);
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) refreshSponsorState();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startEnhancements);
  } else {
    startEnhancements();
  }
})();
</script>`;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function safeText(value, max = 500) {
  return String(value ?? '').trim().slice(0, max);
}

function getDodoBase(env) {
  const mode = String(env.DODO_PAYMENTS_ENVIRONMENT || 'test').toLowerCase();
  return mode.startsWith('live') ? 'https://live.dodopayments.com' : 'https://test.dodopayments.com';
}

function getCookie(request, name) {
  const cookie = request.headers.get('Cookie') || '';
  for (const part of cookie.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    if (key === name) return decodeURIComponent(part.slice(idx + 1).trim());
  }
  return '';
}

async function ensureSchema(env) {
  if (!env.DB) throw new Error('D1 binding DB is missing.');
  if (!schemaPromise) {
    schemaPromise = env.DB.exec(`
      CREATE TABLE IF NOT EXISTS sponsor_spots_v2 (
        spot_id TEXT PRIMARY KEY,
        sponsor_name TEXT NOT NULL,
        description TEXT NOT NULL DEFAULT '',
        website TEXT NOT NULL DEFAULT '',
        twitter TEXT NOT NULL DEFAULT '',
        logo TEXT NOT NULL DEFAULT '',
        amount_cents INTEGER NOT NULL DEFAULT 0,
        views INTEGER NOT NULL DEFAULT 0,
        owner_id TEXT NOT NULL DEFAULT '',
        payment_id TEXT,
        checkout_session_id TEXT,
        updated_at INTEGER NOT NULL
      );
      CREATE TABLE IF NOT EXISTS pending_payments_v2 (
        id TEXT PRIMARY KEY,
        spot_id TEXT NOT NULL,
        sponsor_name TEXT NOT NULL,
        description TEXT NOT NULL DEFAULT '',
        website TEXT NOT NULL DEFAULT '',
        twitter TEXT NOT NULL DEFAULT '',
        logo TEXT NOT NULL DEFAULT '',
        amount_cents INTEGER NOT NULL,
        owner_id TEXT NOT NULL DEFAULT '',
        previous_payment_id TEXT,
        previous_amount_cents INTEGER NOT NULL DEFAULT 0,
        checkout_session_id TEXT,
        payment_id TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        error TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );
      CREATE TABLE IF NOT EXISTS sponsor_activity_v2 (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        amount_cents INTEGER NOT NULL,
        replaced_amount_cents INTEGER NOT NULL DEFAULT 0,
        created_at INTEGER NOT NULL
      );
      CREATE TABLE IF NOT EXISTS webhook_events_v2 (
        webhook_id TEXT PRIMARY KEY,
        processed_at INTEGER NOT NULL
      );
    `).catch((error) => {
      schemaPromise = undefined;
      throw error;
    });
  }
  return schemaPromise;
}

async function dodoFetch(env, path, options = {}) {
  if (!env.DODO_PAYMENTS_API_KEY) throw new Error('DODO_PAYMENTS_API_KEY is not configured.');
  const headers = new Headers(options.headers || {});
  headers.set('Authorization', 'Bearer ' + env.DODO_PAYMENTS_API_KEY);
  if (options.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  return fetch(getDodoBase(env) + path, { ...options, headers });
}

async function getSponsors(env) {
  await ensureSchema(env);
  const [slotsResult, activityResult] = await Promise.all([
    env.DB.prepare('SELECT * FROM sponsor_spots_v2 ORDER BY updated_at DESC').all(),
    env.DB.prepare('SELECT text, amount_cents, replaced_amount_cents, created_at FROM sponsor_activity_v2 ORDER BY id DESC LIMIT 25').all(),
  ]);

  const slots = (slotsResult.results || []).map((row) => ({
    id: row.spot_id,
    currentPrice: Number(row.amount_cents || 0) / 100,
    views: Number(row.views || 0),
    sponsor: {
      ownerId: row.owner_id || '',
      name: row.sponsor_name || '',
      description: row.description || '',
      website: row.website || '',
      twitter: row.twitter || '',
      logo: row.logo || '',
    },
  }));

  const activity = (activityResult.results || []).map((row) => ({
    text: row.text,
    amount: Number(row.amount_cents || 0) / 100,
    replacedAmount: Number(row.replaced_amount_cents || 0) / 100,
    time: Number(row.created_at || 0),
  }));

  return json({ slots, activity });
}

async function createCheckout(request, env) {
  await ensureSchema(env);
  if (!env.DODO_PRODUCT_ID) return json({ error: 'DODO_PRODUCT_ID is not configured in Cloudflare.' }, 500);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  const spotId = safeText(body.spotId, 64);
  const spotConfig = SPOT_MAP.get(spotId);
  if (!spotConfig) return json({ error: 'Unknown sponsor spot.' }, 400);

  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount <= 0) return json({ error: 'Invalid sponsor amount.' }, 400);
  const amountCents = Math.round(amount * 100);

  const sponsor = body.sponsor || {};
  const sponsorName = safeText(sponsor.name, 80);
  const description = safeText(sponsor.description, 240);
  const website = safeText(sponsor.website, 500);
  const twitter = safeText(sponsor.twitter, 60);
  const logo = safeText(sponsor.logo, 1500000);
  const ownerId = safeText(body.ownerId, 120);

  if (!sponsorName) return json({ error: 'Brand/name is required.' }, 400);
  if (!ownerId) return json({ error: 'Browser owner ID is missing. Refresh and try again.' }, 400);
  if (!/^data:image\/(png|jpeg|webp);base64,/i.test(logo)) return json({ error: 'A cropped PNG, JPG, or WebP logo is required.' }, 400);

  const current = await env.DB.prepare('SELECT * FROM sponsor_spots_v2 WHERE spot_id = ?').bind(spotId).first();
  const currentAmount = Number(current?.amount_cents || 0);
  const minimum = currentAmount > 0 ? currentAmount * 2 : spotConfig.startCents;
  if (amountCents < minimum) {
    return json({ error: 'This spot now requires at least $' + (minimum / 100).toLocaleString('en-US') + '.' }, 409);
  }

  const pendingId = crypto.randomUUID();
  const now = Date.now();
  await env.DB.prepare(`
    INSERT INTO pending_payments_v2
    (id, spot_id, sponsor_name, description, website, twitter, logo, amount_cents, owner_id, previous_payment_id, previous_amount_cents, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)
  `).bind(
    pendingId,
    spotId,
    sponsorName,
    description,
    website,
    twitter,
    logo,
    amountCents,
    ownerId,
    current?.payment_id || null,
    currentAmount,
    now,
    now,
  ).run();

  const visitorId = safeText(getCookie(request, 'datafast_visitor_id'), 200);
  const origin = new URL(request.url).origin;
  const returnUrl = origin + '/?dodo_return=1&pending_id=' + encodeURIComponent(pendingId);
  const metadata = {
    pending_id: pendingId,
    spot_id: spotId,
    owner_id: ownerId,
  };
  if (visitorId) metadata.datafast_visitor_id = visitorId;

  let dodoResponse;
  try {
    dodoResponse = await dodoFetch(env, '/checkouts', {
      method: 'POST',
      body: JSON.stringify({
        product_cart: [{
          product_id: env.DODO_PRODUCT_ID,
          quantity: 1,
          amount: amountCents,
        }],
        return_url: returnUrl,
        minimal_address: true,
        metadata,
      }),
    });
  } catch (error) {
    await env.DB.prepare("UPDATE pending_payments_v2 SET status = 'failed', error = ?, updated_at = ? WHERE id = ?")
      .bind(String(error.message || error), Date.now(), pendingId).run();
    return json({ error: 'Could not reach Dodo Payments.', detail: String(error.message || error) }, 502);
  }

  const raw = await dodoResponse.text();
  let data = {};
  try { data = JSON.parse(raw); } catch { data = {}; }

  if (!dodoResponse.ok || !data.checkout_url) {
    await env.DB.prepare("UPDATE pending_payments_v2 SET status = 'failed', error = ?, updated_at = ? WHERE id = ?")
      .bind(raw.slice(0, 1000), Date.now(), pendingId).run();
    return json({ error: 'Dodo Payments rejected the checkout.', detail: raw.slice(0, 700) }, 502);
  }

  await env.DB.prepare('UPDATE pending_payments_v2 SET checkout_session_id = ?, updated_at = ? WHERE id = ?')
    .bind(data.session_id || null, Date.now(), pendingId).run();

  return json({ checkout_url: data.checkout_url, session_id: data.session_id, pending_id: pendingId });
}

async function finalizePayment(env, pendingId, payment) {
  await ensureSchema(env);
  const pending = await env.DB.prepare('SELECT * FROM pending_payments_v2 WHERE id = ?').bind(pendingId).first();
  if (!pending) return { status: 'missing' };
  if (pending.status === 'paid') return { status: 'paid', spotId: pending.spot_id };
  if (pending.status === 'conflict') return { status: 'conflict', spotId: pending.spot_id };

  if (!payment || payment.status !== 'succeeded') return { status: payment?.status || 'pending' };
  const metadata = payment.metadata || {};
  if (String(metadata.pending_id || '') !== String(pendingId)) return { status: 'mismatch' };
  if (String(metadata.spot_id || '') !== String(pending.spot_id)) return { status: 'mismatch' };

  const current = await env.DB.prepare('SELECT * FROM sponsor_spots_v2 WHERE spot_id = ?').bind(pending.spot_id).first();
  const currentPaymentId = current?.payment_id || null;
  const expectedPaymentId = pending.previous_payment_id || null;
  const currentAmount = Number(current?.amount_cents || 0);
  const expectedAmount = Number(pending.previous_amount_cents || 0);
  const spotConfig = SPOT_MAP.get(pending.spot_id);
  const minimumNow = currentAmount > 0 ? currentAmount * 2 : spotConfig.startCents;

  if (currentPaymentId !== expectedPaymentId || currentAmount !== expectedAmount || Number(pending.amount_cents) < minimumNow) {
    await env.DB.prepare("UPDATE pending_payments_v2 SET status = 'conflict', payment_id = ?, error = ?, updated_at = ? WHERE id = ?")
      .bind(payment.payment_id || null, 'Spot changed while checkout was open.', Date.now(), pendingId).run();
    return { status: 'conflict', spotId: pending.spot_id };
  }

  const now = Date.now();
  await env.DB.prepare(`
    INSERT INTO sponsor_spots_v2
    (spot_id, sponsor_name, description, website, twitter, logo, amount_cents, views, owner_id, payment_id, checkout_session_id, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?)
    ON CONFLICT(spot_id) DO UPDATE SET
      sponsor_name = excluded.sponsor_name,
      description = excluded.description,
      website = excluded.website,
      twitter = excluded.twitter,
      logo = excluded.logo,
      amount_cents = excluded.amount_cents,
      views = 0,
      owner_id = excluded.owner_id,
      payment_id = excluded.payment_id,
      checkout_session_id = excluded.checkout_session_id,
      updated_at = excluded.updated_at
  `).bind(
    pending.spot_id,
    pending.sponsor_name,
    pending.description || '',
    pending.website || '',
    pending.twitter || '',
    pending.logo || '',
    Number(pending.amount_cents),
    pending.owner_id || '',
    payment.payment_id || null,
    pending.checkout_session_id || payment.checkout_session_id || null,
    now,
  ).run();

  const displayName = SPOT_MAP.get(pending.spot_id)?.name || pending.spot_id;
  const activityText = current
    ? pending.sponsor_name + ' took over ' + displayName + ' from ' + current.sponsor_name
    : pending.sponsor_name + ' claimed ' + displayName;

  await env.DB.prepare('INSERT INTO sponsor_activity_v2 (text, amount_cents, replaced_amount_cents, created_at) VALUES (?, ?, ?, ?)')
    .bind(activityText, Number(pending.amount_cents), Number(current?.amount_cents || 0), now).run();

  await env.DB.prepare("UPDATE pending_payments_v2 SET status = 'paid', payment_id = ?, updated_at = ? WHERE id = ?")
    .bind(payment.payment_id || null, now, pendingId).run();

  return { status: 'paid', spotId: pending.spot_id };
}

async function verifyPaymentReturn(request, env) {
  await ensureSchema(env);
  const url = new URL(request.url);
  const pendingId = safeText(url.searchParams.get('pending_id'), 100);
  const paymentId = safeText(url.searchParams.get('payment_id'), 160);
  if (!pendingId || !paymentId) return json({ status: 'pending', error: 'Missing payment verification IDs.' }, 400);

  const response = await dodoFetch(env, '/payments/' + encodeURIComponent(paymentId), { method: 'GET' });
  const raw = await response.text();
  let payment;
  try { payment = JSON.parse(raw); } catch { payment = null; }
  if (!response.ok || !payment) return json({ status: 'pending', error: 'Payment is not available yet.' }, 202);

  const result = await finalizePayment(env, pendingId, payment);
  return json(result, result.status === 'mismatch' ? 409 : 200);
}

async function pendingStatus(request, env) {
  await ensureSchema(env);
  const pendingId = safeText(new URL(request.url).searchParams.get('pending_id'), 100);
  if (!pendingId) return json({ status: 'missing' }, 400);
  const row = await env.DB.prepare('SELECT status, spot_id, error FROM pending_payments_v2 WHERE id = ?').bind(pendingId).first();
  if (!row) return json({ status: 'missing' }, 404);
  return json({ status: row.status, spotId: row.spot_id, error: row.error || '' });
}

async function incrementView(request, env) {
  await ensureSchema(env);
  let body = {};
  try { body = await request.json(); } catch {}
  const spotId = safeText(body.spotId, 64);
  if (!SPOT_MAP.has(spotId)) return json({ ok: false }, 400);
  await env.DB.prepare('UPDATE sponsor_spots_v2 SET views = views + 1 WHERE spot_id = ?').bind(spotId).run();
  return json({ ok: true });
}

async function updateProfile(request, env) {
  await ensureSchema(env);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid request body.' }, 400); }
  const ownerId = safeText(body.ownerId, 120);
  const profile = body.profile || {};
  const name = safeText(profile.name, 80);
  const description = safeText(profile.description, 240);
  const website = safeText(profile.website, 500);
  const twitter = safeText(profile.twitter, 60);
  const logo = safeText(profile.logo, 1500000);
  if (!ownerId || !name) return json({ error: 'Owner ID and brand name are required.' }, 400);
  if (logo && !/^data:image\/(png|jpeg|webp);base64,/i.test(logo)) return json({ error: 'Invalid logo.' }, 400);

  const result = await env.DB.prepare(`
    UPDATE sponsor_spots_v2
    SET sponsor_name = ?, description = ?, website = ?, twitter = ?, logo = ?, updated_at = ?
    WHERE owner_id = ?
  `).bind(name, description, website, twitter, logo, Date.now(), ownerId).run();

  return json({ ok: true, updated: Number(result.meta?.changes || 0) });
}

function base64Bytes(value) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function constantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function verifyWebhookSignature(rawBody, request, secret) {
  const id = request.headers.get('webhook-id') || '';
  const timestamp = request.headers.get('webhook-timestamp') || '';
  const signatureHeader = request.headers.get('webhook-signature') || '';
  if (!id || !timestamp || !signatureHeader || !secret) return false;

  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(Date.now() / 1000 - ts) > 300) return false;

  const encodedSecret = secret.startsWith('whsec_') ? secret.slice(6) : secret;
  let keyBytes;
  try { keyBytes = base64Bytes(encodedSecret); } catch { return false; }
  const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signed = new TextEncoder().encode(id + '.' + timestamp + '.' + rawBody);
  const expected = new Uint8Array(await crypto.subtle.sign('HMAC', key, signed));

  for (const token of signatureHeader.split(' ')) {
    const parts = token.split(',');
    if (parts.length !== 2 || parts[0] !== 'v1') continue;
    try {
      const actual = base64Bytes(parts[1]);
      if (constantTimeEqual(expected, actual)) return true;
    } catch {}
  }
  return false;
}

async function handleWebhook(request, env) {
  await ensureSchema(env);
  const secret = env.DODO_PAYMENTS_WEBHOOK_KEY || env.DODO_WEBHOOK_SECRET || '';
  if (!secret) return json({ error: 'Webhook secret is not configured yet.' }, 503);

  const rawBody = await request.text();
  const verified = await verifyWebhookSignature(rawBody, request, secret);
  if (!verified) return json({ error: 'Invalid webhook signature.' }, 401);

  const webhookId = request.headers.get('webhook-id') || '';
  if (webhookId) {
    const existing = await env.DB.prepare('SELECT webhook_id FROM webhook_events_v2 WHERE webhook_id = ?').bind(webhookId).first();
    if (existing) return json({ received: true, duplicate: true });
  }

  let payload;
  try { payload = JSON.parse(rawBody); } catch { return json({ error: 'Invalid JSON.' }, 400); }

  if (payload.type === 'payment.succeeded') {
    const pendingId = String(payload.data?.metadata?.pending_id || '');
    if (pendingId) await finalizePayment(env, pendingId, payload.data);
  }

  if (webhookId) {
    await env.DB.prepare('INSERT OR IGNORE INTO webhook_events_v2 (webhook_id, processed_at) VALUES (?, ?)')
      .bind(webhookId, Date.now()).run();
  }
  return json({ received: true });
}

async function routeApi(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  if (path === '/api/sponsors' && request.method === 'GET') return getSponsors(env);
  if (path === '/api/checkout' && request.method === 'POST') return createCheckout(request, env);
  if (path === '/api/payment-status' && request.method === 'GET') return verifyPaymentReturn(request, env);
  if (path === '/api/pending-status' && request.method === 'GET') return pendingStatus(request, env);
  if (path === '/api/view' && request.method === 'POST') return incrementView(request, env);
  if (path === '/api/profile' && request.method === 'POST') return updateProfile(request, env);
  if (path === '/api/dodo-webhook' && request.method === 'POST') return handleWebhook(request, env);
  return json({ error: 'Not found.' }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      try {
        return await routeApi(request, env);
      } catch (error) {
        console.error(error);
        return json({ error: 'Server error.', detail: String(error.message || error) }, 500);
      }
    }

    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) return response;

    return new HTMLRewriter()
      .on('head', {
        element(head) {
          head.append(DATAFAST_SCRIPT, { html: true });
          head.append(ENHANCEMENTS, { html: true });
        },
      })
      .transform(response);
  },
};
