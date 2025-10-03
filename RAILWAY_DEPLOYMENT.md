# 🚀 Railway Deployment Guide - Free Hosting with Database

## Why Railway?
- ✅ **Free tier**: $5 credit monthly (effectively free for small apps)
- ✅ **Bundled PostgreSQL**: Database included, no separate setup needed
- ✅ **One-click deployment**: Connect GitHub and deploy
- ✅ **Auto-scaling**: Handles traffic automatically
- ✅ **Custom domains**: Free subdomain included

## Step 1: Deploy to Railway

### 1.1 Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your "Renter" repository

### 1.2 Railway Auto-Detection
Railway will automatically detect:
- ✅ **Framework**: Next.js
- ✅ **Build command**: `npm run build`
- ✅ **Start command**: `npm start`
- ✅ **Node.js version**: 18+

## Step 2: Add PostgreSQL Database

### 2.1 Add Database Service
1. In your Railway project dashboard
2. Click "New" → "Database" → "PostgreSQL"
3. Railway will automatically:
   - Create a PostgreSQL database
   - Set `DATABASE_URL` environment variable
   - Configure connection settings

### 2.2 Database Configuration
Railway automatically sets:
```env
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/railway
```

## Step 3: Configure Environment Variables

### 3.1 Required Variables
In Railway dashboard → Variables tab, add:

```env
NEXTAUTH_URL=https://your-app-name.railway.app
NEXTAUTH_SECRET=your-super-secret-key-here
JWT_SECRET=your-jwt-secret-key-here
MIGRATION_TOKEN=your-migration-token
```

### 3.2 Optional Variables (for full functionality)
```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Step 4: Database Migration

### 4.1 Run Migration
After deployment, Railway will automatically run:
```bash
npx prisma migrate deploy
npx prisma db seed
```

### 4.2 Test Database Connection
Visit: `https://your-app-name.railway.app/api/test-db`

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

## Railway vs Other Platforms

| Feature | Railway | Netlify | Render |
|---------|---------|---------|--------|
| **Database Included** | ✅ PostgreSQL | ❌ External needed | ✅ PostgreSQL |
| **Free Tier** | $5 credit/month | 100GB bandwidth | Limited |
| **Setup Complexity** | ⭐ Easy | ⭐⭐ Medium | ⭐⭐ Medium |
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
- Check build logs in Railway dashboard

#### Authentication Issues
- Verify `NEXTAUTH_URL` matches your Railway URL
- Check `NEXTAUTH_SECRET` is set
- Test with provided test accounts

## Free Tier Limits

### Railway Free Tier:
- **$5 credit monthly** (effectively free for small apps)
- **512MB RAM**
- **1GB storage**
- **Unlimited bandwidth**
- **PostgreSQL database included**

### Perfect For:
- ✅ Small to medium rental apps
- ✅ Development and testing
- ✅ Personal projects
- ✅ MVP deployments

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

- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Community**: [Railway Discord](https://discord.gg/railway)
- **Status**: [status.railway.app](https://status.railway.app)