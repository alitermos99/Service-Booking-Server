import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

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
			minlength: 6,
  			match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/
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
			enum: ["business", "customer", "admin"],
			default: "customer"
		},
	}, 
	{ 
		timestamps: true 
	}
);

userSchema.pre("save", async function () {
	if (!this.isModified("password")) {
		return;
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model("User", userSchema);