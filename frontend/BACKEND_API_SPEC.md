# Backend API Specification

This document describes the API endpoints that need to be implemented on your backend server to support the migrated frontend application.

## Base Configuration

**Base URL**: Set via `VITE_API_URL` environment variable (e.g., `http://localhost:3000`)

**Authentication**: All authenticated requests include:
```
Authorization: Bearer <token>
X-App-Id: <app-id>
```

## Authentication Endpoints

### Get Current User
```
GET /api/auth/me
Headers:
  Authorization: Bearer <token>
  X-App-Id: <app-id>

Response: 200 OK
{
  "id": "user-123",
  "email": "user@example.com",
  "name": "John Doe",
  ...
}

Response: 401 Unauthorized
{
  "message": "Invalid or expired token"
}
```

### Login Redirect
```
GET /auth/login?redirect=<url>

Response: 302 Redirect
Location: /dashboard?access_token=<token>
```

## Events API

### List Events with Filters
```
GET /api/events?type=upcoming&sort=date
Headers:
  X-App-Id: <app-id>

Query Parameters:
  - type: "upcoming" | "past" | "all"
  - sort: "date" | "-date" | "title" | etc.
  - any custom filter fields

Response: 200 OK
[
  {
    "id": "event-123",
    "title": "Community Workshop",
    "description": "Learn web development",
    "date": "2025-12-15T00:00:00Z",
    "time": "2:00 PM - 5:00 PM",
    "location": "Community Center",
    "category": "workshop",
    "type": "upcoming",
    "image_url": "https://example.com/image.jpg",
    "max_participants": 50,
    "created_at": "2025-12-01T00:00:00Z",
    "updated_at": "2025-12-01T00:00:00Z"
  },
  ...
]
```

### Get Single Event
```
GET /api/events/:id
Headers:
  X-App-Id: <app-id>

Response: 200 OK
{
  "id": "event-123",
  "title": "Community Workshop",
  "description": "Learn web development",
  "date": "2025-12-15T00:00:00Z",
  "time": "2:00 PM - 5:00 PM",
  "location": "Community Center",
  "category": "workshop",
  "type": "upcoming",
  "image_url": "https://example.com/image.jpg",
  "max_participants": 50,
  "created_at": "2025-12-01T00:00:00Z",
  "updated_at": "2025-12-01T00:00:00Z"
}

Response: 404 Not Found
{
  "message": "Event not found"
}
```

### Create Event
```
POST /api/events
Headers:
  Authorization: Bearer <token>
  X-App-Id: <app-id>
  Content-Type: application/json

Body:
{
  "title": "Community Workshop",
  "description": "Learn web development",
  "date": "2025-12-15T00:00:00Z",
  "time": "2:00 PM - 5:00 PM",
  "location": "Community Center",
  "category": "workshop",
  "type": "upcoming",
  "image_url": "https://example.com/image.jpg",
  "max_participants": 50
}

Response: 201 Created
{
  "id": "event-123",
  ...created event data
}
```

### Update Event
```
PUT /api/events/:id
Headers:
  Authorization: Bearer <token>
  X-App-Id: <app-id>
  Content-Type: application/json

Body:
{
  "title": "Updated Title",
  ...fields to update
}

Response: 200 OK
{
  "id": "event-123",
  ...updated event data
}
```

### Delete Event
```
DELETE /api/events/:id
Headers:
  Authorization: Bearer <token>
  X-App-Id: <app-id>

Response: 204 No Content
```

## Event Registrations API

### Create Registration
```
POST /api/event-registrations
Headers:
  X-App-Id: <app-id>
  Content-Type: application/json

Body:
{
  "event_id": "event-123",
  "event_title": "Community Workshop",
  "participant_name": "Jane Smith",
  "participant_email": "jane@example.com",
  "participant_phone": "(555) 123-4567",
  "dietary_restrictions": "Vegetarian",
  "special_requirements": "Wheelchair access needed"
}

Response: 201 Created
{
  "id": "registration-456",
  "event_id": "event-123",
  "participant_name": "Jane Smith",
  "participant_email": "jane@example.com",
  "participant_phone": "(555) 123-4567",
  "dietary_restrictions": "Vegetarian",
  "special_requirements": "Wheelchair access needed",
  "created_at": "2025-12-03T10:00:00Z"
}
```

### List Registrations
```
GET /api/event-registrations?event_id=event-123
Headers:
  Authorization: Bearer <token>
  X-App-Id: <app-id>

Response: 200 OK
[
  {
    "id": "registration-456",
    "event_id": "event-123",
    "participant_name": "Jane Smith",
    ...
  },
  ...
]
```

### Get Single Registration
```
GET /api/event-registrations/:id
Headers:
  Authorization: Bearer <token>
  X-App-Id: <app-id>

Response: 200 OK
{
  "id": "registration-456",
  "event_id": "event-123",
  ...
}
```

### Update Registration
```
PUT /api/event-registrations/:id
Headers:
  Authorization: Bearer <token>
  X-App-Id: <app-id>
  Content-Type: application/json

Body:
{
  "participant_phone": "(555) 999-8888",
  ...fields to update
}

Response: 200 OK
{
  "id": "registration-456",
  ...updated registration data
}
```

### Delete Registration
```
DELETE /api/event-registrations/:id
Headers:
  Authorization: Bearer <token>
  X-App-Id: <app-id>

Response: 204 No Content
```

## Members API

### Create Member
```
POST /api/members
Headers:
  X-App-Id: <app-id>
  Content-Type: application/json

Body:
{
  "full_name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "(555) 123-4567",
  "age": "22",
  "school_organization": "Local University",
  "interests": "Community service, event planning",
  "why_join": "I want to make a difference in my community"
}

Response: 201 Created
{
  "id": "member-789",
  "full_name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "(555) 123-4567",
  "age": "22",
  "school_organization": "Local University",
  "interests": "Community service, event planning",
  "why_join": "I want to make a difference in my community",
  "status": "pending",
  "created_at": "2025-12-03T10:00:00Z"
}
```

### List Members
```
GET /api/members?status=approved
Headers:
  Authorization: Bearer <token>
  X-App-Id: <app-id>

Response: 200 OK
[
  {
    "id": "member-789",
    "full_name": "Jane Smith",
    ...
  },
  ...
]
```

### Get Single Member
```
GET /api/members/:id
Headers:
  Authorization: Bearer <token>
  X-App-Id: <app-id>

Response: 200 OK
{
  "id": "member-789",
  "full_name": "Jane Smith",
  ...
}
```

### Update Member
```
PUT /api/members/:id
Headers:
  Authorization: Bearer <token>
  X-App-Id: <app-id>
  Content-Type: application/json

Body:
{
  "status": "approved",
  ...fields to update
}

Response: 200 OK
{
  "id": "member-789",
  ...updated member data
}
```

### Delete Member
```
DELETE /api/members/:id
Headers:
  Authorization: Bearer <token>
  X-App-Id: <app-id>

Response: 204 No Content
```

## Query API (Optional)

### Execute Custom Query
```
POST /api/query
Headers:
  Authorization: Bearer <token>
  X-App-Id: <app-id>
  Content-Type: application/json

Body:
{
  "query": "SELECT * FROM events WHERE type = 'upcoming'"
}

Response: 200 OK
{
  "results": [...],
  "count": 10
}
```

## App Public Settings (Optional)

### Get App Settings
```
GET /api/apps/public/prod/public-settings/by-id/:appId
Headers:
  X-App-Id: <app-id>

Response: 200 OK
{
  "id": "app-123",
  "public_settings": {
    "name": "ShareShine Community Platform",
    "logo": "...",
    ...
  }
}

Response: 403 Forbidden
{
  "message": "Access denied",
  "extra_data": {
    "reason": "auth_required" | "user_not_registered"
  }
}
```

## Integration Endpoints (Optional)

These endpoints are stubs in the frontend. Implement only if needed:

### Invoke LLM
```
POST /api/integrations/llm
Headers:
  Authorization: Bearer <token>
  X-App-Id: <app-id>
  Content-Type: application/json

Body:
{
  "prompt": "Generate event description",
  "model": "gpt-4",
  ...
}

Response: 200 OK
{
  "result": "Generated text..."
}
```

### Send Email
```
POST /api/integrations/email
Headers:
  Authorization: Bearer <token>
  X-App-Id: <app-id>
  Content-Type: application/json

Body:
{
  "to": "user@example.com",
  "subject": "Event Registration Confirmation",
  "body": "Thank you for registering..."
}

Response: 200 OK
{
  "message": "Email sent successfully"
}
```

### Send SMS
```
POST /api/integrations/sms
Headers:
  Authorization: Bearer <token>
  X-App-Id: <app-id>
  Content-Type: application/json

Body:
{
  "to": "+15551234567",
  "message": "Event reminder..."
}

Response: 200 OK
{
  "message": "SMS sent successfully"
}
```

### Upload File
```
POST /api/integrations/upload
Headers:
  Authorization: Bearer <token>
  X-App-Id: <app-id>
  Content-Type: multipart/form-data

Body: FormData with file

Response: 200 OK
{
  "url": "https://cdn.example.com/files/abc123.jpg",
  "filename": "event-photo.jpg"
}
```

### Generate Image
```
POST /api/integrations/image
Headers:
  Authorization: Bearer <token>
  X-App-Id: <app-id>
  Content-Type: application/json

Body:
{
  "prompt": "Community event poster",
  "size": "1024x1024"
}

Response: 200 OK
{
  "url": "https://cdn.example.com/generated/xyz789.png"
}
```

### Extract Data from File
```
POST /api/integrations/extract
Headers:
  Authorization: Bearer <token>
  X-App-Id: <app-id>
  Content-Type: application/json

Body:
{
  "file_url": "https://example.com/document.pdf",
  "type": "text" | "tables" | "all"
}

Response: 200 OK
{
  "extracted_data": {
    "text": "...",
    "tables": [...]
  }
}
```

## Error Handling

All endpoints should return consistent error responses:

```json
{
  "status": 400,
  "message": "Validation error",
  "data": {
    "errors": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

Common HTTP status codes:
- `200 OK` - Successful GET/PUT request
- `201 Created` - Successful POST request
- `204 No Content` - Successful DELETE request
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## CORS Configuration

Ensure your backend allows requests from your frontend domain:

```javascript
// Example for Express.js
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-domain.com'],
  credentials: true
}));
```

## Database Schema Suggestions

### Events Table
```sql
CREATE TABLE events (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date TIMESTAMP NOT NULL,
  time VARCHAR(100),
  location VARCHAR(255),
  category VARCHAR(50),
  type VARCHAR(20), -- 'upcoming' or 'past'
  image_url TEXT,
  max_participants INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Event Registrations Table
```sql
CREATE TABLE event_registrations (
  id VARCHAR(255) PRIMARY KEY,
  event_id VARCHAR(255) NOT NULL,
  event_title VARCHAR(255),
  participant_name VARCHAR(255) NOT NULL,
  participant_email VARCHAR(255) NOT NULL,
  participant_phone VARCHAR(50),
  dietary_restrictions TEXT,
  special_requirements TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);
```

### Members Table
```sql
CREATE TABLE members (
  id VARCHAR(255) PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  age VARCHAR(10),
  school_organization VARCHAR(255),
  interests TEXT,
  why_join TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
