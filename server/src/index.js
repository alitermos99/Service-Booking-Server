import express from 'express';
import dotenv from "dotenv";
import connectDB from './config/db.js';
import cookieParser from "cookie-parser";
import errorMiddleware from './middlewares/errorMiddleware.js';
import authRoutes from './routes/authRoute.js';
import serviceRoutes from './routes/serviceRoute.js';
import appointmentRoutes from './routes/appointmentRoute.js';
import stripeRoutes from './routes/stripeRoute.js';
import stripeWebhookRoutes from './routes/stripeWebhookRoute.js';

const app = express();
app.use(cookieParser());
dotenv.config();

// Connect to MongoDB
connectDB();

// Use StripeWebhook routes
app.use("/api/v1/stripe", stripeWebhookRoutes);
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello from Node.js server!');
});

// Use auth routes
app.use('/api/v1/auth', authRoutes);
// Use service routes
app.use('/api/v1/services', serviceRoutes);
// Use Appointment routes
app.use('/api/v1/appointments', appointmentRoutes);
// Use Stripe routes
app.use("/api/v1/stripe", stripeRoutes);

// Error middleware MUST be last
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});