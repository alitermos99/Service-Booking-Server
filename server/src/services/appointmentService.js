import dayjs from "dayjs";
import ApiError from '../errors/ApiError.js';
import Appointment from '../models/Appointment.js'
import { getServiceByIdOrThrow } from "../utils/serviceUtils.js";
import { assertOwnership } from '../utils/authUtils.js';
import { 
	getAppointmentOrThrow, 
	getAppointmentWithParentServiceObject,
	calculateAndValidateTimeRange 
} from '../utils/appointmentUtils.js';

export const createAnAppointment = async ({ service_id, startTime, notes }, userId) => {
	if(!startTime) {
		throw new ApiError('StartTime is required', 400);
	}

	const service = await getServiceByIdOrThrow(service_id);
	const { start, end } = await calculateAndValidateTimeRange(
		startTime,
		service.duration
	);

	const appointment = await Appointment.create({
		service_id,
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

export const updateAnAppointment = async ({ startTime, notes }, appointmentId, userId) => {
	const appointment = await getAppointmentWithParentServiceObject(appointmentId);
	assertOwnership(appointment, "user_id", userId, 'Not authorized to update this appointment');

	if (startTime && dayjs(startTime).valueOf() !== dayjs(appointment.startTime).valueOf()) {
		const { start, end } = await calculateAndValidateTimeRange(
			startTime,
			appointment.service_id.duration
		);

		appointment.startTime = start;
		appointment.endTime = end;
	}

	appointment.notes = notes || appointment.notes;

	await appointment.save();
	return appointment;
};

export const cancelAnAppointment = async (appointmentId, userId) => {
	const appointment = await getAppointmentOrThrow(appointmentId);
	assertOwnership(appointment, "user_id", userId, 'Not authorized to delete this appointment');

	appointment.status = 'cancelled';
	await appointment.save();
}