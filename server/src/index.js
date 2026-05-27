import express from 'express';
import dotenv from "dotenv";
import connectDB from './config/db.js';
import cookieParser from "cookie-parser";
import errorMiddleware from './middlewares/errorMiddleware.js';
import authRoutes from './routes/authRoute.js';
import serviceRoutes from './routes/serviceRoute.js';
import appointmentRoutes from './routes/appointmentRoute.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
	res.send('Hello from Node.js server!');
});

// Use auth routes
app.use('/api/v1/auth', authRoutes);
// Use service routes
app.use('/api/v1/services', serviceRoutes);
// Use Appointment routes
app.use('/api/v1/appointments', appointmentRoutes);

// Error middleware MUST be last
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});