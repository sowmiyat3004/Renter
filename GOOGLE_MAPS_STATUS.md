# 🔍 Google Maps API Status Check

## Current Setup

You already have these environment variables configured:
- ✅ `GOOGLE_PLACES_API_KEY` - For server-side location search
- ✅ `ENABLE_GOOGLE_PLACES` - Feature flag

## What's Working Right Now

### ✅ Server-Side Search (Already Implemented)
Your application is already using Google Places API through these endpoints:

1. **`/api/google-places`** - Main location search endpoint
   - Uses `GOOGLE_PLACES_API_KEY`
   - Called by `GoogleLocationSelector` component
   - Falls back to static locations if API fails

2. **`/api/places/search`** - Alternative search endpoint
   - Also uses `GOOGLE_PLACES_API_KEY`
   - Provides autocomplete suggestions

### 📍 Current Location Search Flow:

```
User Types → GoogleLocationSelector Component 
           → Calls /api/google-places 
           → Uses GOOGLE_PLACES_API_KEY
           → Returns location data
```

## To Test If It's Working

### Option 1: Check Debug Endpoint
```bash
curl https://your-app.onrender.com/api/debug
```

Look for:
```json
{
  "googlePlacesApiKey": "Set"  // Should show "Set" if configured
}
```

### Option 2: Test Location Search
1. Go to: https://your-app.onrender.com/listings/create-enhanced
2. Scroll to "Location" field
3. Type "Bangalore"
4. If Google API is working:
   - You'll see location suggestions
   - Select one
   - All fields (city, state, lat, lng) will auto-fill

### Option 3: Check Render Logs
```
Go to Render Dashboard → Your Service → Logs
Look for:
- "Google Places API returned X results" ✅ Working
- "Google Places API key not configured" ❌ Not working
- "Google Places API error: REQUEST_DENIED" ❌ API not enabled
```

## Common Issues & Solutions

### Issue 1: "Google Places API key not configured"
**Cause**: Environment variable not set in Render
**Solution**: 
1. Go to Render Dashboard → Environment
2. Verify `GOOGLE_PLACES_API_KEY` is set
3. Redeploy

### Issue 2: "REQUEST_DENIED"
**Cause**: Google Places API not enabled or billing not set up
**Solution**:
1. Go to Google Cloud Console
2. Enable "Places API (New)"
3. Set up billing (free tier available)

### Issue 3: No location suggestions appearing
**Possible Causes**:
- API key not set
- API not enabled
- API restrictions too strict
- Network error

**Debug Steps**:
1. Open browser console (F12)
2. Go to Create Listing page
3. Type in location field
4. Check console for errors
5. Check Network tab for API calls

### Issue 4: "RefererNotAllowedMapError"
**Cause**: API key has HTTP referrer restrictions
**Solution**:
1. Go to Google Cloud Console → Credentials
2. Edit your API key
3. Add these referrers:
   ```
   https://*.onrender.com/*
   https://your-domain.com/*
   ```

## What You DON'T Need

Since you're using server-side search, you **don't need**:
- ❌ `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (only needed for client-side Maps)
- ❌ Maps JavaScript API (only needed for interactive maps)
- ❌ Client-side Google Maps loader

## What You DO Need (Already Have!)

- ✅ `GOOGLE_PLACES_API_KEY` - You have this!
- ✅ Places API enabled in Google Cloud Console
- ✅ Billing enabled (free tier is fine)

## Quick Verification Checklist

Run through this checklist:

### In Render:
- [ ] `GOOGLE_PLACES_API_KEY` is set in Environment variables
- [ ] Value is the actual API key (not "your-api-key-here")
- [ ] Service has been redeployed after setting the variable

### In Google Cloud Console:
- [ ] Project created
- [ ] **Places API (New)** is enabled
- [ ] API key is created
- [ ] Billing is enabled (even for free tier)
- [ ] API key restrictions allow your domain (or no restrictions for testing)

### Test Results:
- [ ] Can access `/api/debug` and see "googlePlacesApiKey": "Set"
- [ ] Can type in location field and see suggestions
- [ ] Selecting a location fills all fields correctly
- [ ] No errors in browser console
- [ ] No errors in Render logs

## Still Not Working?

If you've checked everything above and it's still not working, let's debug:

1. **Share the Render logs** - Look for any Google API errors
2. **Check browser console** - Open F12 and look for errors
3. **Try the debug endpoint** - Visit `/api/debug` and share the output
4. **Verify API key** - Copy the key from Google Cloud and verify it's correct in Render

## Current Implementation Status

✅ **Server-side location search** - Fully implemented
✅ **Fallback to static locations** - Working
✅ **Address parsing** - Working  
✅ **Coordinates extraction** - Working
✅ **10km radius search** - Supported

The system is designed to work even if Google API fails, so your application should always function!

---

**Next Steps:**
1. Verify `GOOGLE_PLACES_API_KEY` is set in Render
2. Check if Places API is enabled in Google Cloud
3. Test the location search on your live site
4. Share any error messages if it's not working

