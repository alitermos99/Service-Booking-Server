import User from "../models/User.js";
import ApiError from "../errors/ApiError.js";

export const getUserOrThrow = async (userId) => {
	const user = await User.findById(userId);

	if (!user) {
		throw new ApiError("User not found", 404);
	}

	return user;
};

export const getUserByEmailOrThrow = async (email) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new ApiError("User not found", 404);
	}

	return user;
};

export const sanitizeUser = (user) => ({
	_id: user._id,
	name: user.name,
	email: user.email,
	phone: user.phone
});