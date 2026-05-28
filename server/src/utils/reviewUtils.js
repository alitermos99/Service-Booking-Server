import Review from "../models/Review.js";
import ApiError from '../errors/ApiError.js';

export const getReviewByIdOrThrow = async (reviewId) => {
	const review = await Review.findById(reviewId);

	if (!review) {
		throw new ApiError("Review not found", 404);
	}

	return review;
};

export const getExistingReviewByParentIds = async (appointmentId, userId) => {
	const existingReview = await Review.findOne({ 
		appointment_id: appointmentId,
		user_id: userId
	});

	if(existingReview) {
		throw new ApiError("Rating already created for this appointment", 400);
	}
}