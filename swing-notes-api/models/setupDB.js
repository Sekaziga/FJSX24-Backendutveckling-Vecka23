// setupDB.js
import 'dotenv/config';
import pool from './pool.js';       // Import default pool
import { createUsersTable, createNotesTable } from './db.js';

async function setupDatabase() {
  const client = await pool.connect();
  try {
    console.log('Creating tables...');
    
    await client.query(createUsersTable);
    console.log('✅ Created users table');
    
    await client.query(createNotesTable);
    console.log('✅ Created notes table');
    
    console.log('Database setup complete!');
  } catch (err) {
    console.error('❌ Error setting up database:', err.message);
  } finally {
    client.release();
    // Do NOT call pool.end() here if you want to keep the pool for app runtime
  }
}

setupDatabase();
