import asyncHandler from "express-async-handler";
import { 
	registerUser, 
	loginUser, 
	updateUserProfile, 
	changeUserPassword, 
	forgotUserPassword, 
	resetUserPassword, 
	getUserProfile 
} from "../services/authService.js";
import { sanitizeUser } from '../utils/userUtils.js'
import { COOKIE_OPTIONS, generateAuthToken } from "../utils/authUtils.js";

export const register = asyncHandler(async (req, res) => {
	const { name, email, password, accountType, phone } = req.body;
	const user = await registerUser({ name, email, password, accountType, phone });

	res.cookie(
		"token",
		generateAuthToken(user._id, user.role),
		COOKIE_OPTIONS
	);

	return res.status(201).json({
		message: "User registered successfully",
		user: sanitizeUser(user)
	});
});

export const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await loginUser({ email, password });

	res.cookie(
		"token",
		generateAuthToken(user._id, user.role),
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
	const user = await updateUserProfile(req.user.id, { name, phone });

	return res.status(200).json({ 
		message: "Profile updated successfully", 
		user: sanitizeUser(user) 
	});
});


export const changePassword = asyncHandler(async (req, res) => {
	const { currentPassword, newPassword } = req.body;
	const user = await changeUserPassword(req.user.id, { currentPassword, newPassword });

	return res.status(200).json({
		message: "Password changed successfully",
		user: sanitizeUser(user)
	});
});

export const forgotPassword = asyncHandler(async (req, res) => {
	const { email } = req.body;

	await forgotUserPassword({ email });
	return res.status(200).json({ message: "Password reset email sent" });
});

export const resetPassword = asyncHandler(async (req, res) => {
	const { token, newPassword } = req.body;

	await resetUserPassword({ token, newPassword });
	return res.status(200).json({ message: "Password reset successfully" });
});

export const getProfile = asyncHandler(async (req, res) => {
	const user = await getUserProfile(req.user.id);

	return res.status(200).json({
		user: sanitizeUser(user)
	});
});