import User from "../models/User.js";
import jwt from 'jsonwebtoken';

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

		res.status(201).json({ 
			message: "User registered successfully", 
			user: newUserNoPassword, 
			token: generateToken(newUser) 
		});
	} catch (error) {
		console.error("Registration error:", error);
		res.status(500).json({ message: "Server error during registration" });
	}
};