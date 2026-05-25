export default function errorMiddleware(err, req, res, next) {
	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		success: false,
		message: err.message || "An unexpected error occurred",
		...(process.env.NODE_ENV !== "production" && {
			stack: err.stack
		})
	});
}