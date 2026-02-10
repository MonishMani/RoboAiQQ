# How to Deploy Your Changes to Production

## Your Current Setup
- **Repository**: MonishMani/RoboAiQQ
- **Branch**: supabase-integration
- **Current Status**: Changes are only in v0, not deployed yet

## Step-by-Step Deployment Process

### Option 1: Use v0's Git Sidebar (EASIEST)

1. **Look at the left sidebar** in v0
2. Click on the **"Git"** icon (looks like a branch symbol)
3. You should see your changes listed
4. Click **"Create Pull Request"** or **"Push Changes"**
5. This will automatically push to GitHub and trigger deployment

### Option 2: Manual Git Commands

If you have access to a terminal on your local machine:

```bash
# Navigate to your project folder
cd path/to/RoboAiQQ

# Check current status
git status

# Add all changes
git add .

# Commit with a message
git commit -m "Add Supabase integration and mobile responsiveness"

# Push to GitHub (this triggers Vercel deployment)
git push origin supabase-integration
```

### Option 3: Download and Upload to GitHub

1. **Download your project**: 
   - In v0, look for a download/export option
   - Or click the three dots menu in the code preview

2. **Go to GitHub**:
   - Visit: https://github.com/MonishMani/RoboAiQQ
   - Navigate to the `supabase-integration` branch
   - Upload the changed files manually

3. **Commit the changes** through GitHub's web interface

## What Happens After Pushing?

Once you push to GitHub:
1. ✅ Vercel automatically detects the changes
2. ✅ A new deployment starts (takes ~2-5 minutes)
3. ✅ Your changes go live at your production URL
4. ✅ Environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) are automatically available

## Before Deploying - Database Setup Required!

⚠️ **IMPORTANT**: Create Supabase tables first or forms will fail!

Go to https://supabase.com → Your Project → SQL Editor → Run this:

```sql
-- Table for Register Your Interest form
CREATE TABLE interest_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  age INTEGER,
  email TEXT,
  phone TEXT,
  interest TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table for Book Free Demo form  
CREATE TABLE demo_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  preferred_date DATE,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Verifying Deployment

After ~2-5 minutes:
1. Visit your production URL
2. Check mobile responsiveness (use Chrome DevTools or your phone)
3. Test form submissions (check Supabase dashboard for entries)
4. Verify success messages appear on forms

## Troubleshooting

**If forms don't work after deployment:**
- Verify environment variables in Vercel dashboard
- Check Supabase tables exist
- Check browser console for errors (F12)

**If mobile styles don't appear:**
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache
- Check if CSS files were included in the commit

## Files Changed in This Update

1. **Supabase Integration**:
   - `src/lib/supabaseClient.ts` (new)
   - `src/lib/form-submissions.ts` (new)
   - `src/components/WeRrcmContactForm.jsx` (modified)
   - `src/components/BookingModal.jsx` (modified)

2. **Mobile Responsiveness**:
   - `src/components/HeroSection.css` (modified)
   - `src/components/HeroSection-mobile.css` (new)
   - `src/components/BenefitsSection.css` (modified)
   - `src/components/WeRrcmUnique.css` (modified)
   - `src/components/GallerySection.css` (modified)
   - `src/components/RoboKitSection.css` (modified)
   - `src/components/StatsBanner.css` (modified)
   - `src/components/Footer.css` (modified)
   - `src/components/WeRrcmContactForm.css` (modified)
   - `src/components/BookingModal.css` (modified)
   - `src/App.jsx` (modified)
   - `src/styles/mobile-enhancements.css` (new)

3. **Bug Fixes**:
   - Fixed React import error in WeRrcmContactForm.jsx
   - Added environment variables for Supabase

## Need Help?

If you're still stuck:
1. Check the v0 chat - there should be a Git icon in the left sidebar
2. Look for "Settings" → "Git" in the v0 interface
3. Or manually download the code and upload to GitHub
