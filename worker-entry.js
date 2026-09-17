// Cloudflare rebuild trigger after D1 bootstrap hardening.
import app from './datafast-worker.js';

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

  if (response.status >= 500 && (new URL(request.url)).pathname.startsWith('/api/')) {
    try {
      const data = await response.clone().json();
      if (data && data.error === 'Server error.' && data.detail) {
        return json({ error: data.detail, detail: data.detail }, response.status);
      }
    } catch {}
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
