import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import appointmentRoutes from './routes/appointmentRoutes';
import serviceRoutes from './routes/serviceRoutes';
import stylistRoutes from './routes/stylistRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();


const app: Application = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }));
app.use(express.json());

// Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/stylists', stylistRoutes);
app.use('/api/auth', authRoutes);

// Server
const PORT = process.env.PORT || 8009;
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));
