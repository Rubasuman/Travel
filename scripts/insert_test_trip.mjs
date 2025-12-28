import fs from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

async function loadEnv(envPath) {
  const text = await fs.readFile(envPath, 'utf8');
  const lines = text.split(/\r?\n/);
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    env[key] = val;
  }
  return env;
}

async function run() {
  try {
  const repoRoot = process.cwd();
  const clientEnvPath = path.join(repoRoot, 'client', '.env');
    const env = await loadEnv(clientEnvPath);

    const supabaseUrl = env.SUPABASE_URL || env.VITE_SUPABASE_URL || env.SUPABASE_URL;
    const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_KEY || env.SUPABASE_SERVICE_ROLE;

    if (!supabaseUrl || !serviceKey) {
      console.error('Supabase URL or service role key not found in client/.env');
      process.exit(1);
    }

    console.log('Using Supabase URL:', supabaseUrl);

    const sb = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

    console.log('Upserting test user...');
    const testUid = `script-test-uid-${Date.now()}`;
    const { data: userData, error: userErr } = await sb.from('users').upsert([{ uid: testUid, username: 'scriptuser', email: `${testUid}@example.com` }], { onConflict: 'uid' }).select();
    if (userErr) {
      console.error('Upsert user error:', userErr);
      process.exit(1);
    }
    const user = Array.isArray(userData) ? userData[0] : userData;
    console.log('User upserted:', user);

    console.log('Inserting test destination...');
    const { data: destData, error: destErr } = await sb.from('destinations').insert([{ name: `Script Destination ${Date.now()}`, country: 'Testland', city: 'ScriptCity' }]).select();
    if (destErr) {
      console.error('Insert destination error:', destErr);
      process.exit(1);
    }
    const dest = Array.isArray(destData) ? destData[0] : destData;
    console.log('Destination inserted:', dest);

    console.log('Inserting test trip...');
    const now = new Date();
    const tripPayload = {
      user_id: user.id,
      destination_id: dest.id,
      title: `Scripted Trip ${now.toISOString()}`,
      start_date: now.toISOString(),
      end_date: new Date(now.getTime() + 3 * 24 * 3600 * 1000).toISOString(),
      description: 'Inserted from script',
    };

    const { data: tripData, error: tripErr } = await sb.from('trips').insert([tripPayload]).select();
    if (tripErr) {
      console.error('Insert trip error:', tripErr);
      process.exit(1);
    }
    const trip = Array.isArray(tripData) ? tripData[0] : tripData;
    console.log('Trip inserted:', trip);

    console.log('Done. Check Supabase Table Editor for public.trips');
    process.exit(0);
  } catch (err) {
    console.error('Unexpected error in script:', err);
    process.exit(1);
  }
}

run();
