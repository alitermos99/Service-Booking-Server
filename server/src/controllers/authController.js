import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from "express-async-handler";
import { validatePassword } from "../utils/passwordValidator.js";

const generateToken = (user) => {
	return jwt.sign(
		{ id: user._id },
		process.env.JWT_SECRET,
		{ expiresIn: "24h" }
	);
};

export const register = asyncHandler(async (req, res) => {
	const { name, email, password, phone } = req.body;
	
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Name, email, and password are required");
	}

	if (!validatePassword(password)) {
		res.status(400);
		throw new Error("Password must be at least 6 characters long and include uppercase, lowercase, number, and special character");
	}
	
	// Check if user already exists
	const existingUser = await User.findOne({ email });
	
	if (existingUser) {
		res.status(400);
		throw new Error("Email already in use");
	}
	
	// Create user
	const newUser = new User({
		name,
		email,
		password,
		phone
	});
	
	await newUser.save();
	
	// Remove password
	const newUserNoPassword = newUser.toObject();
	delete newUserNoPassword.password;
	
	// Generate token
	const token = generateToken(newUser);
	
	// Set cookie
	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 24 * 60 * 60 * 1000
	});
	
	return res.status(201).json({
		message: "User registered successfully",
		user: newUserNoPassword
	});
});

export const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	
	if(!email || !password) {
		res.status(400);
		throw new Error("Email and password are required");
	}
	
	// Check if user exists and password matches
	const user = await User.findOne({ email });
	
	if (!user) {
		res.status(400);
		throw new Error("Invalid email or password");
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		res.status(400);
		throw new Error("Invalid email or password");
	}
	
	const token = generateToken(user);
	
	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production", // true in production (HTTPS)
		sameSite: "strict",
		maxAge: 24 * 60 * 60 * 1000 // 1 day
	});
	
	return res.status(200).json({ user: {
		name: user.name,
		email: user.email,
		phone: user.phone
	}});
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
	const userToUpdate = await User.findById(req.user.id);

	if (!userToUpdate) {
		res.status(404);
		throw new Error("User not found");
	}

	if (!currentPassword || !newPassword) {
		res.status(400);
		throw new Error("Current password and new password are required");
	}

	if(currentPassword === newPassword) {
		res.status(400);
		throw new Error("New password must be different from current password");
	}

	if(!validatePassword(newPassword)) {
		res.status(400);
		throw new Error("New password must be at least 6 characters long and include uppercase, lowercase, number, and special character");
	}

	const isMatch = await bcrypt.compare(currentPassword, userToUpdate.password);

	if (!isMatch) {
		res.status(400);
		throw new Error("Current password is incorrect");
	}

	userToUpdate.password = newPassword;
	await userToUpdate.save();
	return res.status(200).json({ message: "Password changed successfully" });
});