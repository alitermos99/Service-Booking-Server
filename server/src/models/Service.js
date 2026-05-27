import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
	{
		admin_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		title: {
			type: String,
			required: [true, 'Service title is required'],
			trim: true
		},
		description: {
			type: String,
			required: [true, 'Description is required'],
		},
		price: {
			type: Number,
			required: true,
			min: [0, 'Price cannot be negative'],
		},
		duration: {
			type: Number,
			required: true,
			min: [5, 'Duration must be at least 5 minutes'],
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