const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

// Load .env
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
  database: 'postgres', // connect to default postgres DB first
});

async function createDB() {
  try {
    await client.connect();
    console.log('Connected to postgres database');
    
    // Check if coursera_demo exists
    const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'coursera_demo'");
    
    if (res.rowCount === 0) {
      console.log('Creating coursera_demo database...');
      await client.query('CREATE DATABASE coursera_demo');
      console.log('Database coursera_demo created successfully');
    } else {
      console.log('Database coursera_demo already exists');
    }
    
    await client.end();
  } catch (err) {
    console.error('Error:', err.message || err);
    await client.end();
    process.exitCode = 1;
  }
}

createDB();
