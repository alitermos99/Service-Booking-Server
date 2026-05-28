import asyncHandler from "express-async-handler";
import {
	createAnAppointment,
	getAUserAppointments,
	updateAnAppointment,
	cancelAnAppointment
} from '../services/appointmentService.js';

export const createAppointment = asyncHandler(async (req, res) => {
	const { service_id, startTime, notes } = req.body;
	const appointment = await createAnAppointment({ service_id, startTime, notes }, req.user.id);

	return res.status(200).json({
		message: "Appointment created successfully",
		appointment
	});
});

export const getUserAppointments = asyncHandler(async (req, res) => {
	const appointments = await getAUserAppointments(req.user.id);
	return res.status(200).json(appointments);
});

export const updateAppointment = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { startTime, notes } = req.body;
	const appointment = await updateAnAppointment({ startTime, notes }, id, req.user.id);

	return res.status(200).json({
		message: "Appointment updated successfully",
		appointment
	})
});

export const cancelAppointment = asyncHandler(async (req, res) => {
	const { id } = req.params;
	await cancelAnAppointment(id);

	return res.status(200).json({
		message: "Appointment cancelled"
	})
});