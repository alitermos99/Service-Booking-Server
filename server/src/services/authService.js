import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import transporter from "../services/emailService.js";
import { getUserOrThrow, getUserByEmailOrThrow } from "../utils/userUtils.js";
import { validatePasswordOrThrow } from "../utils/validationUtils.js";
import { generatePasswordResetToken  } from "../utils/authUtils.js";
import ApiError from "../errors/ApiError.js";

export const registerUser = async ({ name, email, password, phone = '' }) => {
	if (!name || !email || !password) {
		throw new ApiError("Name, email, and password are required", 400);
	}

	validatePasswordOrThrow(password);

	const existingUser = await getUserByEmailOrThrow(email);

	if (existingUser) {
		throw new ApiError("Email already in use", 400);
	}

	const user = await User.create({
		name,
		email,
		password,
		phone
	});

	return user;
}

export const loginUser = async ({ email, password }) => {
	if (!email || !password) {
		throw new ApiError("Email and password are required", 400);
	}

	if (!email || !password) {
		throw new ApiError("Email and password are required", 400);
	}

	const user = await getUserByEmailOrThrow(email);
	if (
		!user ||
		!(await bcrypt.compare(password, user.password))
	) {
		throw new ApiError("Invalid email or password", 400);
	}

	return user;
}

export const updateUserProfile = async (userId, { name, phone }) => {
	const user = await getUserOrThrow(userId);

	if (name) {
		user.name = name;
	}

	if (phone) {
		user.phone = phone;
	}

	await user.save();
	return user;
}

export const changeUserPassword = async (userId, { currentPassword, newPassword }) => {
	if (!currentPassword || !newPassword) {
		throw new ApiError("Current password and new password are required", 400);
	}

	if(currentPassword === newPassword) {
		throw new ApiError("New password must be different from current password", 400);
	}

	const user = await getUserOrThrow(userId);
	const isMatch = await bcrypt.compare(
		currentPassword,
		user.password
	);

	if (!isMatch) {
		throw new ApiError("Current password is incorrect", 400);
	}

	validatePasswordOrThrow(newPassword);
	user.password = newPassword;
	await user.save();

	return user;
}

export const forgotUserPassword = async ({ email }) => {
	if (!email) {
		throw new ApiError("Email is required", 400);
	}

	if(!email) {
		throw new ApiError("Email is required", 400);
	}

	const user = await getUserByEmailOrThrow(email);
	const resetToken = generatePasswordResetToken(user._id);
	const url = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

	await transporter.sendMail({
		to: user.email,
		subject: "Password Reset Request",
		text: `You requested a password reset. Click the link to reset your password: ${url}`
	});
}

export const resetUserPassword = async ({ token, newPassword }) => {
	if(!token) {
		throw new ApiError("Unauthorized Access", 401);
	}

	const decoded = jwt.verify(token, process.env.JWT_SECRET);

	if (decoded.purpose !== "password_reset") {
		throw new ApiError("Invalid token", 400);
	}

	if(!newPassword) {
		throw new ApiError("New password is required", 400);
	}

	validatePasswordOrThrow(newPassword);

	const user = await getUserOrThrow(decoded.id);
	user.password = newPassword;
	await user.save();
}

export const getUserProfile = async (userId) => {
	const user = await getUserOrThrow(userId);
	return user;
}