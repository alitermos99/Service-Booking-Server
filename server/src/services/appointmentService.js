import dayjs from 'dayjs';
import ApiError from '../errors/ApiError.js';
import Appointment from '../models/Appointment.js'
import { getAppointmentOrThrow, getOverlappingAppointment } from '../utils/appointmentUtils.js';
import { getServiceByIdOrThrow } from "../utils/serviceUtils.js";

export const createAnAppointment = async ({ startTime, notes }, serviceId, userId) => {
	if(!startTime) {
		throw new ApiError('StartTime is required', 400);
	}

	const service = await getServiceByIdOrThrow(serviceId);
	const start = dayjs(startTime).toDate();
	const end = start.add(service.duration, 'minute').toDate();
	await getOverlappingAppointment(start, end);

	const appointment = await Appointment.create({
		service_id: serviceId,
		startTime: start,
		notes,
		endTime: end,
		user_id: userId
	})

	return appointment;
}

export const getAUserAppointments = async (userId) => {
	const appointments = await Appointment.find({ user_id: userId });
	return appointments;
}

export const cancelAnAppointment = async (appointmentId) => {
	const appointment = await getAppointmentOrThrow(appointmentId);
	
	if(!appointment) {
		throw new ApiError('Appointment not found', 404);
	}

	appointment.status = 'cancelled';
	await appointment.save();
}