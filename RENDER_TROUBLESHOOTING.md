# Render Bad Gateway Troubleshooting Guide

## 🚨 Problem: Bad Gateway Error
"Bad Gateway - This service is currently unavailable"

## 🔍 Step-by-Step Diagnosis

### Step 1: Check Render Dashboard Status

1. **Go to Render Dashboard**
2. **Select your Renter app**
3. **Check service status**:
   - ✅ **Live** (green) = App is running
   - ❌ **Build Failed** (red) = Build error
   - ⚠️ **Deploying** (yellow) = Still deploying
   - ❌ **Crashed** (red) = App crashed

### Step 2: Check Logs

1. **Click "Logs" tab**
2. **Look for error messages**:
   - ❌ **"Database connection failed"**
   - ❌ **"Environment variable missing"**
   - ❌ **"Build failed"**
   - ❌ **"Out of memory"**
   - ❌ **"Port 3000 already in use"**

### Step 3: Test Health Endpoint

Visit: `https://your-app-name.onrender.com/api/health`

**Expected response**:
```json
{
  "status": "ok",
  "message": "API is working",
  "environment": {
    "nodeEnv": "production",
    "databaseUrl": "Set",
    "nextauthUrl": "Set"
  }
}
```

## 🔧 Common Fixes

### Fix 1: Restart Service
1. **Render Dashboard** → **Your App**
2. **Click "Manual Deploy"**
3. **Select "Deploy latest commit"**
4. **Wait 2-3 minutes**

### Fix 2: Check Environment Variables

**Required variables**:
```
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://your-app-name.onrender.com
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_PLACES_API_KEY=your-google-places-api-key
ENABLE_GOOGLE_PLACES=true
```

### Fix 3: Database Issues

1. **Check PostgreSQL service** is running
2. **Copy External Database URL**
3. **Update DATABASE_URL** in web service
4. **Run migration**: `/api/migrate`

### Fix 4: Build Issues

1. **Check build logs** for errors
2. **Verify Dockerfile** is correct
3. **Check package.json** dependencies
4. **Redeploy** if needed

## 🚀 Emergency Recovery

### Step 1: Force Redeploy
1. **Render Dashboard** → **Your App**
2. **Settings** → **Manual Deploy**
3. **Deploy latest commit**

### Step 2: Check Resource Limits
1. **Check if you're on free tier**
2. **Free tier limitations**:
   - 750 hours/month
   - Sleeps after 15 minutes of inactivity
   - Limited memory/CPU

### Step 3: Database Migration
If app starts but database is empty:
1. Visit: `https://your-app-name.onrender.com/api/migrate`
2. Should return: `{"success": true}`

## 📊 Service Health Check

### Test These URLs:
1. **Health**: `https://your-app-name.onrender.com/api/health`
2. **Database**: `https://your-app-name.onrender.com/api/test-db`
3. **Migration**: `https://your-app-name.onrender.com/api/migrate`

### Expected Responses:
- **Health**: `{"status": "ok"}`
- **Database**: `{"success": true, "users": 2}`
- **Migration**: `{"success": true}`

## 🆘 Still Not Working?

### Contact Render Support:
1. **Render Dashboard** → **Help**
2. **Submit support ticket**
3. **Include**:
   - Service logs
   - Error messages
   - Service configuration

### Alternative: Check Service Status
1. Visit: [Render Status Page](https://status.render.com/)
2. Check for **outages** or **maintenance**

## ✅ Success Indicators

- ✅ **Service status**: Live (green)
- ✅ **Health endpoint**: Returns 200 OK
- ✅ **Database test**: Returns user count
- ✅ **App loads**: No Bad Gateway error
