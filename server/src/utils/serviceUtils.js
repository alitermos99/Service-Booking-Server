import Service from '../models/Service.js';
import ApiError from "../errors/ApiError.js";

export const getServiceByIdOrThrow = async (serviceId) => {
	const service = await Service.findById(serviceId);

	if (!service) {
		throw new ApiError("Service not found", 404);
	}

	return service;
};