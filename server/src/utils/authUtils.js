import jwt from "jsonwebtoken";

export const COOKIE_OPTIONS = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "strict",
	maxAge: 24 * 60 * 60 * 1000
};

export const generateAuthToken = (userId) => {
	return jwt.sign(
		{ id: userId },
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

export const sanitizeUser = (user) => ({
	_id: user._id,
	name: user.name,
	email: user.email,
	phone: user.phone
});