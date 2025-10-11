# 📍 WHERE TO FIND & ADD API KEY IN RENDER

## Step-by-Step with Screenshots Description

### Step 1: Go to Render Dashboard
1. Open your browser
2. Go to: **https://dashboard.render.com/**
3. Log in to your account

---

### Step 2: Find Your Web Service
1. You'll see a list of your services
2. Look for your service name (probably "broker360-app" or "renter-app")
3. **Click on the service name**

---

### Step 3: Go to Environment Tab
1. Once inside your service, look at the **left sidebar** or **top tabs**
2. You'll see tabs like:
   - Overview
   - Logs
   - **Environment** ← CLICK THIS
   - Settings
   - etc.
3. **Click "Environment"**

---

### Step 4: See Your Current Variables
You'll see a list like this:

```
┌─────────────────────────────────────────────┐
│ Environment Variables                        │
├─────────────────────────────────────────────┤
│ DATABASE_URL          = postgresql://...    │
│ NEXTAUTH_URL          = https://...         │
│ NEXTAUTH_SECRET       = abc123...           │
│ GOOGLE_PLACES_API_KEY = AIza...  ← FIND THIS│
│ JWT_SECRET            = xyz789...           │
└─────────────────────────────────────────────┘
```

---

### Step 5: Copy Your Existing API Key
1. Find the line that says: **`GOOGLE_PLACES_API_KEY`**
2. Look at its value (starts with `AIza...`)
3. **Click the "eye" icon** to reveal the full key
4. **Copy the entire value** (right-click → Copy, or Ctrl+C)

Example value looks like:
```
AIzaSyBx1234567890abcdefGHIJKLMNOP_example
```

---

### Step 6: Add New Variable
1. Look for a button that says **"Add Environment Variable"** or **"+ Add Variable"**
2. Click it
3. You'll see two fields:

```
┌─────────────────────────────────────────────┐
│ Add Environment Variable                     │
├─────────────────────────────────────────────┤
│ Key:   [                                   ] │
│ Value: [                                   ] │
│                                              │
│ [Cancel]  [Add]                              │
└─────────────────────────────────────────────┘
```

4. In **Key** field, type EXACTLY:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
   ```

5. In **Value** field, paste the API key you copied from step 5

6. Click **"Add"** or **"Save"**

---

### Step 7: Verify Both Variables Exist
After adding, you should see:

```
┌─────────────────────────────────────────────────────┐
│ Environment Variables                                │
├─────────────────────────────────────────────────────┤
│ GOOGLE_PLACES_API_KEY          = AIza...      ✅    │
│ NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = AIza...     ✅    │
│                                  (same value)        │
└─────────────────────────────────────────────────────┘
```

**Both should have the SAME value!**

---

### Step 8: Redeploy
1. Go back to the **"Overview"** tab (or "Deploys" tab)
2. Look for **"Manual Deploy"** button (usually top right)
3. Click **"Manual Deploy"** → **"Deploy latest commit"**
4. Wait 2-3 minutes for deployment to complete

---

## 🔍 What If You Don't Have GOOGLE_PLACES_API_KEY Yet?

### You Need to Create a Google API Key First:

1. **Go to Google Cloud Console:**
   - https://console.cloud.google.com/

2. **Create/Select Project:**
   - Click dropdown at top → "New Project"
   - Name it "Broker360"
   - Click "Create"

3. **Enable APIs:**
   - Go to "APIs & Services" → "Library"
   - Search and enable:
     - Maps JavaScript API
     - Places API
     - Geocoding API

4. **Create API Key:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the key (looks like: `AIzaSyB...`)

5. **Add to Render (BOTH variables):**
   ```
   GOOGLE_PLACES_API_KEY = [paste key]
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = [paste same key]
   ```

---

## 📍 Exact Location in Render UI

```
render.com
    └─ Dashboard
        └─ Your Service (click)
            └─ Environment Tab (click) ← YOU ARE HERE
                ├─ List of variables
                ├─ GOOGLE_PLACES_API_KEY ← Copy this value
                └─ [+ Add Environment Variable] ← Click here
                    └─ Add: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
```

---

## ✅ Quick Checklist

- [ ] Logged into Render dashboard
- [ ] Clicked on your web service
- [ ] Clicked "Environment" tab
- [ ] Found `GOOGLE_PLACES_API_KEY` variable
- [ ] Copied its value
- [ ] Clicked "+ Add Environment Variable"
- [ ] Added key: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- [ ] Pasted the same value
- [ ] Clicked "Save" or "Add"
- [ ] Went to "Manual Deploy"
- [ ] Clicked "Deploy latest commit"
- [ ] Waited for deployment to finish

---

## 🎯 After Deployment

Test it:
1. Go to: `https://your-app.onrender.com/listings/create-enhanced`
2. Location field should work!
3. Type "Koramangala" → See suggestions
4. No more "Failed to load" error!

---

## 🆘 Still Can't Find It?

### Option 1: Check All Tabs
The Environment tab might be in different places:
- Top navigation bar
- Left sidebar
- Under "Settings" dropdown

### Option 2: Use Search
- Press Ctrl+F (or Cmd+F on Mac)
- Type "Environment"
- Look for the section

### Option 3: Check Documentation
- Render changes UI sometimes
- Look for "Environment Variables" or "Env Vars"

---

## 💡 Pro Tip

If you can't find `GOOGLE_PLACES_API_KEY` in Render, you need to:
1. Create a Google API key first (see above)
2. Add BOTH variables at the same time

---

**The key is in:** Render Dashboard → Your Service → Environment Tab → List of Variables

Look for the one that starts with `AIza...` - that's your Google API key! 🔑

