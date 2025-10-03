#!/usr/bin/env node

/**
 * Railway Deployment Script
 * This script helps deploy your Renter app to Railway with bundled database
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Railway Deployment Setup for Renter App...\n');

// Check if railway.json exists
const railwayPath = path.join(process.cwd(), 'railway.json');
if (fs.existsSync(railwayPath)) {
  console.log('✅ railway.json configuration found');
} else {
  console.log('❌ railway.json not found - this is required for Railway');
}

// Check if package.json has required scripts
const packagePath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  if (packageJson.scripts['build']) {
    console.log('✅ build script found');
  } else {
    console.log('❌ build script not found in package.json');
  }
  
  if (packageJson.scripts['start']) {
    console.log('✅ start script found');
  } else {
    console.log('❌ start script not found in package.json');
  }
}

console.log('\n🎯 Railway Deployment Steps:');
console.log('1. Go to https://railway.app');
console.log('2. Sign up with GitHub');
console.log('3. Click "New Project" → "Deploy from GitHub repo"');
console.log('4. Select your "Renter" repository');
console.log('5. Railway will auto-detect Next.js and deploy');
console.log('6. Add PostgreSQL database service');
console.log('7. Set environment variables');
console.log('8. Your app will be live with bundled database!');

console.log('\n📊 Railway Benefits:');
console.log('✅ Free tier: $5 credit monthly');
console.log('✅ Bundled PostgreSQL database');
console.log('✅ Auto-scaling and monitoring');
console.log('✅ Custom domains');
console.log('✅ No separate database setup needed');

console.log('\n🔧 Environment Variables to Set:');
console.log('NEXTAUTH_URL=https://your-app-name.railway.app');
console.log('NEXTAUTH_SECRET=your-super-secret-key-here');
console.log('JWT_SECRET=your-jwt-secret-key-here');
console.log('MIGRATION_TOKEN=your-migration-token');

console.log('\n📚 For detailed instructions, see: RAILWAY_DEPLOYMENT.md');
console.log('\n✨ Happy deploying with Railway!');
