import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createPaymentIntent } from "../controllers/stripeController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/payment-intent/:appointmentId",createPaymentIntent);

export default router;