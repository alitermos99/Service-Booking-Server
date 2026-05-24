export default function errorMiddleware(err, req, res, next) {
	console.error(err);
	
	// If no status code was set before, default to 500
	const statusCode = res.statusCode && res.statusCode !== 200
		? res.statusCode
		: 500;
	
	res.status(statusCode).json({
		success: false,
		message: err.message || "An unexpected error occurred",
		
		// Only show stack in development
		...(process.env.NODE_ENV !== "production" && {
			stack: err.stack
		})
	});
}