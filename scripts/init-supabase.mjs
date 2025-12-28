#!/usr/bin/env node

import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

// Load environment variables
dotenv.config({ path: resolve(rootDir, '.env') });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const sqlPath = resolve(rootDir, 'supabase', 'init.sql');
const sql = fs.readFileSync(sqlPath, 'utf-8');

console.log(`
╔════════════════════════════════════════════════════════════════╗
║          SUPABASE DATABASE INITIALIZATION REQUIRED              ║
╚════════════════════════════════════════════════════════════════╝

The photos table and other required tables are missing from your Supabase database.

QUICK FIX:
1. Go to: ${SUPABASE_URL}/project/sql/new
2. Copy the entire contents of this file:
   → supabase/init.sql
3. Paste into the SQL editor
4. Click "Run"

After that, your app will work properly!

═══════════════════════════════════════════════════════════════════
`);

// Show first 20 lines of SQL as preview
const lines = sql.split('\n').slice(0, 20);
console.log('📝 SQL Preview (first 20 lines):');
console.log('───────────────────────────────');
lines.forEach((line, i) => {
  if (line.trim() && !line.trim().startsWith('--')) {
    console.log(line);
  }
});
console.log('...\n');

process.exit(0);
