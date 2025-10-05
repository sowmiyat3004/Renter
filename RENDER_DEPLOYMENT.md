# 🚀 Render Deployment Guide - Free Hosting with Database

## Why Render?
- ✅ **Free tier**: Generous limits for small apps
- ✅ **Bundled PostgreSQL**: Database included, no separate setup needed
- ✅ **Simple deployment**: GitHub integration
- ✅ **Auto-scaling**: Handles traffic automatically
- ✅ **Custom domains**: Free subdomain included
- ✅ **Better GitHub integration**: Works with private repos

## Step 1: Deploy to Render

### 1.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub account
5. Select your "Renter" repository

### 1.2 Render Auto-Detection
Render will automatically detect:
- ✅ **Framework**: Next.js
- ✅ **Build command**: `npm install && npm run build`
- ✅ **Start command**: `npm start`
- ✅ **Node.js version**: 18+

## Step 2: Add PostgreSQL Database

### 2.1 Add Database Service
1. In your Render dashboard
2. Click "New" → "PostgreSQL"
3. Choose "Free" plan
4. Name it "renter-db"
5. Click "Create Database"

### 2.2 Database Configuration
Render automatically sets:
```env
DATABASE_URL=postgresql://[user]:[password]@[host]:5432/[database]
```

## Step 3: Configure Environment Variables

### 3.1 In Web Service Settings
Go to your web service → Environment tab, add:

```env
DATABASE_URL=postgresql://[user]:[password]@[host]:5432/[database]
NEXTAUTH_URL=https://renter-app.onrender.com
NEXTAUTH_SECRET=your-super-secret-key-here
JWT_SECRET=your-jwt-secret-key-here
MIGRATION_TOKEN=your-migration-token
```

### 3.2 Copy Database URL
1. Go to your PostgreSQL service
2. Copy the "External Database URL"
3. Paste it as `DATABASE_URL` in your web service

## Step 4: Environment Variables Setup

### 4.1 Required Environment Variables
In your Render dashboard, go to **Environment** tab and add:

```
# Database
DATABASE_URL=your_postgresql_connection_string

# Authentication
NEXTAUTH_URL=https://your-app-name.onrender.com
NEXTAUTH_SECRET=your-secret-key
JWT_SECRET=your-jwt-secret

# Google Places API (Optional - for enhanced location search)
GOOGLE_PLACES_API_KEY=your-google-places-api-key-here
ENABLE_GOOGLE_PLACES=true

# Migration
MIGRATION_TOKEN=your-migration-token
```

### 4.2 Database Migration
After setting environment variables, visit:
`https://your-app-name.onrender.com/api/migrate`

### 4.3 Test Database Connection
Visit: `https://your-app-name.onrender.com/api/test-db`

## Step 5: Test Your App

### 5.1 Test Accounts
- **Admin**: `admin@renter.com` / `admin123`
- **User**: `user@renter.com` / `user123`

### 5.2 Features to Test
- ✅ User registration/login
- ✅ Create listings
- ✅ Upload images
- ✅ Admin dashboard
- ✅ Search and filters

## Render vs Railway vs Netlify

| Feature | Render | Railway | Netlify |
|---------|--------|---------|---------|
| **Database Included** | ✅ PostgreSQL | ✅ PostgreSQL | ❌ External needed |
| **Free Tier** | Generous | $5 credit/month | 100GB bandwidth |
| **GitHub Integration** | ✅ Excellent | ⚠️ Sometimes issues | ✅ Excellent |
| **Private Repos** | ✅ Yes | ❌ Pro only | ✅ Yes |
| **Setup Complexity** | ⭐ Easy | ⭐⭐ Medium | ⭐⭐⭐ Hard |
| **Auto-scaling** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Custom Domain** | ✅ Free | ✅ Free | ✅ Free |

## Troubleshooting

### Common Issues:

#### Database Connection Errors
- Check `DATABASE_URL` is set correctly
- Verify database service is running
- Test connection with `/api/test-db`

#### Build Failures
- Check Node.js version (should be 18+)
- Verify all dependencies in `package.json`
- Check build logs in Render dashboard

#### Authentication Issues
- Verify `NEXTAUTH_URL` matches your Render URL
- Check `NEXTAUTH_SECRET` is set
- Test with provided test accounts

## Free Tier Limits

### Render Free Tier:
- **750 hours/month** (effectively unlimited for small apps)
- **512MB RAM**
- **1GB storage**
- **PostgreSQL database included**
- **Custom domains**

### Perfect For:
- ✅ Small to medium rental apps
- ✅ Development and testing
- ✅ Personal projects
- ✅ MVP deployments

## Step-by-Step Deployment

### 1. Create Web Service
1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect GitHub → Select "Renter" repository
4. Use these settings:
   - **Name**: `renter-app`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

### 2. Create Database
1. Click "New" → "PostgreSQL"
2. Choose "Free" plan
3. Name: `renter-db`
4. Click "Create Database"

### 3. Connect Database
1. Go to your web service → Environment
2. Add `DATABASE_URL` from your database service
3. Add other environment variables
4. Click "Save Changes"

### 4. Deploy
1. Click "Deploy" in your web service
2. Wait for build to complete (5-10 minutes)
3. Your app will be live!

## Next Steps After Deployment

1. **Set up custom domain** (optional)
2. **Configure monitoring** and alerts
3. **Set up backups** for your database
4. **Configure staging environment**
5. **Set up CI/CD** for automatic deployments

## Security Checklist

- [ ] Environment variables are secure
- [ ] Database password is strong
- [ ] OAuth credentials configured
- [ ] SMTP credentials secure
- [ ] File uploads validated
- [ ] API routes protected
- [ ] CORS properly configured

## Support

- **Render Docs**: [render.com/docs](https://render.com/docs)
- **Community**: [Render Community](https://community.render.com)
- **Status**: [status.render.com](https://status.render.com)