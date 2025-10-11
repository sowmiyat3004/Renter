# 🚀 Quick Start: Google Maps API

## ⚡ 3-Minute Setup

### Step 1: Get API Key (2 minutes)
1. Go to https://console.cloud.google.com/
2. Create new project or select existing
3. Enable APIs:
   - Maps JavaScript API
   - Places API
4. Create API Key (Credentials → Create Credentials → API Key)
5. Copy the API key

### Step 2: Add to Render (1 minute)
1. Go to Render Dashboard → Your Service → Environment
2. Add variable:
   ```
   Name: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
   Value: [paste your API key]
   ```
3. Add second variable:
   ```
   Name: GOOGLE_PLACES_API_KEY
   Value: [paste your API key]
   ```
4. Save

### Step 3: Enable Billing (Required)
1. In Google Cloud Console → Billing
2. Link billing account
3. **FREE TIER**: $200/month free = ~28,000 searches/month
4. You won't be charged unless you exceed free tier

## ✅ That's It!

Your location search will now use Google Maps API with:
- Real-time autocomplete
- Accurate addresses
- State/city/district parsing
- Lat/lng coordinates for distance search

## 🔍 Test It

1. Go to Create Listing page
2. Start typing in Location field
3. Should see Google suggestions appear

## ❗ Important Notes

- **Billing MUST be enabled** (even for free tier)
- **API key restrictions recommended** (add your domain)
- **Monitor usage** to stay within free tier
- **Application works without API** (uses fallback)

## 📚 Need Help?

- Full setup: See `GOOGLE_MAPS_SETUP.md`
- Implementation details: See `GOOGLE_MAPS_IMPLEMENTATION.md`
- Troubleshooting: Check browser console for errors

---

**Cost**: FREE for up to 28,000 searches/month
**Time to Setup**: 3-5 minutes
**Billing Required**: Yes (but free tier available)

