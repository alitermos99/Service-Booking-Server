import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (user) => {
	return jwt.sign(
		{ id: user._id },
		process.env.JWT_SECRET,
		{ expiresIn: "24h" }
	);
};

export const register = async (req, res) => {
	try {
		const { name, email, password, phone, role } = req.body;

		if(!name || !email || !password) {
			return res.status(400).json({ message: "Name, email, and password are required" });
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(400).json({ message: "Email already in use" });
		}
		// Create new user
		const newUser = new User({
			name,
			email,
			password,
			phone,
			role
		});
		await newUser.save();

		// Exclude password from response
		const newUserNoPassword = newUser.toObject();
		delete newUserNoPassword.password;

		const token = generateToken(newUser);

		res.cookie("token", token, {
			httpOnly: true,
			secure: false, // true in production (HTTPS)
			sameSite: "strict",
			maxAge: 24 * 60 * 60 * 1000 // 1 day
		});

		res.json({
			message: "Login successful",
			token,
			newUserNoPassword
		});
	} catch (error) {
		console.error("Registration error:", error);
		res.status(500).json({ message: "Server error during registration" });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		
		if(!email || !password) {
			return res.status(400).json({ message: "Email and password are required" });
		}

		// Check if user exists
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: "Invalid email or password" });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ message: "Invalid email or password" });
		}

		const token = generateToken(user);

		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.environment === "production", // true in production (HTTPS)
			sameSite: "strict",
			maxAge: 24 * 60 * 60 * 1000 // 1 day
		});
		
		res.json({ token, user: {
			name: user.name,
			email: user.email,
			phone: user.phone
		}});
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ message: "Server error during login" });
	}
}

export const logout = async (req, res) => {
	res.clearCookie("token", {
		httpOnly: true,
		secure: process.env.environment === "production",
		sameSite: "strict",
		maxAge: 0
	});

	res.json({ message: "Logged out successfully" });
}