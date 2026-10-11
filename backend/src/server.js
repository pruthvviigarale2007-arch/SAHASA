import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { connectDB } from './config/db.js';
import { autoSeedIfEmpty } from './utils/autoSeed.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import destinationRoutes from './routes/destinationRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import hotspotRoutes from './routes/hotspotRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

// Connect Database & Auto Seed
connectDB().then(async () => {
  await autoSeedIfEmpty();
});

const app = express();

// Security Middlewares
app.use(helmet());
app.use(
  cors({
    origin: [process.env.CLIENT_URL || 'http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5174'],
    credentials: true,
  })
);

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' },
});
app.use('/api', apiLimiter);

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Root API Health Check
app.get('/', (req, res) => {
  res.json({
    success: true,
    name: 'Wanderly Travel Website REST API',
    version: '1.0.0',
    status: 'Operational',
  });
});

// API Routes Mount
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/hotspots', hotspotRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const startServer = (portToUse) => {
  const server = app
    .listen(portToUse, () => {
      console.log(`🚀 Wanderly REST API Server running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${portToUse}`);
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`⚠️ Port ${portToUse} is in use. Trying port ${portToUse + 1}...`);
        startServer(portToUse + 1);
      } else {
        console.error('❌ Server startup error:', err.message);
      }
    });
};

const DEFAULT_PORT = parseInt(process.env.PORT) || 5000;
startServer(DEFAULT_PORT);
