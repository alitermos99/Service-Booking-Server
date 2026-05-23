import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
	{
		appointmentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Appointment",
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