export const authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return res.status(403).json({
				message: "Forbidden Access: You don't have permission to access this resource"
			});
		}

		next();
	};
};