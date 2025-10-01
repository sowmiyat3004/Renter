#!/usr/bin/env node

/**
 * Setup script for Indian localization
 * This script configures the Renter application for the Indian market
 */

const fs = require('fs')
const path = require('path')

console.log('🇮🇳 Setting up Renter for Indian market...')

// Create .env.local if it doesn't exist
const envPath = path.join(process.cwd(), '.env.local')
const envExamplePath = path.join(process.cwd(), 'env.example')

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  console.log('📝 Creating .env.local from env.example...')
  fs.copyFileSync(envExamplePath, envPath)
  console.log('✅ Created .env.local')
} else if (fs.existsSync(envPath)) {
  console.log('✅ .env.local already exists')
} else {
  console.log('⚠️  Please create .env.local manually')
}

// Update package.json scripts for Indian development
const packageJsonPath = path.join(process.cwd(), 'package.json')
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  
  // Add Indian-specific scripts
  packageJson.scripts = {
    ...packageJson.scripts,
    'dev:india': 'NODE_ENV=development npm run dev',
    'build:india': 'NODE_ENV=production npm run build',
    'setup:india': 'node scripts/setup-india.js',
    'test:india': 'npm test -- --testNamePattern="India"'
  }
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  console.log('✅ Updated package.json with Indian scripts')
}

// Create Indian-specific configuration
const configDir = path.join(process.cwd(), 'config')
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true })
}

const indiaConfig = {
  localization: {
    country: 'India',
    currency: 'INR',
    currencySymbol: '₹',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: 'en-IN',
    phoneFormat: '+91-XXXXXXXXXX',
    addressFormat: 'Street, City, State, PIN'
  },
  features: {
    enableGoogleOAuth: true,
    enableLocationSearch: true,
    enableIndianPhoneValidation: true,
    enableIndianAddressFormat: true,
    enableIndianCurrency: true
  },
  defaultLocation: {
    country: 'India',
    state: 'Maharashtra',
    city: 'Mumbai',
    lat: 19.0760,
    lng: 72.8777
  },
  supportedStates: [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
    'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
    'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
    'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry'
  ]
}

fs.writeFileSync(
  path.join(configDir, 'india.json'),
  JSON.stringify(indiaConfig, null, 2)
)
console.log('✅ Created Indian configuration file')

// Create Indian-specific environment template
const indiaEnvTemplate = `# Indian Localization Configuration
# Copy this to .env.local and update with your values

# Database
DATABASE_URL="file:./dev.db"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"

# Google OAuth (Required for Indian users)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# JWT Configuration
JWT_SECRET="your-jwt-secret-key-change-this-in-production"

# Email Configuration (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="noreply@renter.in"

# Indian Localization
DEFAULT_COUNTRY="India"
DEFAULT_CURRENCY="INR"
DEFAULT_TIMEZONE="Asia/Kolkata"
CURRENCY_SYMBOL="₹"

# System Configuration
DEFAULT_SEARCH_RADIUS_KM="10"
MAX_IMAGE_SIZE_MB="1"
MAX_IMAGES_PER_LISTING="10"

# Application Settings
APP_NAME="Renter India"
APP_URL="http://localhost:3000"
APP_DESCRIPTION="Find your perfect rental property in India"
`

fs.writeFileSync(
  path.join(process.cwd(), 'env.india.example'),
  indiaEnvTemplate
)
console.log('✅ Created Indian environment template')

// Create Indian-specific README
const indiaReadme = `# Renter India - Setup Guide

## 🇮🇳 Indian Localization Features

This application has been specifically configured for the Indian market with the following features:

### Currency & Localization
- **Indian Rupee (₹)** - All prices displayed in INR
- **Indian Number Format** - Numbers formatted according to Indian standards
- **Indian Date Format** - DD/MM/YYYY format
- **Indian Phone Numbers** - +91 country code support
- **Indian Address Format** - Street, City, State, PIN format

### Location Support
- **Complete Indian Coverage** - All 28 states and 8 union territories
- **Major Cities** - 100+ Indian cities with coordinates
- **State-wise City Lists** - Organized by state for easy selection
- **Proximity Search** - Find properties within specified radius

### Authentication
- **Google OAuth** - Seamless login with Google accounts
- **Email/Password** - Traditional authentication
- **Indian Phone Validation** - Support for Indian mobile numbers

## 🚀 Quick Start

1. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Set up environment**
   \`\`\`bash
   cp env.india.example .env.local
   # Edit .env.local with your values
   \`\`\`

3. **Set up Google OAuth**
   - Follow the guide in GOOGLE_OAUTH_SETUP.md
   - Add your Google OAuth credentials to .env.local

4. **Set up database**
   \`\`\`bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   \`\`\`

5. **Start development server**
   \`\`\`bash
   npm run dev:india
   \`\`\`

## 📍 Location API

The application includes a comprehensive location API for Indian cities:

- \`GET /api/locations?type=states\` - Get all Indian states
- \`GET /api/locations?type=cities&state=Maharashtra\` - Get cities by state
- \`GET /api/locations?type=search&q=Mumbai\` - Search cities
- \`GET /api/locations?type=nearby&lat=19.0760&lng=72.8777\` - Find nearby cities

## 💰 Currency Formatting

All currency values are formatted according to Indian standards:

- Display: ₹1,00,000 (with Indian number formatting)
- Input: Accepts both Indian and international formats
- Validation: Ensures amounts are within reasonable limits

## 📱 Phone Number Support

Indian phone number validation and formatting:

- Mobile: +91-9876543210
- Landline: +91-22-12345678
- Validation: Supports all Indian mobile and landline formats

## 🏠 Property Listings

Properties can be listed with:

- Indian address format
- INR pricing
- Indian amenities
- Location-based search within India
- State and city selection

## 🔧 Development

For development with Indian localization:

\`\`\`bash
# Start with Indian configuration
npm run dev:india

# Run tests with Indian context
npm run test:india

# Build for Indian market
npm run build:india
\`\`\`

## 📞 Support

For Indian market specific support:
- Email: support@renter.in
- Phone: +91-XXXX-XXXXXX
- Address: Mumbai, Maharashtra, India

---

Built with ❤️ for the Indian rental property market.
`

fs.writeFileSync(
  path.join(process.cwd(), 'README.INDIA.md'),
  indiaReadme
)
console.log('✅ Created Indian README')

console.log('\n🎉 Indian localization setup complete!')
console.log('\n📋 Next steps:')
console.log('1. Copy env.india.example to .env.local')
console.log('2. Set up Google OAuth (see GOOGLE_OAUTH_SETUP.md)')
console.log('3. Run: npm run db:generate && npm run db:push && npm run db:seed')
console.log('4. Start development: npm run dev:india')
console.log('\n🇮🇳 Welcome to Renter India!')
