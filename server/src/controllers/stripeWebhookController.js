import stripe from "../config/stripe.js";
import Appointment from "../models/Appointment.js";
import { getAppointmentByPaymentIntentId } from '../utils/appointmentUtils.js';

export const stripeWebhook = async (req, res) => {
	const sig = req.headers["stripe-signature"];

	const event = stripe.webhooks.constructEvent(
		req.body,
		sig,
		process.env.STRIPE_WEBHOOK_SECRET
	);

	switch (event.type) {
		case "payment_intent.succeeded": {
			const paymentIntent = event.data.object;
			const appointment = await getAppointmentByPaymentIntentId(paymentIntent.id);

			appointment.status = "confirmed";
			appointment.paymentStatus = "paid";
			await appointment.save();

			break;
		}
	}

	return res.json({ received: true });
};