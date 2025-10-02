#!/usr/bin/env node

/**
 * Netlify Deployment Setup Script
 * This script helps set up your Renter app for Netlify deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Renter app for Netlify deployment...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...');
  
  const envContent = `# Netlify Environment Variables
# Copy these to your Netlify dashboard

# Database (Get from Supabase)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

# Authentication
NEXTAUTH_URL=https://your-app-name.netlify.app
NEXTAUTH_SECRET=your-super-secret-key-here
JWT_SECRET=your-jwt-secret-key-here

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local file');
} else {
  console.log('✅ .env.local already exists');
}

// Check if netlify.toml exists
const netlifyPath = path.join(process.cwd(), 'netlify.toml');
if (fs.existsSync(netlifyPath)) {
  console.log('✅ netlify.toml configuration found');
} else {
  console.log('❌ netlify.toml not found - this is required for Netlify');
}

// Check package.json for required scripts
const packagePath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  if (packageJson.scripts['netlify:build']) {
    console.log('✅ netlify:build script found');
  } else {
    console.log('❌ netlify:build script not found in package.json');
  }
  
  if (packageJson.scripts['netlify:dev']) {
    console.log('✅ netlify:dev script found');
  } else {
    console.log('❌ netlify:dev script not found in package.json');
  }
}

console.log('\n🎯 Next Steps:');
console.log('1. Set up Supabase database (free): https://supabase.com');
console.log('2. Get your database connection string from Supabase');
console.log('3. Update .env.local with your actual values');
console.log('4. Deploy to Netlify: https://netlify.com');
console.log('5. Add environment variables in Netlify dashboard');
console.log('6. Run database migration after deployment');

console.log('\n📚 For detailed instructions, see: NETLIFY_DEPLOYMENT.md');
console.log('\n✨ Happy deploying!');
