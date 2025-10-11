# 🔧 Quick Fix: "Failed to load location services"

## Problem
You're seeing: **"Failed to load location services. Please refresh the page."**

## Root Cause
The `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` environment variable is not set in Render.

---

## ✅ Solution (2 Minutes)

### Step 1: Get Your Google API Key

You already have `GOOGLE_PLACES_API_KEY` in Render. 

**You can use the SAME key for both!**

1. Go to Render Dashboard → Your Web Service → Environment
2. Find the value of `GOOGLE_PLACES_API_KEY`
3. Copy that value

### Step 2: Add New Environment Variable

In the same Environment tab:

1. Click "Add Environment Variable"
2. **Key:** `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
3. **Value:** [paste the same API key you copied]
4. Click "Save"

### Step 3: Redeploy

1. Go to "Manual Deploy" → "Deploy latest commit"
2. Wait for build to complete (~2-3 minutes)
3. Done!

---

## 📋 What You Should Have

After the fix, you should have **BOTH** of these in Render Environment:

```
✅ GOOGLE_PLACES_API_KEY=your-api-key-here
✅ NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key-here
```

**Note:** Both can use the EXACT SAME value!

---

## 🧪 Test After Deploy

1. Go to: `https://your-app.onrender.com/listings/create-enhanced`
2. Scroll to "Location" field
3. You should see the search box (no error)
4. Start typing "Koramangala"
5. Real-time suggestions should appear!

---

## ❓ Why Two Variables?

- **`GOOGLE_PLACES_API_KEY`** (no prefix)
  - For server-side API calls
  - Used in `/api/google-places` endpoint
  
- **`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`** (with prefix)
  - For browser/client-side
  - Used by Google Maps JavaScript API
  - MUST have `NEXT_PUBLIC_` prefix for Next.js

---

## 🔒 Optional: API Key Restrictions

For better security, restrict your API key in Google Cloud Console:

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click on your API key
3. Under "Application restrictions":
   - Select "HTTP referrers"
   - Add: `https://*.onrender.com/*`
   - Add: `http://localhost:3000/*`
4. Under "API restrictions":
   - Select: Maps JavaScript API
   - Select: Places API
   - Select: Geocoding API
5. Click "Save"

---

## ✅ Summary

1. Copy value from `GOOGLE_PLACES_API_KEY`
2. Add new variable: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` = same value
3. Save and redeploy
4. Location search will work!

**Total Time: 2 minutes** ⏱️

---

## 🆘 Still Not Working?

### Check Browser Console:
1. Open the page
2. Press F12 (Developer Tools)
3. Go to "Console" tab
4. Look for errors

### Common Errors:

**"Google Maps API key not found"**
- Solution: Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` to Render

**"RefererNotAllowedMapError"**
- Solution: Add your domain to API key restrictions

**"This API project is not authorized"**
- Solution: Enable Maps JavaScript API in Google Cloud Console

---

**Need help?** Share the error from browser console (F12).

