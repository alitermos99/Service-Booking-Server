import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from "express-async-handler";
import { validatePassword } from "../utils/passwordValidator.js";
import transporter from "../services/emailService.js";
import { getUserOrThrow } from "../utils/userUtils.js";
import { validatePasswordOrThrow } from "../utils/validationUtils.js";
import { COOKIE_OPTIONS, sanitizeUser, generateAuthToken, generatePasswordResetToken  } from "../utils/authUtils.js";

export const register = asyncHandler(async (req, res) => {
	const { name, email, password, phone } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Name, email, and password are required");
	}

	validatePasswordOrThrow(password);

	const existingUser = await User.findOne({ email });

	if (existingUser) {
		res.status(400);
		throw new Error("Email already in use");
	}

	const user = await User.create({
		name,
		email,
		password,
		phone
	});

	res.cookie(
		"token",
		generateAuthToken(user._id),
		COOKIE_OPTIONS
	);

	return res.status(201).json({
		message: "User registered successfully",
		user: sanitizeUser(user)
	});
});

export const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400);
		throw new Error("Email and password are required");
	}

	const user = await User.findOne({ email });

	if (
		!user ||
		!(await bcrypt.compare(password, user.password))
	) {
		res.status(400);
		throw new Error("Invalid email or password");
	}

	res.cookie(
		"token",
		generateAuthToken(user._id),
		COOKIE_OPTIONS
	);

	return res.status(200).json({
		user: sanitizeUser(user)
	});
});

export const logout = asyncHandler(async (req, res) => {
	res.clearCookie("token", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 0
	});
	
	return res.status(200).json({ message: "Logged out successfully" });
});

export const updateProfile = asyncHandler(async (req, res) => {
	const { name, phone } = req.body;
	const userToUpdate = await User.findById(req.user.id);

	if (!userToUpdate) {
		res.status(404);
		throw new Error("User not found");
	}

	if (name) {
		userToUpdate.name = name;
	}

	if (phone) {
		userToUpdate.phone = phone;
	}

	await userToUpdate.save();
	return res.status(200).json({ message: "Profile updated successfully", user: {
		name: userToUpdate.name,
		email: userToUpdate.email,
		phone: userToUpdate.phone
	} });
});

export const changePassword = asyncHandler(async (req, res) => {
	const { currentPassword, newPassword } = req.body;

	if (!currentPassword || !newPassword) {
		res.status(400);
		throw new Error(
			"Current password and new password are required"
		);
	}

	const user = await getUserOrThrow(req.user.id);

	const isMatch = await bcrypt.compare(
		currentPassword,
		user.password
	);

	if (!isMatch) {
		res.status(400);
		throw new Error("Current password is incorrect");
	}

	validatePasswordOrThrow(newPassword);

	user.password = newPassword;

	await user.save();

	return res.status(200).json({
		message: "Password changed successfully"
	});
});

export const forgotPassword = asyncHandler(async (req, res) => {
	const { email } = req.body;

	if(!email) {
		res.status(400);
		throw new Error("Email is required");
	}

	const user = await User.findOne({ email });

	if (!user) {
		res.status(404);
		throw new Error("User not found");
	}

	const resetToken = generatePasswordResetToken(user._id);
	const url = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

	await transporter.sendMail({
		to: user.email,
		subject: "Password Reset Request",
		text: `You requested a password reset. Click the link to reset your password: ${url}`
	});

	return res.status(200).json({ message: "Password reset email sent" });
});

export const resetPassword = asyncHandler(async (req, res) => {
	const { token, newPassword } = req.body;

	if(!token) {
		res.status(401);
		throw new Error("Unauthorized Access");
	}

	const decoded = jwt.verify(token, process.env.JWT_SECRET);

	if (decoded.purpose !== "password_reset") {
		res.status(400);
		throw new Error("Invalid token");
	}

	if(!newPassword) {
		res.status(400);
		throw new Error("New password is required");
	}

	if(!validatePassword(newPassword)) {
		res.status(400);
		throw new Error("New password must be at least 6 characters long and include uppercase, lowercase, number, and special character");
	}

	const user = await User.findById(decoded.id);

	if (!user) {
		res.status(404);
		throw new Error("User not found");
	}

	user.password = newPassword;
	await user.save();
	return res.status(200).json({ message: "Password reset successfully" });
});

export const getProfile = asyncHandler(async (req, res) => {
	const user = await getUserOrThrow(req.user.id);

	return res.status(200).json({
		user: sanitizeUser(user)
	});
});