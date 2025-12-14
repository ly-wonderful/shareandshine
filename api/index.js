import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler, notFound } from '../middleware/errorHandler.js';
import eventsRouter from '../routes/events.js';
import membersRouter from '../routes/members.js';
import partnersRouter from '../routes/partners.js';

dotenv.config();

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
  res.json({ status: 'ok', message: 'ShareShine Backend API is running' });
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
