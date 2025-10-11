# Google Maps API Setup Guide

This guide will help you set up Google Maps API for the Broker360 application.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click on the project dropdown at the top
4. Click "New Project"
5. Enter project name: "Broker360" (or your preferred name)
6. Click "Create"

## Step 2: Enable Required APIs

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Enable the following APIs:
   - **Maps JavaScript API** (for client-side maps)
   - **Places API** (for location search and autocomplete)
   - **Geocoding API** (for address conversion)

To enable each API:
- Search for the API name
- Click on it
- Click "Enable"

## Step 3: Create API Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the API key that is generated
4. Click "Restrict Key" (recommended for security)

### Configure API Key Restrictions

#### Application Restrictions:
- Select "HTTP referrers (web sites)"
- Add these referrers:
  ```
  http://localhost:3000/*
  https://your-domain.com/*
  https://*.onrender.com/*
  ```

#### API Restrictions:
- Select "Restrict key"
- Select these APIs:
  - Maps JavaScript API
  - Places API
  - Geocoding API

5. Click "Save"

## Step 4: Set Up Billing (Required)

Google Maps API requires billing to be enabled, but offers $200 free credit per month.

1. Go to "Billing" in Google Cloud Console
2. Click "Link a billing account" or "Create billing account"
3. Enter your payment information
4. The free tier includes:
   - $200 free usage per month
   - 28,000 map loads per month
   - 40,000 place searches per month

**Note:** You won't be charged unless you exceed the free tier limits.

## Step 5: Add API Key to Your Application

### For Development (.env.local):

Create or update `.env.local` file in your project root:

```env
# Google Maps & Places API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-api-key-here"
GOOGLE_PLACES_API_KEY="your-api-key-here"
```

### For Production (Render):

1. Go to your Render dashboard
2. Select your web service
3. Go to "Environment" tab
4. Add these environment variables:
   - Key: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, Value: `your-api-key-here`
   - Key: `GOOGLE_PLACES_API_KEY`, Value: `your-api-key-here`

5. Click "Save Changes"

## Step 6: Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Go to "Create Listing" page
3. Try searching for a location in the location field
4. You should see Google Places autocomplete suggestions

## Troubleshooting

### "Google Maps API key not configured"
- Make sure you've added the API key with the correct variable name
- Restart your development server after adding the key
- Check that the key is not enclosed in quotes in the `.env` file

### "RefererNotAllowedMapError"
- Update your API key restrictions to include your domain
- Add `http://localhost:3000/*` for development
- Add your production domain for deployment

### "This API project is not authorized to use this API"
- Make sure you've enabled Maps JavaScript API and Places API
- Wait a few minutes for the APIs to be fully activated

### "REQUEST_DENIED"
- Check that billing is enabled for your Google Cloud project
- Verify that the API key has the correct API restrictions

## Cost Management

To avoid unexpected charges:

1. Set up budget alerts:
   - Go to "Billing" > "Budgets & alerts"
   - Create a budget (e.g., $50/month)
   - Set up email notifications at 50%, 90%, and 100%

2. Monitor usage:
   - Go to "APIs & Services" > "Dashboard"
   - Check "Metrics" for each API

3. Implement caching:
   - The application caches location searches
   - This reduces API calls and costs

## Features Enabled

With Google Maps API, your application can:

1. **Autocomplete Location Search**
   - Users can search for any location in India
   - Real-time suggestions as they type
   - Accurate address parsing

2. **Geocoding**
   - Convert addresses to coordinates
   - Enable distance-based search (10km radius)

3. **Address Components**
   - Extract state, district, city, locality
   - Proper formatting for database storage

4. **Fallback System**
   - If API fails, application uses static location data
   - Ensures app continues to work

## Security Best Practices

1. **Never commit API keys to Git**
   - Use `.env.local` for local development
   - Add `.env.local` to `.gitignore`

2. **Restrict API keys**
   - Use HTTP referrer restrictions
   - Limit to specific APIs only

3. **Monitor usage regularly**
   - Set up billing alerts
   - Review API usage monthly

4. **Rotate keys periodically**
   - Create new keys every 6-12 months
   - Delete old unused keys

## Support

If you encounter issues:
1. Check Google Cloud Console for API status
2. Review browser console for error messages
3. Check Render logs for server-side errors
4. Verify environment variables are set correctly

## Additional Resources

- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation)
- [Places API Documentation](https://developers.google.com/maps/documentation/places/web-service/overview)
- [Pricing Calculator](https://mapsplatform.google.com/pricing/)

