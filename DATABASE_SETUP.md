# Database Setup & Debugging Guide

## Step 1: Create Database Tables in Supabase

1. Go to your Supabase project: https://supabase.com/dashboard/project/fhvieawrkgrlqqfxtpqf
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the entire contents of `backend/database/schema.sql`
5. Click **Run** to create all tables

## Step 2: Verify Tables Were Created

In Supabase:
1. Go to **Table Editor**
2. You should see 3 tables: `events`, `members`, `partners`

## Step 3: Configure Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables (for all environments: Production, Preview, Development):

```
SUPABASE_URL=https://fhvieawrkgrlqqfxtpqf.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZodmllYXdya2dybHFxZnh0cHFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NjkyMDksImV4cCI6MjA4MTI0NTIwOX0.EZHblsUe8LMGDTMJ72wciKkeFfCps0qSaPqRMAmai88
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZodmllYXdya2dybHFxZnh0cHFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTY2OTIwOSwiZXhwIjoyMDgxMjQ1MjA5fQ.d41py1INzh7hc-S32rE5F1xVI_oPUxcxiS5O-mKpfDY
```

4. Click **Save** after adding each variable
5. **Redeploy** your project from the Deployments tab

## Step 4: Test the Connection

After redeployment, test your API:

Visit: `https://your-site.vercel.app/api/health`

You should see:
```json
{
  "status": "ok",
  "message": "ShareShine Backend API is running"
}
```

Then test events endpoint:
`https://your-site.vercel.app/api/events`

## Common Issues & Solutions

### Issue 1: "Missing Supabase environment variables"
**Solution:** Make sure all 3 environment variables are set in Vercel and redeploy.

### Issue 2: "PGRST116 or PGRST204 errors"
**Solution:** Tables don't exist. Run the schema.sql in Supabase SQL Editor.

### Issue 3: "permission denied for table"
**Solution:** RLS policies aren't set. Make sure you ran the complete schema.sql including the policies at the bottom.

### Issue 4: API returns 404
**Solution:** Serverless function not deployed. Check vercel.json is correct and api/index.js exists.

## Local Development

Your local setup is already configured. To test locally:

```bash
cd backend
npm install
npm start
```

Then in another terminal:
```bash
cd frontend
npm install
npm run dev
```

Visit: http://localhost:5173
