# 🚀 Free Deployment Guide for Renter App

## Option 1: Vercel + Supabase (Recommended)

### Step 1: Set up Supabase Database
1. Go to [supabase.com](https://supabase.com)
2. Create a free account
3. Create a new project
4. Go to Settings → Database
5. Copy the connection string (it looks like: `postgresql://postgres:[password]@[host]:5432/postgres`)

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`: Your Supabase connection string
   - `NEXTAUTH_URL`: Your Vercel app URL
   - `NEXTAUTH_SECRET`: Generate a random string
   - `JWT_SECRET`: Generate a random string
   - Add Google OAuth credentials if using Google login
   - Add SMTP credentials for email notifications

### Step 3: Run Database Migration
```bash
# In your local project
npx prisma migrate dev --name init
npx prisma db push
npx prisma db seed
```

## Option 2: Railway (All-in-one)

### Step 1: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Railway will automatically detect your Next.js app
4. Add a PostgreSQL database service
5. Railway will automatically set the `DATABASE_URL`

### Step 2: Environment Variables
Add these in Railway dashboard:
- `NEXTAUTH_URL`: Your Railway app URL
- `NEXTAUTH_SECRET`: Generate a random string
- `JWT_SECRET`: Generate a random string
- Google OAuth and SMTP credentials

## Option 3: Netlify + External Database

### Step 1: Set up Database
Use any of these free options:
- Supabase (PostgreSQL)
- PlanetScale (MySQL)
- Neon (PostgreSQL)

### Step 2: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variables in Netlify dashboard

## Environment Variables Needed

```env
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-secret-key
JWT_SECRET=your-jwt-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
```

## Post-Deployment Steps

1. **Run Database Migration**:
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

2. **Test Your App**:
   - Visit your deployed URL
   - Test user registration
   - Test listing creation
   - Test image uploads

## Free Tier Limits

### Vercel
- 100GB bandwidth/month
- 100 serverless function executions
- Unlimited static deployments

### Supabase
- 500MB database storage
- 2GB bandwidth/month
- 50,000 monthly active users

### Railway
- $5 credit monthly
- 512MB RAM
- 1GB storage

## Troubleshooting

### Common Issues:
1. **Database connection errors**: Check your `DATABASE_URL`
2. **Build failures**: Ensure all dependencies are in `package.json`
3. **Image upload issues**: Check file size limits and storage configuration
4. **Authentication errors**: Verify OAuth credentials and URLs

### Getting Help:
- Check deployment logs in your hosting platform
- Test locally with production environment variables
- Use `npx prisma studio` to inspect your database
