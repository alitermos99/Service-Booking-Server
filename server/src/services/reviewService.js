import Review from "../models/Review.js";
import ApiError from '../errors/ApiError.js';
import { assertOwnership } from '../utils/authUtils.js';
import { getReviewByIdOrThrow, getExistingReviewByParentIds } from '../utils/reviewUtils.js'

export const createAReview = async ({ rating, comment, appointmentId }, userId) => {
	if(!rating || !appointmentId) {
		throw new ApiError("All fields are required", 400);
	}

	if(rating < 1 || rating > 5) {
		throw new ApiError("Rating must be between 1 and 5", 400);
	}

	await getExistingReviewByParentIds(appointmentId, userId);

	const review = await Review.create({
		rating,
		comment,
		user_id: userId,
		appointment_id: appointmentId,
	});

	return review;
}

export const updateAReview = async ({ rating, comment }, reviewId, userId) => {
	if(rating < 1 || rating > 5) {
		throw new ApiError("Rating must be between 1 and 5", 400);
	}

	const review = await getReviewByIdOrThrow(reviewId);
	assertOwnership(review, "user_id", userId, 'Not authorized to update this review');

	review.rating = rating || review.rating;
	review.comment = comment || review.comment;

	await review.save();
	return review;
}

export const deleteAReview = async (reviewId, userId) => {
	const review = await getReviewByIdOrThrow(reviewId);
	assertOwnership(review, "user_id", userId, 'Not authorized to delete this review');

	await review.deleteOne();
}