# 🔧 Deployment Troubleshooting Guide

## Current Issue: "Cause of failure could not be determined"

This error on Render usually means:
1. Database connection failing
2. Environment variables missing
3. Port binding issues
4. Health check failing

## ✅ Quick Fix Checklist

### 1. Verify Environment Variables in Render

Go to Render Dashboard → Your Web Service → Environment tab

**Required Variables:**
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `NEXTAUTH_URL` - Your app URL (e.g., https://your-app.onrender.com)
- [ ] `NEXTAUTH_SECRET` - Random secret string
- [ ] `JWT_SECRET` - Random secret string

**Optional but Recommended:**
- [ ] `GOOGLE_CLIENT_ID` - For Google OAuth
- [ ] `GOOGLE_CLIENT_SECRET` - For Google OAuth  
- [ ] `GOOGLE_PLACES_API_KEY` - For location search

### 2. Check Database Connection

**Problem:** Database URL might be wrong

**Solution:**
1. Go to Render Dashboard → Your PostgreSQL Database
2. Copy the **Internal Connection String**
3. It should look like:
   ```
   postgresql://user:password@dpg-xxxxx-a.oregon-postgres.render.com/database_name_xxxx
   ```
4. Add this as `DATABASE_URL` in your web service environment variables

### 3. Remove render.yaml (If Using Web Dashboard)

If you configured your service through the Render dashboard, the `render.yaml` file might be conflicting.

**Solution:**
```bash
git rm render.yaml
git commit -m "Remove render.yaml to use dashboard config"
git push
```

### 4. Check Health Check Endpoint

**Problem:** Render can't reach `/api/health`

**Test Locally:**
```bash
npm run build
npm start
# In another terminal:
curl http://localhost:3000/api/health
```

Should return:
```json
{
  "status": "ok",
  "message": "API is working"
}
```

### 5. Force Redeploy

Sometimes Render just needs a fresh deploy:

1. Go to Render Dashboard → Your Web Service
2. Click "Manual Deploy" → "Clear build cache & deploy"

### 6. Check Render Logs

**How to access:**
1. Render Dashboard → Your Web Service → Logs tab
2. Look for specific errors:
   - `ECONNREFUSED` → Database connection issue
   - `bind EADDRINUSE` → Port already in use
   - `Error: P1001` → Prisma can't reach database
   - `MODULE_NOT_FOUND` → Missing dependency

## 🔍 Common Error Solutions

### Error: "Can't reach database server"

**Cause:** Wrong DATABASE_URL or database not started

**Fix:**
1. Verify PostgreSQL service is running (should show "Available")
2. Use **Internal Connection String** not External
3. Format: `postgresql://user:pass@host/dbname`

### Error: "Port 10000 is already in use"

**Cause:** Previous deployment didn't shut down properly

**Fix:**
1. In Render Dashboard → Settings
2. Scroll to "Danger Zone"
3. Click "Suspend" then "Resume"

### Error: "Health check failed"

**Cause:** App not starting fast enough or `/api/health` not working

**Fix 1: Increase Health Check Timeout**
1. Render Dashboard → Settings
2. Health Check Path: `/api/health`
3. Health Check Grace Period: `300` seconds (5 minutes)

**Fix 2: Remove Health Check Temporarily**
1. Render Dashboard → Settings
2. Health Check Path: (leave blank)
3. Save changes
4. Redeploy

### Error: "Failed to find a valid digest"

**Cause:** Docker build cache issue

**Fix:**
```bash
# In your project
git rm Dockerfile docker-compose.yml
git commit -m "Remove Docker config"
git push
```

Then in Render:
1. Settings → Environment: Change to "Node"
2. Build Command: `npm install && npm run build`
3. Start Command: `npm start`

## 🎯 Recommended Render Configuration

### Build & Deploy Settings:

```yaml
Environment: Node
Branch: main
Build Command: npm install && npm run build
Start Command: npm start
```

### Environment Variables:

```env
# Core (Required)
DATABASE_URL=[Your Internal PostgreSQL URL]
NEXTAUTH_URL=https://your-app-name.onrender.com
NEXTAUTH_SECRET=[Random 32+ character string]
JWT_SECRET=[Random 32+ character string]
NODE_ENV=production

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=[From Google Cloud Console]
GOOGLE_CLIENT_SECRET=[From Google Cloud Console]

# Google Maps (Optional - you already have this)
GOOGLE_PLACES_API_KEY=[Your API key]
ENABLE_GOOGLE_PLACES=true

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Health Check Settings:

```
Health Check Path: /api/health
Health Check Grace Period: 300
```

## 🚀 Step-by-Step Fresh Deploy

If nothing works, try a completely fresh deploy:

### 1. Delete Current Service
1. Render Dashboard → Your Web Service
2. Settings → Danger Zone → Delete Web Service

### 2. Keep Database
- **Don't delete** the PostgreSQL database
- Copy the Internal Connection String

### 3. Create New Web Service
1. Render Dashboard → New → Web Service
2. Connect your GitHub repo
3. Settings:
   - **Name:** broker360-app
   - **Environment:** Node
   - **Branch:** main
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Free

4. Add Environment Variables:
   - `DATABASE_URL`: [Your PostgreSQL Internal URL]
   - `NEXTAUTH_URL`: https://broker360-app.onrender.com
   - `NEXTAUTH_SECRET`: [Generate random string]
   - `JWT_SECRET`: [Generate random string]

5. Advanced → Health Check:
   - Path: `/api/health`
   - Grace Period: `300`

6. Click "Create Web Service"

### 4. Run Database Migration

Once deployed, visit:
```
https://your-app.onrender.com/api/migrate?token=your-migration-token
```

This will set up your database tables.

## 🔐 Generate Secrets

For `NEXTAUTH_SECRET` and `JWT_SECRET`, use:

```bash
# On Mac/Linux:
openssl rand -base64 32

# Or online:
# Visit: https://generate-secret.vercel.app/32
```

## 📊 Check Service Status

### Render Dashboard Indicators:

- **Green "Live"** → Working! ✅
- **Yellow "Building"** → In progress ⏳
- **Orange "Deploy failed"** → Build succeeded, deploy failed ❌
- **Red "Build failed"** → Code won't compile ❌

### What "Deploy Failed" Means:

- Build was successful (code compiled)
- App failed to start or health check failed
- Usually: Database connection or environment variable issue

## 🆘 Still Not Working?

### Get Detailed Logs:

1. Render Dashboard → Logs
2. Click "Show" next to filters
3. Select: "All logs"
4. Look for the last error before "Deploy failed"

### Share These for Help:

1. Last 50 lines of Render logs
2. Screenshot of Environment Variables (hide sensitive values)
3. Your `render.yaml` if using one
4. Output of visiting `/api/health` if app starts

## 💡 Pro Tips

1. **Start Simple:** Get basic deployment working before adding features
2. **Test Locally:** Always test `npm run build && npm start` locally first
3. **Check Database:** Ensure PostgreSQL service shows "Available"
4. **Use Internal URLs:** For DATABASE_URL, use internal not external
5. **Clear Cache:** When in doubt, clear build cache and redeploy

---

**Most Common Solution:** Wrong DATABASE_URL or missing NEXTAUTH_URL

Check these two first! 🎯

