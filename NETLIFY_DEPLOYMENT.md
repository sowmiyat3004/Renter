# 🚀 Netlify Deployment Guide for Renter App

## Prerequisites
- GitHub repository with your code
- Free Supabase account for database
- Netlify account

## Step 1: Set up Free Database (Supabase)

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up for free account
3. Click "New Project"
4. Choose organization and enter project details:
   - **Name**: `renter-app`
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for project to be ready (2-3 minutes)

### 1.2 Get Database Connection String
1. In your Supabase dashboard, go to **Settings** → **Database**
2. Scroll down to **Connection string**
3. Copy the **URI** connection string (looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

### 1.3 Set up Database Schema
```bash
# In your local project directory
npx prisma migrate dev --name init
npx prisma db push
npx prisma db seed
```

## Step 2: Deploy to Netlify

### 2.1 Connect Repository
1. Go to [netlify.com](https://netlify.com)
2. Sign up/login with GitHub
3. Click "New site from Git"
4. Choose "GitHub" and authorize
5. Select your `Renter` repository
6. Click "Deploy site"

### 2.2 Configure Build Settings
Netlify should auto-detect your settings, but verify:
- **Build command**: `npm run netlify:build`
- **Publish directory**: `.next`
- **Node version**: 18

### 2.3 Add Environment Variables
In Netlify dashboard → Site settings → Environment variables:

```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
NEXTAUTH_URL=https://your-app-name.netlify.app
NEXTAUTH_SECRET=your-super-secret-key-here
JWT_SECRET=your-jwt-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 2.4 Deploy
1. Click "Deploy site"
2. Wait for build to complete (5-10 minutes)
3. Your app will be available at `https://your-app-name.netlify.app`

## Step 3: Post-Deployment Setup

### 3.1 Run Database Migration
After deployment, you need to run the database migration:

```bash
# You can do this locally with production DATABASE_URL
DATABASE_URL="your-supabase-url" npx prisma migrate deploy
DATABASE_URL="your-supabase-url" npx prisma db seed
```

### 3.2 Test Your App
1. Visit your Netlify URL
2. Test user registration
3. Test listing creation
4. Test image uploads
5. Test admin functionality

## Step 4: Configure Google OAuth (Optional)

### 4.1 Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URI: `https://your-app-name.netlify.app/api/auth/callback/google`
6. Copy Client ID and Client Secret

### 4.2 Update Netlify Environment Variables
Add the Google OAuth credentials to your Netlify environment variables.

## Step 5: Configure Email (Optional)

### 5.1 Gmail SMTP Setup
1. Enable 2-factor authentication on your Gmail
2. Generate an "App Password" for your application
3. Use your Gmail credentials in SMTP environment variables

## Troubleshooting

### Common Issues:

#### Build Failures
- Check Node.js version (should be 18)
- Ensure all dependencies are in `package.json`
- Check build logs in Netlify dashboard

#### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check if Supabase project is active
- Ensure database schema is migrated

#### API Route Issues
- Check Netlify function logs
- Verify API routes are in `app/api/` directory
- Check redirects in `netlify.toml`

#### Image Upload Issues
- Netlify has file size limits
- Consider using external storage (Cloudinary, AWS S3)
- Check file upload configuration

### Getting Help:
1. Check Netlify build logs
2. Check Supabase logs
3. Test locally with production environment variables
4. Use `npx prisma studio` to inspect database

## Free Tier Limits

### Netlify
- 100GB bandwidth/month
- 300 build minutes/month
- 100GB storage

### Supabase
- 500MB database storage
- 2GB bandwidth/month
- 50,000 monthly active users

## Next Steps After Deployment

1. **Set up custom domain** (optional)
2. **Configure CDN** for better performance
3. **Set up monitoring** and analytics
4. **Configure backups** for your database
5. **Set up staging environment** for testing

## Security Checklist

- [ ] Environment variables are secure
- [ ] Database password is strong
- [ ] OAuth credentials are properly configured
- [ ] SMTP credentials are secure
- [ ] File uploads are validated
- [ ] API routes are protected
- [ ] CORS is properly configured