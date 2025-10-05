# Google OAuth 400 Error Fix Guide

## 🚨 Problem: Google OAuth 400 Error
"The server cannot process the request because it is malformed"

## 🔧 Complete Fix Steps

### Step 1: Google Cloud Console Setup

#### 1.1 Create OAuth 2.0 Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services** → **Credentials**
3. **Create Credentials** → **OAuth 2.0 Client IDs**
4. **Application type**: Web application
5. **Name**: Renter Web Client
6. **Authorized JavaScript origins**:
   ```
   https://your-app-name.onrender.com
   ```
7. **Authorized redirect URIs**:
   ```
   https://your-app-name.onrender.com/api/auth/callback/google
   ```
8. **Click Create**
9. **Copy Client ID and Client Secret**

#### 1.2 Configure OAuth Consent Screen
1. **APIs & Services** → **OAuth consent screen**
2. **User Type**: External
3. **App name**: Renter
4. **User support email**: Your email
5. **Developer contact**: Your email
6. **Scopes**: Add these scopes:
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
7. **Test users**: Add your email address
8. **Save**

#### 1.3 Enable Required APIs
1. **APIs & Services** → **Library**
2. **Search and enable**:
   - **Google+ API**
   - **People API**

### Step 2: Render Environment Variables

Add these to your Render environment:

```
# Google OAuth
GOOGLE_CLIENT_ID=your-actual-client-id-here
GOOGLE_CLIENT_SECRET=your-actual-client-secret-here

# NextAuth
NEXTAUTH_URL=https://your-app-name.onrender.com
NEXTAUTH_SECRET=your-secret-key-here

# Database
DATABASE_URL=your-postgresql-connection-string

# Google Places API
GOOGLE_PLACES_API_KEY=AIzaSyDCmbDs40tr54wjg52EIM5fqhvQmCnJW50
ENABLE_GOOGLE_PLACES=true
```

### Step 3: Test the Setup

1. **Save changes** in Render
2. **Wait for redeploy** (2-3 minutes)
3. **Test Google sign-in**

## 🔍 Common Issues & Solutions

### Issue 1: "This app isn't verified"
- **Solution**: Add your email as a test user in OAuth consent screen

### Issue 2: "Invalid client"
- **Solution**: Double-check Client ID and Secret in Render

### Issue 3: "Redirect URI mismatch"
- **Solution**: Ensure redirect URI exactly matches:
  `https://your-app-name.onrender.com/api/auth/callback/google`

### Issue 4: "Access blocked"
- **Solution**: Enable Google+ API and People API

## 🧪 Debug Steps

1. **Check Render logs** for OAuth errors
2. **Verify environment variables** are set correctly
3. **Test with a test user** email first
4. **Check Google Cloud Console** for any error logs

## ✅ Success Indicators

- Google sign-in button appears
- No 400 error when clicking Google sign-in
- Successful redirect to Google OAuth
- User profile created in database
