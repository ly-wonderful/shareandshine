# ShareShine Platform - Development Setup

## Frontend + Backend Connection Guide

### Prerequisites
- Node.js v18+
- Supabase account
- Two terminal windows

### Quick Start

#### Terminal 1: Backend Server
```powershell
# Navigate to backend
cd backend

# Install dependencies (first time only)
npm install

# Configure environment (first time only)
# Edit .env with your Supabase credentials
notepad .env

# Start backend server
npm run dev
```

Backend will run at: `http://localhost:3000`

#### Terminal 2: Frontend App
```powershell
# Navigate to frontend
cd frontend

# Install dependencies (first time only)
npm install

# Start frontend dev server
npm run dev
```

Frontend will run at: `http://localhost:5173`

### Verify Connection

1. **Test Backend Health:**
   - Open browser: `http://localhost:3000/health`
   - Should see: `{"status":"ok","message":"ShareShine Backend API is running"}`

2. **Test Frontend:**
   - Open browser: `http://localhost:5173`
   - Check browser console for any errors
   - Try creating a member/partner application to test API calls

### API Endpoints

All API calls from frontend go to `http://localhost:3000/api/`

- **Events:** `/api/events`
- **Members:** `/api/members`
- **Partners:** `/api/partners`

### Environment Variables

#### Backend (.env)
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

#### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
VITE_APP_ID=shareshine-app
```

### Troubleshooting

#### CORS Errors
- Ensure backend is running on port 3000
- Check FRONTEND_URL in backend .env matches your frontend URL

#### Connection Refused
- Verify backend server is running
- Check if port 3000 is available: `netstat -ano | findstr :3000`

#### Database Errors
- Verify Supabase credentials in backend .env
- Ensure database schema has been created (run schema.sql in Supabase)

#### API Not Found (404)
- Check that backend routes are properly registered
- Verify API endpoint paths match between frontend and backend

### Development Workflow

1. Start backend first (port 3000)
2. Start frontend second (port 5173)
3. Make changes to either side
4. Both servers auto-reload on file changes

### Testing the Connection

**Method 1: Browser Console**
```javascript
fetch('http://localhost:3000/health')
  .then(r => r.json())
  .then(console.log)
```

**Method 2: Test Form Submission**
1. Go to `http://localhost:5173/member-form`
2. Fill out and submit the form
3. Check backend terminal for request log
4. Check Supabase dashboard for new record

**Method 3: Test Events Page**
1. Go to `http://localhost:5173/admin-past-events`
2. Create a new event
3. Check backend logs
4. Verify event appears in list

### Production Notes

- Frontend API URL will change to your production domain
- Update VITE_API_URL in frontend production build
- Update FRONTEND_URL in backend production environment
- Ensure CORS is configured for production domain
