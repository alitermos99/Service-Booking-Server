import dayjs from "dayjs";
import ApiError from "../errors/ApiError.js";
import Appointment from "../models/Appointment.js";

export const getAppointmentOrThrow = async (appointmentId) => {
	const appointment = await Appointment.findById(appointmentId);

	if (!appointment) {
		throw new ApiError("Appointment not found", 404);
	}

	return appointment;
};

export const getOverlappingAppointment = async (startDate, endDate) => {
	const overlappingAppointment = await Appointment.findOne({
		startTime: { $lt: endDate },
		endTime: { $gt: startDate }
	});

	if (overlappingAppointment) {
		throw new ApiError('You already have an appointment at this time', 400);
	}
};

export const getAppointmentWithParentServiceObject = async (appointmentId) => {
	const appointment = await Appointment.findById(appointmentId).populate("service_id");

	if (!appointment) {
		throw new ApiError("Appointment not found", 404);
	}

	return appointment;
}

export const getAppointmentByPaymentIntentId = async (paymentIntentId) => {
	const appointment = await Appointment.findOne({ paymentIntentId });

	if (!appointment) {
		throw new ApiError("Appointment not found", 404);
	}

	return appointment;
}

export const calculateAndValidateTimeRange = async (startTime, duration) => {
	const start = dayjs(startTime);
	const end = start.add(duration, "minute");

	await getOverlappingAppointment(start.toDate(), end.toDate());

	return {
		start: start.toDate(),
		end: end.toDate()
	};
};

export const sanitizeAppointment = (appointment) => {
	const object = appointment.toObject();

	delete object.__v;
	delete object.createdAt;
	delete object.updatedAt;
	delete object.paymentIntentId;

	return object;
};