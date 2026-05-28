import Service from '../models/Service.js';
import ApiError from "../errors/ApiError.js";

export const getServiceByIdOrThrow = async (serviceId) => {
	const service = await Service.findById(serviceId);

	if (!service) {
		throw new ApiError("Service not found", 404);
	}

	return service;
};

export const sanitizeService = (service) => {
	const object = service.toObject();

	delete object.__v;
	delete object.createdAt;
	delete object.updatedAt;

	return object;
};