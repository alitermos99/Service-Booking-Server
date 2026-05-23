import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
	{
		adminId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		title: {
			type: String,
			required: true,
			trim: true
		},
		description: {
			type: String,
			default: ""
		},
		price: {
			type: Number,
			required: true,
			min: 0
		},
		duration: {
			type: Number,
			required: true,
			min: 1
		},
		isActive: {
			type: Boolean,
			default: true
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.model("Service", serviceSchema);