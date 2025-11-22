#!/usr/bin/env node

/**
 * Database initialization script
 * Sets up database schema and optionally seeds demo data
 */

require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function initDatabase() {
  console.log('🔧 Initializing OpsMind database...\n');

  try {
    // Read schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log('📝 Creating database schema...');
    await pool.query(schema);
    console.log('✅ Schema created successfully\n');

    // Ask if user wants to seed demo data
    const seedDemo = process.argv.includes('--seed');

    if (seedDemo) {
      console.log('🌱 Seeding demo data...');
      const seedPath = path.join(__dirname, 'seed.sql');
      const seedData = fs.readFileSync(seedPath, 'utf8');
      
      await pool.query(seedData);
      console.log('✅ Demo data seeded successfully\n');

      // Show summary
      const stats = await getDatabaseStats();
      console.log('📊 Database Statistics:');
      console.log(`   Tasks: ${stats.tasks}`);
      console.log(`   Incidents: ${stats.incidents}`);
      console.log(`   Time Logs: ${stats.timelogs}`);
      console.log(`   Expenses: ${stats.expenses}`);
      console.log(`   Documents: ${stats.documents}\n`);
    }

    console.log('🎉 Database initialization complete!');
    
    if (!seedDemo) {
      console.log('\n💡 Tip: Run with --seed flag to add demo data:');
      console.log('   node src/db/init.js --seed\n');
    }

  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

async function getDatabaseStats() {
  const results = await Promise.all([
    pool.query('SELECT COUNT(*) FROM tasks'),
    pool.query('SELECT COUNT(*) FROM incidents'),
    pool.query('SELECT COUNT(*) FROM timelogs'),
    pool.query('SELECT COUNT(*) FROM expenses'),
    pool.query('SELECT COUNT(*) FROM document_updates')
  ]);

  return {
    tasks: results[0].rows[0].count,
    incidents: results[1].rows[0].count,
    timelogs: results[2].rows[0].count,
    expenses: results[3].rows[0].count,
    documents: results[4].rows[0].count
  };
}

// Run initialization
initDatabase();
