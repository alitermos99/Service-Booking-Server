import jwt from "jsonwebtoken";
import ApiError from "../errors/ApiError.js";

export const COOKIE_OPTIONS = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "strict",
	maxAge: 24 * 60 * 60 * 1000
};

export const generateAuthToken = (userId, userRole) => {
	return jwt.sign(
		{ id: userId, role: userRole },
		process.env.JWT_SECRET,
		{ expiresIn: "24h" }
	);
};

export const generatePasswordResetToken = (userId) => {
	return jwt.sign(
		{
			id: userId,
			purpose: "password_reset"
		},
		process.env.JWT_SECRET,
		{ expiresIn: "15m" }
	);
};

export const assertOwnership = (resource, resourceField, userId, message = 'Not authorized') => {
	if (!resource || resource[resourceField].toString() !== userId) {
		throw new ApiError(message, 403);
	}
};