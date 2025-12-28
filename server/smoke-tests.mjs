import http from 'http';
import { URL } from 'url';

const BASE = process.env.SMOKE_BASE || 'http://127.0.0.1:5000';
const endpoints = [
  '/',
  '/api/destinations',
  '/api/destinations/1',
  '/api/destinations/1/hotels',
  '/api/reviews',
  '/api/users/uid/test-uid',
  '/api/trips/1',
  '/api/trips/1/budget'
];

function check(endpoint) {
  return new Promise((resolve) => {
    const url = new URL(endpoint, BASE);
    const req = http.get(url, (res) => {
      const { statusCode } = res;
      let body = '';
      res.setEncoding('utf8');
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({ endpoint: url.toString(), statusCode, body });
      });
    });
    req.on('error', (err) => {
      resolve({ endpoint: url.toString(), error: String(err) });
    });
    req.setTimeout(5000, () => {
      req.abort();
      resolve({ endpoint: url.toString(), error: 'timeout' });
    });
  });
}

(async function run() {
  console.log('Running smoke tests against', BASE);
  const results = [];
  for (const ep of endpoints) {
    process.stdout.write(`Checking ${ep} ... `);
    // small delay to avoid spamming
    await new Promise(r => setTimeout(r, 100));
    // ensure leading slash
    const res = await check(ep);
    if (res.error) {
      console.log('ERROR', res.error);
    } else {
      console.log(`HTTP ${res.statusCode}`);
    }
    results.push(res);
  }

  const failing = results.filter(r => r.error || (r.statusCode && r.statusCode >= 500));
  if (failing.length) {
    console.error('\nSmoke tests found failures:');
    failing.forEach(f => console.error(f));
    process.exit(2);
  }

  console.log('\nAll smoke tests passed');
  process.exit(0);
})();
