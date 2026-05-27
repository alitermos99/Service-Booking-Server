import {
	createAnAppointment,
	getAUserAppointments,
	cancelAnAppointment
} from '../services/appointmentService';

export const createAppointment = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { startTime, notes } = req.body;
	const appointment = await createAnAppointment({ startTime, notes }, id, req.user.id);

	return res.status(200).json({
		message: "Appointment created successfully",
		appointment
	});
});

export const getUserAppointments = asyncHandler(async (req, res) => {
	const appointments = await getAUserAppointments(req.user.id);
	return res.status(200).json(appointments);
});

export const cancelAppointment = asyncHandler(async (req, res) => {
	const { id } = req.params;
	await cancelAnAppointment(id);

	return res.status(200).json({
		message: "Appointment cancelled"
	})
});