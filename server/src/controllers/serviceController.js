import Service from '../models/Service.js';
import { body } from 'express-validator';
import ApiError from './../errors/ApiError.js';
import asyncHandler from "express-async-handler";

// 1. CREATE SERVICE
// We define the validation rules array here to keep the controller clean
export const createServiceRules = [
	// Title: Must exist, be string, and be at least 3 chars long
	// body('field_name').validation_chain
	body('title').notEmpty().withMessage('Title is required').isLength({ min: 3 }),
	body('description').notEmpty().withMessage('Description is required'),
	body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
	body('duration').isInt({ gt: 0 }).withMessage('Duration must be a positive integer'),
];

export const createService = asyncHandler(async (req, res) => {
	const { title, description, price, duration } = req.body;

	const service = new Service({
		title,
		description,
		price,
		duration,
		admin_id: req.user.id // Assuming req.user is set by auth middleware
	});

	await service.save();
	return res.status(201).json({
		message: 'Service created successfully',
		service
	});
});

// get all services
export const getServices = asyncHandler(async (req, res) => {
	const services = await Service.find({ admin_id: req.user.id }).sort({ createdAt: -1 });
	return res.status(200).json(services);
});

// Update a service
export const updateService = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { title, description, price, duration } = req.body;
	const service = await Service.findById(id);

	if (!service) {
		throw new ApiError('Service not found', 404);
	}

	if(service.admin_id.toString() !== req.user.id) {
		throw new ApiError('Not authorized to update this service', 403);
	}

	Object.assign(service, { title, description, price, duration });
	await service.save();
	return res.status(200).json({
		message: 'Service updated successfully',
		service
	});
});

// Delete a service
export const deleteService = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const service = await Service.findById(id);

	if (!service) {
		throw new ApiError('Service not found', 404);
	}
	if(service.admin_id.toString() !== req.user.id) {
		throw new ApiError('Not authorized to delete this service', 403);
	}

	await Service.findByIdAndDelete(id);
	return res.status(200).json({
		message: 'Service deleted successfully'
	});
});