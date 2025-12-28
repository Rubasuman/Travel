import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://iifihwwcucrxczclhojr.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpZmlod3djdWNyeGN6Y2xob2pyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjAxODA2OCwiZXhwIjoyMDcxNTk0MDY4fQ.b5WBq4I1Fxfrt1LDpQXRGo2upkC8NsR3Lcw-JE0JB1o';

const sb = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

async function run() {
  try {
    const { data, error } = await sb.from('trips').select('*').order('id', { ascending: false }).limit(10);
    if (error) {
      console.error('Supabase query error:', error);
      process.exit(1);
    }
    console.log('Recent trips:', data);
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
}

run();
