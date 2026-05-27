import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
	{
		service_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Service",
			required: true
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		startTime: {
			type: Date,
			required: true
		},
		endTime: {
			type: Date,
			required: true
		},
		status: {
			type: String,
			enum: ["pending", "confirmed", "cancelled", "completed"],
			default: "pending"
		},
		paymentStatus: {
			type: String,
			enum: ["unpaid", "paid", "refunded"],
			default: "unpaid"
		},
		notes: {
			type: String,
			default: ""
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.model("Appointment", appointmentSchema);