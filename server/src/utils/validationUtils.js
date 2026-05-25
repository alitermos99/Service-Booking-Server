import { validatePassword } from "./passwordValidator.js";

export const validatePasswordOrThrow = (password) => {
	if (!validatePassword(password)) {
		throw new Error(
			"Password must be at least 6 characters long and include uppercase, lowercase, number, and special character"
		);
	}
};