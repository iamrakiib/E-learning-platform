const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

// Load .env manually
const envPath = path.resolve(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  env.forEach(line => {
    if (!line || line.startsWith('#')) return;
    const idx = line.indexOf('=');
    if (idx > 0) {
      const key = line.slice(0, idx);
      const val = line.slice(idx + 1);
      process.env[key] = val;
    }
  });
}

const client = new Client({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

client.connect()
  .then(() => {
    console.log('Connected to Postgres');
    return client.end();
  })
  .catch(err => {
    console.error('Connection error:', err.message || err);
    client.end();
    process.exitCode = 1;
  });
