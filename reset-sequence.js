const { Client } = require('pg');

async function resetSequence() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'coursera_demo',
    user: 'postgres',
    password: '37887fgDG@',
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Delete all courses first
    await client.query('DELETE FROM course');
    console.log('Deleted all courses');

    // Reset the sequence to 1
    await client.query('ALTER SEQUENCE course_id_seq RESTART WITH 1');
    console.log('Reset course ID sequence to 1');

    // Also reset lessons if needed
    await client.query('DELETE FROM lesson');
    console.log('Deleted all lessons');
    
    await client.query('ALTER SEQUENCE lesson_id_seq RESTART WITH 1');
    console.log('Reset lesson ID sequence to 1');

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.end();
    console.log('Disconnected from database');
  }
}

resetSequence();
