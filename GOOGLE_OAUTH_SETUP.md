# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for the Renter application.

## Step 1: Create Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" and then "New Project"
3. Enter project name: "Renter App" (or your preferred name)
4. Click "Create"

## Step 2: Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API" and click on it
3. Click "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type (unless you have a Google Workspace account)
3. Fill in the required information:
   - **App name**: Renter
   - **User support email**: Your email address
   - **Developer contact information**: Your email address
4. Click "Save and Continue"
5. Skip the "Scopes" step for now
6. Add test users (your email address) in the "Test users" section
7. Click "Save and Continue"

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Fill in the details:
   - **Name**: Renter Web Client
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (for development)
     - `https://your-domain.com` (for production)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google` (for development)
     - `https://your-domain.com/api/auth/callback/google` (for production)
5. Click "Create"
6. Copy the **Client ID** and **Client Secret**

## Step 5: Configure Environment Variables

Add the following to your `.env.local` file:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here
```

## Step 6: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/auth/signin`

3. You should see a "Sign in with Google" button

4. Click the button and test the OAuth flow

## Production Setup

For production deployment:

1. **Update OAuth Consent Screen**:
   - Go to "OAuth consent screen" in Google Cloud Console
   - Change from "Testing" to "Production"
   - Add your production domain to authorized origins and redirect URIs

2. **Update Environment Variables**:
   ```env
   NEXTAUTH_URL=https://your-domain.com
   GOOGLE_CLIENT_ID=your-production-client-id
   GOOGLE_CLIENT_SECRET=your-production-client-secret
   ```

## Troubleshooting

### Common Issues

1. **"Error 400: redirect_uri_mismatch"**
   - Check that your redirect URI in Google Console matches exactly
   - Ensure the URL is correct: `http://localhost:3000/api/auth/callback/google`

2. **"Error 403: access_denied"**
   - Make sure you've added your email as a test user
   - Check that the OAuth consent screen is properly configured

3. **"Error 401: invalid_client"**
   - Verify your Client ID and Client Secret are correct
   - Check that the credentials are properly set in environment variables

4. **"This app isn't verified"**
   - This is normal for development/testing
   - Click "Advanced" and then "Go to Renter (unsafe)" to proceed
   - For production, you'll need to go through Google's verification process

### Debug Steps

1. **Check Environment Variables**:
   ```bash
   # Make sure these are set correctly
   echo $GOOGLE_CLIENT_ID
   echo $GOOGLE_CLIENT_SECRET
   echo $NEXTAUTH_URL
   ```

2. **Check Network Tab**:
   - Open browser developer tools
   - Go to Network tab
   - Try to sign in with Google
   - Look for any failed requests

3. **Check Console Logs**:
   - Look for any error messages in the browser console
   - Check server logs for authentication errors

## Security Best Practices

1. **Keep Credentials Secure**:
   - Never commit `.env.local` to version control
   - Use different credentials for development and production
   - Rotate credentials regularly

2. **Configure Redirect URIs Properly**:
   - Only add necessary redirect URIs
   - Remove unused redirect URIs
   - Use HTTPS in production

3. **Monitor Usage**:
   - Check Google Cloud Console for API usage
   - Set up billing alerts if needed
   - Monitor for suspicious activity

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [NextAuth.js Google Provider](https://next-auth.js.org/providers/google)
- [Google Cloud Console](https://console.cloud.google.com/)

---

If you encounter any issues, please check the troubleshooting section above or create an issue in the repository.
