import asyncHandler from "express-async-handler";
import { sanitizeAppointment } from "../utils/appointmentUtils.js";
import {
	createAnAppointment,
	getAUserAppointment,
	getAUserAppointments,
	updateAnAppointment,
	cancelAnAppointment
} from '../services/appointmentService.js';

export const createAppointment = asyncHandler(async (req, res) => {
	const { service_id, startTime, notes } = req.body;
	const appointment = await createAnAppointment({ service_id, startTime, notes }, req.user.id);

	return res.status(200).json({
		message: "Appointment created successfully",
		appointment: sanitizeAppointment(appointment)
	});
});

export const getUserAppointment = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const appointment = await getAUserAppointment(id, req.user.id);

	return res.status(200).json({
		appointment: sanitizeAppointment(appointment)
	});
});

export const getUserAppointments = asyncHandler(async (req, res) => {
	const appointments = await getAUserAppointments(req.user.id);

	const sanitizedAppointments = appointments.map(appointment => {
		return sanitizeAppointment(appointment);
	})

	return res.status(200).json(sanitizedAppointments);
});

export const updateAppointment = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { startTime, notes } = req.body;
	const appointment = await updateAnAppointment({ startTime, notes }, id, req.user.id);

	return res.status(200).json({
		message: "Appointment updated successfully",
		appointment: sanitizeAppointment(appointment)
	})
});

export const cancelAppointment = asyncHandler(async (req, res) => {
	const { id } = req.params;
	await cancelAnAppointment(id, req.user.id);

	return res.status(200).json({
		message: "Appointment cancelled"
	})
});