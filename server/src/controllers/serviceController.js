import asyncHandler from "express-async-handler";
import { 
	createAService,
	getAllServices,
	updateAService,
	deleteAService
} from '../services/serviceService.js';

export const createService = asyncHandler(async (req, res) => {
	const service = await createAService(req.body, req.user.id);
	return res.status(201).json({
		message: 'Service created successfully',
		service
	});
});

// get all services
export const getServices = asyncHandler(async (req, res) => {
	const services = await getAllServices(req.user.id);
	return res.status(200).json(services);
});

// Update a service
export const updateService = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const service = await updateAService(id, req.body, req.user.id);

	return res.status(200).json({
		message: 'Service updated successfully',
		service
	});
});

// Delete a service
export const deleteService = asyncHandler(async (req, res) => {
	const { id } = req.params;

	await deleteAService(id, req.user.id);
	return res.status(200).json({
		message: 'Service deleted successfully'
	});
});