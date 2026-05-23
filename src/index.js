import express from 'express';
import dotenv from "dotenv";
import connectDB from './config/db.js';
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
	res.send('Hello from Node.js server!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});