import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
		},
		avatarUrl: {
			type: String,
		},
		isActive: {
			type: Boolean,
			default: true
		},
		role: {
			type: String,
			required: true,
			enum: ["admin", "customer", "super_admin"],
			default: "customer"
		},
	}, 
	{ 
		timestamps: true 
	}
);

export default mongoose.model("User", userSchema);