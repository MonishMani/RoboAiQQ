# Pre-Deployment Checklist

## Before You Deploy - Complete These Steps:

### ✅ 1. Supabase Database Tables
- [ ] Log in to [Supabase Dashboard](https://supabase.com/dashboard)
- [ ] Navigate to your project
- [ ] Go to **SQL Editor**
- [ ] Run the following SQL commands:

```sql
-- Table for Register Your Interest form
CREATE TABLE IF NOT EXISTS interest_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  age INTEGER,
  email TEXT,
  phone TEXT,
  interest TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table for Book Free Demo form
CREATE TABLE IF NOT EXISTS demo_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  preferred_date DATE,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

- [ ] Verify tables were created successfully

### ✅ 2. Environment Variables (Already Set)
- [x] VITE_SUPABASE_URL
- [x] VITE_SUPABASE_ANON_KEY

These are already configured in your Vercel project.

### ✅ 3. Deploy Your Changes

**Option A: Using Git (Recommended)**
```bash
git add .
git commit -m "Add mobile responsiveness and Supabase integration"
git push origin main
```

**Option B: Using v0 Interface**
- Click the "Publish" button in v0
- Confirm deployment

### ✅ 4. After Deployment - Test Everything

#### Test Forms:
- [ ] Visit your deployed website
- [ ] Test "Register Your Interest" form
  - [ ] Fill out all fields
  - [ ] Click "Submit Enquiry"
  - [ ] Verify green success message appears
  - [ ] Check Supabase dashboard to confirm data was saved

- [ ] Test "Book Free Demo" form
  - [ ] Fill out all fields
  - [ ] Click submit
  - [ ] Verify success state is shown
  - [ ] Check Supabase dashboard to confirm data was saved

#### Test Mobile Responsiveness:
- [ ] Open DevTools (F12)
- [ ] Toggle device toolbar (Ctrl+Shift+M or Cmd+Shift+M)
- [ ] Test these screen sizes:
  - [ ] iPhone SE (375px width)
  - [ ] iPhone 12/13 (390px width)
  - [ ] Pixel 5 (393px width)
  - [ ] Samsung Galaxy (412px width)
  - [ ] iPad Mini (768px width)

- [ ] Verify Hero section looks good on mobile
- [ ] Verify all sections are readable on small screens
- [ ] Verify buttons are touch-friendly (easy to tap)
- [ ] Verify forms work on mobile

### ✅ 5. Verify Success Messages
- [ ] Submit a form
- [ ] Green success message appears
- [ ] Message auto-clears after 5 seconds
- [ ] Form fields reset after successful submission

---

## Common Issues & Quick Fixes

### Issue: "Cannot read properties of undefined (reading 'useRef')"
**Status:** ✅ Fixed
**Fix Applied:** Added `useRef` to React imports in WeRrcmContactForm.jsx

### Issue: Success message not showing
**Status:** ✅ Fixed
**Fix Applied:** Added `.submit-message` CSS styles with success/error states

### Issue: Forms not saving to database
**Status:** ⚠️ Requires Action
**Fix:** Ensure Supabase tables are created (see step 1 above)

### Issue: Environment variables not working in production
**Status:** ✅ Fixed
**Fix Applied:** Updated supabaseClient.ts to use `import.meta.env` with fallback values

---

## Deployment Commands

If you're using the terminal:

```bash
# Check current branch
git branch

# Check status of changes
git status

# Add all changes
git add .

# Commit with message
git commit -m "Deploy mobile responsiveness and Supabase integration"

# Push to GitHub (triggers Vercel deployment)
git push origin main

# Or push to your current branch
git push
```

---

## Expected Results After Deployment

✅ **Mobile View:**
- Hero section displays properly on small screens
- Text is readable without zooming
- Buttons are easy to tap
- Forms are user-friendly on mobile

✅ **Forms:**
- Data saves to Supabase database
- Success messages appear after submission
- Error messages show if something fails
- Forms reset after successful submission

✅ **Performance:**
- Site loads quickly
- No console errors
- All images and styles load correctly

---

**Ready to deploy?** Follow the steps above and you'll be live in minutes! 🚀
