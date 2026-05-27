import Service from '../models/Service.js';
import ApiError from '../errors/ApiError.js';
import { getServiceByIdOrThrow } from '../utils/serviceUtils.js'
import { assertOwnership } from '../utils/authUtils.js';

export const createAService = async (serviceData, adminId) => {
	const { title, description, price, duration } = serviceData;

	if(!title || !description || !price || !duration) {
		throw new ApiError('All fields are required', 400);
	}

	if(price <= 0) {
		throw new ApiError('Price must be greater than 0', 400);
	}

	if(duration < 5) {
		throw new ApiError('Duration must be at least 5 minutes', 400);
	}

	const service = new Service({
		title,
		description,
		price,
		duration,
		admin_id: adminId
	});

	await service.save();
	return service;
};

export const getAllServices = async (adminId) => {
	const services = await Service.find({ admin_id: adminId }).sort({ createdAt: -1 });
	return services;
}

export const updateAService = async (serviceId, updateData, adminId) => {
	const service = await getServiceByIdOrThrow(serviceId);
	const { title, description, price, duration } = updateData;
	assertOwnership(service, adminId, 'Not authorized to update this service');

	Object.assign(service, { title: title || service.title, description: description 
		|| service.description, price: price || service.price, duration: duration || service.duration 
	});
	
	await service.save();
	return service;
};

export const deleteAService = async (serviceId, adminId) => {
	const service = await getServiceByIdOrThrow(serviceId);
	assertOwnership(service, adminId, 'Not authorized to delete this service');

	await service.remove();
	return service;
};