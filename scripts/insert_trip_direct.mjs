import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://iifihwwcucrxczclhojr.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpZmlod3djdWNyeGN6Y2xob2pyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjAxODA2OCwiZXhwIjoyMDcxNTk0MDY4fQ.b5WBq4I1Fxfrt1LDpQXRGo2upkC8NsR3Lcw-JE0JB1o';

const sb = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

async function run() {
  try {
    // Upsert a user with a stable uid
    const uid = `script-test-uid-${Date.now()}`;
    const { data: uData, error: uErr } = await sb.from('users').upsert([{ uid, username: 'scriptuser', email: `script+${Date.now()}@example.com` }], { onConflict: 'uid' }).select();
    if (uErr) throw uErr;
    const userId = Array.isArray(uData) ? uData[0].id : uData.id;

    // Insert a destination
    const { data: dData, error: dErr } = await sb.from('destinations').insert([{ name: `Script Destination ${Date.now()}`, country: 'Nowhere' }]).select();
    if (dErr) throw dErr;
    const destinationId = Array.isArray(dData) ? dData[0].id : dData.id;

    // Insert trip
    const now = new Date();
    const trip = {
      user_id: userId,
      destination_id: destinationId,
      title: `Scripted Trip ${now.toISOString()}`,
      start_date: now,
      end_date: now,
      description: 'Inserted directly by script',
    };

    const { data: tData, error: tErr } = await sb.from('trips').insert([trip]).select();
    if (tErr) throw tErr;
    console.log('Inserted trip:', Array.isArray(tData) ? tData[0] : tData);

    // Query recent trips
    const { data: rows } = await sb.from('trips').select('*').order('id', { ascending: false }).limit(5);
    console.log('Recent trips:', rows);
  } catch (err) {
    console.error('Failed:', err);
    process.exit(1);
  }
}

run();
