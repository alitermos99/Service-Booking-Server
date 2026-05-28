import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
	{
		appointment_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Appointment",
			required: true
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		rating: {
			type: Number,
			required: true,
			min: 1,
			max: 5
		},
		comment: {
			type: String,
			default: ""
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.model("Review", reviewSchema);