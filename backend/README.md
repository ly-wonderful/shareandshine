# ShareShine Community Platform - Backend

Backend API server for the ShareShine Community Platform built with Node.js, Express, and Supabase.

## Features

- RESTful API endpoints for events, members, and partners
- Supabase PostgreSQL database integration
- CORS enabled for frontend communication
- Error handling and logging
- Environment-based configuration

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account and project

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings → API
3. Copy your project URL and keys

### 3. Set Up Database

1. Open your Supabase project's SQL Editor
2. Run the schema from `database/schema.sql`
3. This will create all necessary tables and indexes

### 4. Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

PORT=3000
NODE_ENV=development

FRONTEND_URL=http://localhost:5173
```

### 5. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start at `http://localhost:3000`

## API Endpoints

### Events

- `GET /api/events` - Get all events (supports `?type=past|upcoming` and `?sort=date`)
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Members

- `GET /api/members` - Get all member applications
- `GET /api/members/:id` - Get member by ID
- `POST /api/members` - Create new member application
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Partners

- `GET /api/partners` - Get all partner applications
- `GET /api/partners/:id` - Get partner by ID
- `POST /api/partners` - Create new partner application
- `PUT /api/partners/:id` - Update partner
- `DELETE /api/partners/:id` - Delete partner

### Health Check

- `GET /health` - Server health status

## Database Schema

### Events Table
- id (UUID, Primary Key)
- title, description, date, time, location
- type (past/upcoming)
- category, image_url, video_url
- highlights (array), participants_count
- impact_summary, max_participants
- registration_deadline
- timestamps

### Members Table
- id (UUID, Primary Key)
- full_name, email, phone, age
- school_organization, interests, why_join
- status (pending/approved/rejected)
- timestamps

### Partners Table
- id (UUID, Primary Key)
- organization_name, contact_person
- email, phone, organization_type, website
- partnership_interest (array)
- donation_amount, event_ideas, message
- status (pending/approved/rejected)
- timestamps

## Connecting Frontend

Update your frontend API client (`frontend/src/api/apiClient.js`) to point to:

```javascript
baseURL: 'http://localhost:3000'
```

## Security Notes

- Service role key is used in backend for admin operations (bypasses RLS)
- Never expose service role key in frontend
- Row Level Security (RLS) is enabled on all tables
- Public read access is allowed for viewing data
- Public insert access for member/partner applications

## Troubleshooting

1. **Connection Error**: Verify Supabase URL and keys in `.env`
2. **CORS Error**: Check `FRONTEND_URL` in `.env` matches your frontend URL
3. **Database Error**: Ensure schema.sql has been run in Supabase SQL Editor
4. **Port Already in Use**: Change `PORT` in `.env` to another value

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in environment variables
2. Use production Supabase credentials
3. Update `FRONTEND_URL` to your production domain
4. Consider using a process manager like PM2
5. Set up proper SSL/TLS certificates

## License

ISC
