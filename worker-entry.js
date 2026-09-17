// Cloudflare rebuild trigger after D1 bootstrap hardening.
import app from './datafast-worker.js';

const DATAFAST_WIDGET = `
<style>
  .datafastLiveWidget {
    position: fixed;
    left: 18px;
    bottom: 18px;
    z-index: 9990;
    width: 320px;
    height: 72px;
    border-radius: 18px;
    overflow: hidden;
    background: transparent;
    filter: drop-shadow(0 12px 28px rgba(0,0,0,.20));
    display: block;
    cursor: pointer;
    text-decoration: none;
    transition: transform .18s ease, filter .18s ease;
  }
  .datafastLiveWidget:hover {
    transform: translateY(-2px);
    filter: drop-shadow(0 16px 34px rgba(0,0,0,.24));
  }
  .datafastLiveWidget iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
    background: transparent !important;
    pointer-events: none;
  }
  @media (max-width: 640px) {
    .datafastLiveWidget {
      left: 12px;
      bottom: 12px;
      width: min(290px, calc(100vw - 24px));
      height: 68px;
    }
  }
</style>
<a
  class="datafastLiveWidget"
  href="https://datafa.st/share/6aaac83b36035bb08e146086"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Open public DataFast analytics dashboard"
  title="View live visitors, views, revenue and full analytics"
>
  <iframe
    id="datafastRealtimeWidget"
    src="https://datafa.st/widgets/6aaac83b36035bb08e146086/realtime?mainTextSize=16&primaryColor=%23e78468&liveRefresh=1"
    style="background: transparent !important; border: none; width: 100%; height: 100%;"
    frameborder="0"
    allowtransparency="true"
    title="DataFast Widget"
    loading="eager"
    tabindex="-1"
  ></iframe>
</a>
<script>
(function () {
  var iframe = document.getElementById('datafastRealtimeWidget');
  if (!iframe) return;
  var base = 'https://datafa.st/widgets/6aaac83b36035bb08e146086/realtime?mainTextSize=16&primaryColor=%23e78468';
  function refreshDataFastWidget() {
    if (document.hidden) return;
    iframe.src = base + '&_live=' + Date.now();
  }
  window.setInterval(refreshDataFastWidget, 10000);
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) refreshDataFastWidget();
  });
})();
</script>`;

const HOMEPAGE_HEAD = `
<style>
  .hero .countdown { display: none !important; }
  .birthdayCountdownStable {
    display: grid;
    grid-template-columns: repeat(4, 78px);
    gap: 14px;
    margin-top: 32px;
    align-items: start;
    width: max-content;
    max-width: 100%;
  }
  .birthdayCountdownStable .time {
    width: 78px;
    min-width: 78px;
    text-align: center;
    contain: layout paint;
  }
  .birthdayCountdownStable .time strong {
    display: block;
    width: 78px;
    height: 34px;
    line-height: 34px;
    overflow: hidden;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
    font-size: 30px;
    letter-spacing: 0;
    font-weight: 800;
    font-variant-numeric: tabular-nums lining-nums;
    font-feature-settings: "tnum" 1, "lnum" 1;
    font-synthesis: none;
    white-space: nowrap;
    text-align: center;
    transform: translateZ(0);
    backface-visibility: hidden;
  }
  .birthdayCountdownStable .time span {
    display: block;
    margin-top: 7px;
    font-size: 10px;
    color: var(--muted);
    font-weight: 900;
    letter-spacing: 1.35px;
    white-space: nowrap;
  }
  #birthdayImpactLine {
    max-width: 930px;
    margin-top: 34px;
    padding: 24px 26px;
    border: 1px solid rgba(23,23,23,.13);
    border-left: 5px solid var(--ink);
    border-radius: 0 22px 22px 0;
    background: rgba(255,255,255,.52);
    box-shadow: 0 14px 38px rgba(50,35,16,.05);
  }
  #birthdayImpactLine span {
    display: block;
    margin-bottom: 8px;
    color: var(--muted);
    font-size: 10px;
    font-weight: 950;
    letter-spacing: 1.8px;
  }
  #birthdayImpactLine strong {
    display: block;
    color: var(--ink);
    font-family: "Segoe UI Variable Display", "Aptos Display", Inter, ui-sans-serif, system-ui, sans-serif;
    font-size: clamp(24px, 2.7vw, 38px);
    line-height: 1.12;
    letter-spacing: -1.25px;
    font-weight: 850;
  }
  @media (max-width: 560px) {
    .birthdayCountdownStable {
      grid-template-columns: repeat(4, 62px);
      gap: 7px;
    }
    .birthdayCountdownStable .time,
    .birthdayCountdownStable .time strong { width: 62px; min-width: 62px; }
    .birthdayCountdownStable .time strong { font-size: 26px; }
    #birthdayImpactLine { padding: 19px 19px; margin-top: 28px; }
    #birthdayImpactLine strong { font-size: 24px; }
  }
</style>`;

const HOMEPAGE_PATCH = `
<script>
(function () {
  function byEyebrow(label) {
    return Array.from(document.querySelectorAll('section')).find(function (section) {
      var eyebrow = section.querySelector('.eyebrow');
      return eyebrow && eyebrow.textContent.trim().toUpperCase() === label;
    });
  }

  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', "Sponsor a limited brand placement in Ayush's November 13 birthday project. The sponsored distribution may happen earlier if spots fill and logistics are ready.");

  var heroTag = document.querySelector('.hero .tag');
  if (heroTag) heroTag.textContent = 'NOVEMBER 13 · MY BIRTHDAY';

  var heroLead = document.querySelector('.hero .lead');
  if (heroLead) heroLead.innerHTML = "I'm 17, so this is what I can realistically commit on my own right now: <b>at least 100 burgers</b>. November 13 is my birthday and the reference date, but if all sponsor spots fill early and logistics are ready, the sponsored distribution can happen <b>before my birthday</b>. Sponsors are buying real brand placements and helping back the overall project.";

  var boxSub = document.querySelector('.boxMessage span');
  if (boxSub) boxSub.textContent = 'Take a spot. Back the project. Get seen while doing it.';

  var how = byEyebrow('HOW IT WORKS');
  if (how) {
    var steps = how.querySelectorAll('.step');
    if (steps[4]) {
      var h = steps[4].querySelector('h3');
      var p = steps[4].querySelector('p');
      if (h) h.textContent = 'Back the project';
      if (p) p.textContent = 'Your sponsorship is a paid brand placement that supports the overall project. It can help expand the distribution, while project spending and allocation remain flexible.';
    }
  }

  var birthday = byEyebrow('ON MY BIRTHDAY') || byEyebrow('BIRTHDAY PROJECT · NOVEMBER 13') || byEyebrow('BIRTHDAY PROJECT');
  if (birthday) {
    var eyebrow = birthday.querySelector('.eyebrow');
    var heading = birthday.querySelector('h2');
    var copy = birthday.querySelector('.copy');
    var birthdayWrap = birthday.querySelector('.wrap') || birthday;
    if (eyebrow) eyebrow.textContent = 'BIRTHDAY PROJECT · NOVEMBER 13';
    if (heading) heading.textContent = '100 burgers are the commitment. The project can happen earlier.';
    if (copy) copy.innerHTML = "I'm 17, so <b>100 burgers is what I can realistically commit by myself right now.</b> I'm personally funding at least 100 burgers for this birthday project. November 13 is my birthday, but the sponsored distribution does not have to wait until that exact day. If the sponsor spots fill sooner and the logistics are ready, I may run it earlier. Sponsor payments are for brand placements in the project; they are not restricted donations.";

    var impact = document.getElementById('birthdayImpactLine');
    if (!impact) {
      impact = document.createElement('div');
      impact.id = 'birthdayImpactLine';
      birthdayWrap.appendChild(impact);
    }
    impact.innerHTML = '<span>MORE THAN A PROMO</span><strong>You’re not just promoting your brand here — you’re becoming part of a project that puts a real meal in someone’s hands.</strong>';
  }

  document.querySelectorAll('.faqItem').forEach(function (item) {
    var q = item.querySelector('.faqQ');
    var a = item.querySelector('.faqAInner');
    if (!q || !a) return;
    var text = q.textContent.toLowerCase();
    if (text.indexOf('why start with 100 burgers') !== -1) {
      a.textContent = "I'm 17, and at least 100 burgers are what I can realistically commit to personally right now. Sponsorship can help make the overall project bigger, but I am not promising that every sponsorship dollar will be spent on food.";
    }
    if (text.indexOf('what does sponsorship money support') !== -1) {
      a.textContent = 'A sponsor payment buys an advertising/brand placement in the project. Revenue may be used for food, packaging, printing, transport, payment fees, website/platform costs, promotion, production work, time/labor and other project or business expenses. There is no fixed percentage promised for food, and remaining revenue may be retained as compensation or profit after obligations, refunds, fees and expenses.';
    }
  });

  var transparency = byEyebrow('TRANSPARENCY');
  if (transparency) {
    var transparencyCopy = transparency.querySelector('.copy');
    if (transparencyCopy) transparencyCopy.innerHTML = 'I am 17 and personally commit to <b>at least 100 burgers</b>, which is what I can realistically guarantee on my own right now. Sponsor payments are purchases of advertising/brand placements, not restricted donations. I decide how sponsorship revenue is allocated across food, packaging, printing, transport, payment fees, website/platform costs, promotion, creative/production work, time/labor and other project or business expenses. <b>No fixed amount or percentage of sponsorship revenue is promised for food unless I state it in writing.</b> Revenue remaining after project obligations, refunds, taxes/fees and expenses may be retained as compensation or profit.';
  }

  var oldStable = document.getElementById('birthdayCountdownStable');
  if (oldStable) oldStable.remove();

  var originalCountdown = document.querySelector('.hero .countdown');
  if (originalCountdown) {
    originalCountdown.style.setProperty('display', 'none', 'important');
    originalCountdown.setAttribute('aria-hidden', 'true');

    var stableCountdown = document.createElement('div');
    stableCountdown.className = 'birthdayCountdownStable';
    stableCountdown.id = 'birthdayCountdownStable';
    stableCountdown.setAttribute('aria-label', 'Countdown to November 13 birthday');
    stableCountdown.innerHTML = '<div class="time"><strong id="bdDays">00</strong><span>DAYS</span></div><div class="time"><strong id="bdHours">00</strong><span>HOURS</span></div><div class="time"><strong id="bdMinutes">00</strong><span>MINUTES</span></div><div class="time"><strong id="bdSeconds">00</strong><span>SECONDS</span></div>';
    originalCountdown.insertAdjacentElement('afterend', stableCountdown);
  }

  var target = new Date('2026-11-13T00:00:00+05:30').getTime();
  var lastValues = {};
  function setValue(id, value) {
    var text = String(value).padStart(2, '0');
    if (lastValues[id] === text) return;
    lastValues[id] = text;
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }
  function renderBirthdayCountdown() {
    var left = Math.max(0, target - Date.now());
    setValue('bdDays', Math.floor(left / 86400000));
    setValue('bdHours', Math.floor((left % 86400000) / 3600000));
    setValue('bdMinutes', Math.floor((left % 3600000) / 60000));
    setValue('bdSeconds', Math.floor((left % 60000) / 1000));

    if (left <= 0) return;
    var wait = 1000 - (Date.now() % 1000) + 30;
    window.setTimeout(renderBirthdayCountdown, wait);
  }
  renderBirthdayCountdown();
})();
</script>`;

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS sponsor_spots_v2 (
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
  )`,
  `CREATE TABLE IF NOT EXISTS pending_payments_v2 (
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
  )`,
  `CREATE TABLE IF NOT EXISTS sponsor_activity_v2 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    amount_cents INTEGER NOT NULL,
    replaced_amount_cents INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS webhook_events_v2 (
    webhook_id TEXT PRIMARY KEY,
    processed_at INTEGER NOT NULL
  )`,
];

let bootstrapPromise;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

async function bootstrapDb(env) {
  if (!env.DB) {
    throw new Error('D1 binding DB is missing. Cloudflare must bind birthday-sponsors as DB.');
  }

  if (!bootstrapPromise) {
    bootstrapPromise = (async () => {
      for (const sql of SCHEMA) {
        await env.DB.prepare(sql).run();
      }
      const ping = await env.DB.prepare('SELECT 1 AS ok').first();
      if (!ping || Number(ping.ok) !== 1) throw new Error('D1 database health check failed.');
    })().catch((error) => {
      bootstrapPromise = undefined;
      throw error;
    });
  }

  return bootstrapPromise;
}

function delegatedEnv(env) {
  const db = env.DB;
  const safeDb = db ? {
    prepare: (...args) => db.prepare(...args),
    batch: (...args) => db.batch(...args),
    dump: (...args) => db.dump(...args),
    exec: async () => ({ count: 0, duration: 0 }),
  } : undefined;

  return {
    ASSETS: env.ASSETS,
    DB: safeDb,
    DODO_PAYMENTS_API_KEY: env.DODO_PAYMENTS_API_KEY,
    DODO_PRODUCT_ID: env.DODO_PRODUCT_ID,
    DODO_PAYMENTS_ENVIRONMENT: env.DODO_PAYMENTS_ENVIRONMENT,
    DODO_PAYMENTS_WEBHOOK_KEY: env.DODO_PAYMENTS_WEBHOOK_KEY,
    DODO_WEBHOOK_SECRET: env.DODO_WEBHOOK_SECRET,
  };
}

async function health(env) {
  const result = {
    ok: false,
    db: false,
    dodo_api_key: Boolean(env.DODO_PAYMENTS_API_KEY),
    dodo_product_id: Boolean(env.DODO_PRODUCT_ID),
    environment: String(env.DODO_PAYMENTS_ENVIRONMENT || 'test'),
  };

  try {
    await bootstrapDb(env);
    result.db = true;
  } catch (error) {
    result.error = String(error?.message || error);
    return json(result, 500);
  }

  if (!result.dodo_api_key) {
    result.error = 'DODO_PAYMENTS_API_KEY is missing in Cloudflare Variables and Secrets.';
    return json(result, 500);
  }
  if (!result.dodo_product_id) {
    result.error = 'DODO_PRODUCT_ID is missing in Cloudflare Variables and Secrets.';
    return json(result, 500);
  }

  result.ok = true;
  return json(result);
}

async function delegate(request, env, ctx) {
  const response = await app.fetch(request, delegatedEnv(env), ctx);
  const url = new URL(request.url);

  if (response.status >= 500 && url.pathname.startsWith('/api/')) {
    try {
      const data = await response.clone().json();
      if (data && data.error === 'Server error.' && data.detail) {
        return json({ error: data.detail, detail: data.detail }, response.status);
      }
    } catch {}
  }

  const contentType = response.headers.get('content-type') || '';
  if (!url.pathname.startsWith('/api/') && contentType.includes('text/html')) {
    var isHome = url.pathname === '/' || url.pathname === '/index.html';
    var rewriter = new HTMLRewriter();

    // The site now lives on ayushbirthday.lol. The old tracking script still ships
    // the workers.dev domain, which breaks DataFast's visitor cookie on the custom
    // domain and can collapse realtime users. Rewrite it before it reaches browsers.
    rewriter.on('script[data-website-id="dfid_ILGOJScmwXB3t7WkgO5vt"]', {
      element(script) {
        script.setAttribute('data-domain', 'ayushbirthday.lol');
        script.setAttribute('data-allowed-hostnames', 'ayushbirthday.lol,laptop.atushhhh6.workers.dev');
      },
    });

    if (isHome) {
      rewriter.on('head', {
        element(head) {
          head.append(HOMEPAGE_HEAD, { html: true });
        },
      });
    }
    rewriter.on('body', {
      element(body) {
        body.append(DATAFAST_WIDGET, { html: true });
        if (isHome) body.append(HOMEPAGE_PATCH, { html: true });
      },
    });
    return rewriter.transform(response);
  }

  return response;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/api/health') {
      return health(env);
    }

    if (url.pathname.startsWith('/api/')) {
      try {
        await bootstrapDb(env);

        if (url.pathname === '/api/checkout') {
          if (!env.DODO_PAYMENTS_API_KEY) {
            return json({ error: 'DODO_PAYMENTS_API_KEY is missing in Cloudflare Variables and Secrets.' }, 500);
          }
          if (!env.DODO_PRODUCT_ID) {
            return json({ error: 'DODO_PRODUCT_ID is missing in Cloudflare Variables and Secrets.' }, 500);
          }
        }

        return await delegate(request, env, ctx);
      } catch (error) {
        const message = String(error?.message || error || 'Unknown server error');
        console.error('Birthday sponsor API error:', error);
        return json({ error: message, detail: message }, 500);
      }
    }

    return delegate(request, env, ctx);
  },
};