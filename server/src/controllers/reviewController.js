import asyncHandler from "express-async-handler";
import { 
	createAReview,
	updateAReview,
	deleteAReview
} from "../services/reviewService.js";

// Create a review
export const createReview = asyncHandler(async (req, res) => {
	const { rating, comment, appointmentId } = req.body;
	const review = await createAReview({ rating, comment, appointmentId }, req.user.id);

	return res.status(200).json({
		message: "Review created successfully",
		review
	});
});

// Update a review
export const updateReview = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { rating, comment } = req.body;
	const review = await updateAReview({ rating, comment }, id, req.user.id);

	return res.status(200).json({
		review
	});
});

// Delete a review
export const deleteReview = asyncHandler(async (req, res) => {
	const { id } = req.params;
	await deleteAReview(id, req.user.id);

	return res.status(200).json({
		message: "Review deleted successfully"
	});
});