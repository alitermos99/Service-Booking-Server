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