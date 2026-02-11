# Supabase Setup Instructions

## ✅ Completed Implementation

All Supabase backend logic has been added to the existing project.

### Files Created:

1. **src/lib/supabaseClient.ts** - Supabase client configuration
2. **src/lib/form-submissions.ts** - Form submission functions

### Files Modified:

1. **package.json** - Added @supabase/supabase-js dependency
2. **src/components/WeRrcmContactForm.jsx** - Integrated interest registration form
3. **src/components/BookingModal.jsx** - Integrated demo booking form

---

## 🔧 Setup Steps

### 1. Add Your Supabase Credentials

Open **src/lib/supabaseClient.ts** and replace the placeholders:

```typescript
export const supabase = createClient(
  "YOUR_SUPABASE_URL_HERE",        // Replace this
  "YOUR_SUPABASE_ANON_KEY_HERE"    // Replace this
)
```

### 2. Install Dependencies

Run in your project root:

```bash
npm install
```

### 3. Database Schema

Ensure these two tables exist in your Supabase database:

#### Table 1: `interest_registrations`
```sql
CREATE TABLE interest_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  age INTEGER NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  interest TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Table 2: `demo_requests`
```sql
CREATE TABLE demo_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_date TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 📋 Form Mappings

### Form 1: Register Your Interest (WeRrcmContactForm.jsx)
Submits to table: **interest_registrations**

Fields:
- `student_name` - Student Name
- `age` - Age (converted to number)
- `email` - Email Address
- `phone` - Phone Number
- `interest` - Tell us about your interest (textarea)

### Form 2: Book Your Free Demo (BookingModal.jsx)
Submits to table: **demo_requests**

Fields:
- `name` - Parent Name
- `email` - Email Address
- `phone` - Contact Number
- `preferred_date` - null (not collected in this form)
- `message` - Combined student details (student name, grade, school, city, pincode)

---

## ✨ Features Implemented

### Register Your Interest Form:
- ✅ Form state management
- ✅ Real-time validation
- ✅ Supabase integration
- ✅ Success/error messages
- ✅ Submit button disabled during submission
- ✅ Form reset on success
- ✅ Loading state

### Book Free Demo Form:
- ✅ Form state management with validation
- ✅ Real-time field validation
- ✅ Supabase integration
- ✅ Success screen after submission
- ✅ Submit button disabled during submission
- ✅ Form reset on close after success
- ✅ Loading state

---

## 🚀 Testing

1. Add your Supabase credentials
2. Run `npm install`
3. Run `npm run dev`
4. Test both forms:
   - Register Your Interest (on Contact section)
   - Book Your Free Demo (modal)
5. Check your Supabase dashboard to verify data is being inserted

---

## 🔒 Security Notes

- The anon key is safe to use in client-side code
- Set up Row Level Security (RLS) policies in Supabase to protect your data
- Consider adding rate limiting to prevent spam
- Add email validation on the backend as well

---

## 📝 Next Steps (Optional)

1. Enable RLS policies in Supabase
2. Set up email notifications when forms are submitted
3. Add analytics tracking for form submissions
4. Add CAPTCHA to prevent spam
5. Add thank you emails to users after submission
