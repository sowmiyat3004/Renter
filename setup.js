#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🏠 Setting up Renter application...\n');

// Create .env.local file if it doesn't exist
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  const envContent = `# Database
DATABASE_URL="postgresql://username:password@localhost:5432/renter_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-this-in-production"

# Google OAuth (optional - leave empty if not using)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# JWT
JWT_SECRET="your-jwt-secret-here-change-this-in-production"

# Email (SMTP) - optional
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASS=""

# File Upload
MAX_FILE_SIZE="1048576"
UPLOAD_DIR="./public/uploads"

# App Settings
APP_NAME="Renter"
APP_URL="http://localhost:3000"`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local file');
} else {
  console.log('✅ .env.local file already exists');
}

// Create uploads directory
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory');
} else {
  console.log('✅ Uploads directory already exists');
}

console.log('\n🎉 Setup complete! Next steps:');
console.log('1. Update your .env.local file with your database credentials');
console.log('2. Run: npm run db:generate');
console.log('3. Run: npm run db:push');
console.log('4. Run: npm run db:seed');
console.log('5. Run: npm run dev');
console.log('\n📖 See README.md for detailed instructions');
