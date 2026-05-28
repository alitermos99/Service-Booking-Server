import asyncHandler from "express-async-handler";
import { 
	createAService,
	getAService,
	getAllServices,
	updateAService,
	deleteAService
} from '../services/serviceService.js';
import { sanitizeService } from '../utils/serviceUtils.js'

// Create a service
export const createService = asyncHandler(async (req, res) => {
	const service = await createAService(req.body, req.user.id);
	return res.status(201).json({
		message: 'Service created successfully',
		service: sanitizeService(service)
	});
});

// Get a service
export const getService = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const service = await getAService(id);

	return res.status(200).json({
		service: sanitizeService(service)
	});
});

// Get all services
export const getServices = asyncHandler(async (req, res) => {
	const services = await getAllServices(req.user.id);

	const sanitizedServices = services.map(service => {
		return sanitizeService(service)
	});

	return res.status(200).json(sanitizedServices);
});

// Update a service
export const updateService = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const service = await updateAService(id, req.body, req.user.id);

	return res.status(200).json({
		message: 'Service updated successfully',
		service: sanitizeService(service)
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