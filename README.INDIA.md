# Renter India - Setup Guide

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
   ```bash
   npm install
   ```

2. **Set up environment**
   ```bash
   cp env.india.example .env.local
   # Edit .env.local with your values
   ```

3. **Set up Google OAuth**
   - Follow the guide in GOOGLE_OAUTH_SETUP.md
   - Add your Google OAuth credentials to .env.local

4. **Set up database**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

5. **Start development server**
   ```bash
   npm run dev:india
   ```

## 📍 Location API

The application includes a comprehensive location API for Indian cities:

- `GET /api/locations?type=states` - Get all Indian states
- `GET /api/locations?type=cities&state=Maharashtra` - Get cities by state
- `GET /api/locations?type=search&q=Mumbai` - Search cities
- `GET /api/locations?type=nearby&lat=19.0760&lng=72.8777` - Find nearby cities

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

```bash
# Start with Indian configuration
npm run dev:india

# Run tests with Indian context
npm run test:india

# Build for Indian market
npm run build:india
```

## 📞 Support

For Indian market specific support:
- Email: support@renter.in
- Phone: +91-XXXX-XXXXXX
- Address: Mumbai, Maharashtra, India

---

Built with ❤️ for the Indian rental property market.
