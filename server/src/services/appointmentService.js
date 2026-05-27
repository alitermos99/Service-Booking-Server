import dayjs from 'dayjs';
import ApiError from '../errors/ApiError.js';
import Appointment from '../models/Appointment.js'
import { getAppointmentOrThrow, getOverlappingAppointment } from '../utils/appointmentUtils.js';
import { getServiceByIdOrThrow } from "../utils/serviceUtils.js";

export const createAnAppointment = async ({ service_id, startTime, notes }, userId) => {
	if(!startTime) {
		throw new ApiError('StartTime is required', 400);
	}

	const service = await getServiceByIdOrThrow(service_id);
	const start = dayjs(startTime);
	const end = start.add(service.duration, 'minute');
	await getOverlappingAppointment(start.toDate(), end.toDate());

	const appointment = await Appointment.create({
		service_id,
		startTime: start.toDate(),
		notes,
		endTime: end.toDate(),
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