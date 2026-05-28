import stripe from '../config/stripe.js';
import ApiError from '../errors/ApiError.js';
import { getAppointmentWithParentServiceObject } from '../utils/appointmentUtils.js';
import { assertOwnership } from '../utils/authUtils.js';

export const createPaymentIntentForAppointment = async (appointmentId, userId) => {
	const appointment = await getAppointmentWithParentServiceObject(appointmentId);
	assertOwnership(appointment, "user_id", userId, 'Not authorized to proceed');

	if(appointment.paymentStatus === "paid") {
		throw new ApiError("Appointment already paid", 400);
	}

	if (appointment.paymentIntentId) {
		const existing = await stripe.paymentIntents.retrieve(
			appointment.paymentIntentId
		);

		return {
			clientSecret: existing.client_secret
		};
	}

	const paymentIntent = await stripe.paymentIntents.create(
		{
			amount: Math.round(appointment.service_id.price * 100),
			currency: "usd",
			metadata: {
				appointmentId: appointment._id.toString(),
				userId
			}
		},
		{
			idempotencyKey: `appointment-${appointment._id}`
		}
	);

	appointment.paymentIntentId = paymentIntent.id;
	await appointment.save();

	return {
		clientSecret: paymentIntent.client_secret
	};
}
