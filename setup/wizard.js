#!/usr/bin/env node

/**
 * OpsMind Setup Wizard
 * Interactive setup for first-time users
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setup() {
  console.log('\n🚀 Welcome to OpsMind Setup Wizard!\n');
  console.log('This will help you configure OpsMind for the first time.\n');

  // Check if .env exists
  const envPath = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env file not found! Please copy .env.example to .env first.');
    console.log('   Run: cp .env.example .env\n');
    process.exit(1);
  }

  console.log('📋 You need two things to get started:\n');
  console.log('1. NeonDB Connection String (FREE)');
  console.log('   → Sign up at: https://neon.tech/');
  console.log('   → Create a project');
  console.log('   → Copy the connection string\n');
  
  console.log('2. Google Gemini API Key (FREE)');
  console.log('   → Get it from: https://makersuite.google.com/app/apikey');
  console.log('   → Sign in with Google');
  console.log('   → Create API key\n');

  const proceed = await question('Do you have both ready? (yes/no): ');
  
  if (proceed.toLowerCase() !== 'yes' && proceed.toLowerCase() !== 'y') {
    console.log('\n👋 No problem! Get those ready and run this again.');
    console.log('   Run: node setup/wizard.js\n');
    rl.close();
    return;
  }

  console.log('\n✅ Great! Let\'s configure OpsMind...\n');

  // Get NeonDB URL
  const dbUrl = await question('Paste your NeonDB connection string: ');
  
  // Get Gemini API Key
  const geminiKey = await question('Paste your Gemini API key: ');

  // Update .env file
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Replace DATABASE_URL
  envContent = envContent.replace(
    /DATABASE_URL=.*/,
    `DATABASE_URL=${dbUrl.trim()}`
  );
  
  // Replace GEMINI_API_KEY
  envContent = envContent.replace(
    /GEMINI_API_KEY=.*/,
    `GEMINI_API_KEY=${geminiKey.trim()}`
  );

  fs.writeFileSync(envPath, envContent);

  console.log('\n✅ Configuration saved!\n');
  console.log('🔧 Next steps:\n');
  console.log('1. Initialize database:');
  console.log('   npm run db:seed\n');
  console.log('2. Start the server:');
  console.log('   npm run dev\n');
  console.log('3. Test it works:');
  console.log('   npm run demo\n');
  console.log('🎉 You\'re all set! Happy coding!\n');

  rl.close();
}

setup().catch(error => {
  console.error('❌ Setup failed:', error.message);
  rl.close();
  process.exit(1);
});
