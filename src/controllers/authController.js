import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from "express-async-handler";

const generateToken = (user) => {
	return jwt.sign(
		{ id: user._id },
		process.env.JWT_SECRET,
		{ expiresIn: "24h" }
	);
};

export const register = asyncHandler(async (req, res) => {
	const { name, email, password, phone, role } = req.body;
	
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Name, email, and password are required");
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
		phone,
		role
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