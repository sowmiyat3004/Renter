# 🚀 Netlify Deployment Guide for Renter Platform

This guide will help you deploy your Renter platform to Netlify with all the necessary configurations.

## 📋 Prerequisites

1. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
2. **GitHub Repository**: Your code should be in GitHub (✅ Already done)
3. **Database**: You'll need a PostgreSQL database (Netlify doesn't support SQLite)

## 🔧 Step 1: Database Setup

Since Netlify doesn't support SQLite, you'll need a PostgreSQL database:

### Option A: Use Netlify's Database Add-ons
- **FaunaDB**: Add FaunaDB add-on in Netlify
- **PlanetScale**: MySQL-compatible database
- **Supabase**: PostgreSQL with additional features

### Option B: External Database Services
- **Railway**: PostgreSQL hosting
- **Neon**: Serverless PostgreSQL
- **Supabase**: Full-stack platform with PostgreSQL

## 🚀 Step 2: Deploy to Netlify

### Method 1: Connect GitHub Repository

1. **Login to Netlify**
2. **Click "New site from Git"**
3. **Choose GitHub** and authorize Netlify
4. **Select your repository**: `sowmiyat3004/Renter`
5. **Configure build settings**:
   - **Build command**: `npm run netlify:build`
   - **Publish directory**: `.next`
   - **Node version**: `18`

### Method 2: Netlify CLI (Recommended)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify in your project
netlify init

# Deploy
netlify deploy --prod
```

## 🔐 Step 3: Environment Variables

Add these environment variables in Netlify Site Settings → Environment Variables:

### Required Variables
```
DATABASE_URL=postgresql://username:password@host:port/database
NEXTAUTH_URL=https://your-site-name.netlify.app
NEXTAUTH_SECRET=your-nextauth-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
JWT_SECRET=your-jwt-secret-key
```

### Optional Variables
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@renter.com
MAX_FILE_SIZE=1048576
MAX_IMAGES_PER_LISTING=10
APP_NAME=Renter
APP_URL=https://your-site-name.netlify.app
DEFAULT_COUNTRY=India
DEFAULT_CURRENCY=INR
DEFAULT_TIMEZONE=Asia/Kolkata
CURRENCY_SYMBOL=₹
```

## 🗄️ Step 4: Database Migration

After deployment, you'll need to run database migrations:

```bash
# Using Netlify CLI
netlify functions:invoke db-migrate

# Or add a build hook to run migrations
```

## 🔧 Step 5: Netlify Functions (Optional)

For server-side features, you might need Netlify Functions:

```javascript
// netlify/functions/api.js
exports.handler = async (event, context) => {
  // Your API logic here
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Netlify Functions!' })
  }
}
```

## 📁 Step 6: File Structure for Netlify

Your project structure should be:
```
renter/
├── netlify.toml          # Netlify configuration
├── package.json          # Dependencies and scripts
├── next.config.js        # Next.js configuration
├── prisma/              # Database schema
├── app/                 # Next.js app directory
├── components/          # React components
├── lib/                 # Utility functions
└── public/              # Static assets
```

## 🚨 Important Considerations

### Limitations of Netlify for Next.js Apps

1. **Server-Side Features**: Some Next.js features may not work on Netlify
2. **Database**: SQLite won't work, need PostgreSQL
3. **File Uploads**: Limited file storage options
4. **Server Functions**: May need Netlify Functions for some API routes

### Recommended Alternatives

For a full-featured Next.js app like Renter, consider:

1. **Vercel** (Recommended for Next.js)
2. **Railway** (Full-stack deployment)
3. **Render** (Docker-based deployment)
4. **DigitalOcean App Platform**

## 🎯 Quick Deploy Commands

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login and deploy
netlify login
netlify init
netlify deploy --prod

# Set environment variables
netlify env:set DATABASE_URL "your-database-url"
netlify env:set NEXTAUTH_SECRET "your-secret"
netlify env:set GOOGLE_CLIENT_ID "your-google-client-id"
netlify env:set GOOGLE_CLIENT_SECRET "your-google-client-secret"
```

## 🔍 Troubleshooting

### Common Issues

1. **Build Failures**: Check Node.js version (use 18)
2. **Database Errors**: Ensure PostgreSQL connection string is correct
3. **Environment Variables**: Make sure all required variables are set
4. **API Routes**: Some may need to be converted to Netlify Functions

### Build Logs

Check Netlify build logs for specific errors:
- Go to Site Settings → Build & Deploy → Build logs

## 📞 Support

If you encounter issues:
1. Check Netlify documentation
2. Review build logs
3. Consider using Vercel for better Next.js support

## 🎉 Success!

Once deployed, your Renter platform will be available at:
`https://your-site-name.netlify.app`

Remember to:
- Set up your database
- Configure environment variables
- Test all features
- Set up custom domain (optional)
