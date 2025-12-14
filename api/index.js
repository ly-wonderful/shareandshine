import express from 'express';
import cors from 'cors';
import { errorHandler, notFound } from '../backend/middleware/errorHandler.js';
import eventsRouter from '../backend/routes/events.js';
import membersRouter from '../backend/routes/members.js';
import partnersRouter from '../backend/routes/partners.js';

const app = express();

// Middleware
app.use(cors({
  origin: true, // Allow all origins for Vercel
  credentials: true
}));

// Increase payload size limit for base64 images (50MB)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'ShareShine Backend API is running',
    env: {
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
    }
  });
});

// API Routes
app.use('/api/events', eventsRouter);
app.use('/api/members', membersRouter);
app.use('/api/partners', partnersRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Export for Vercel serverless
export default app;
