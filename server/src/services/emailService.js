import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST || "smtp.gmail.com",
	port: process.env.EMAIL_PORT,
  	secure: process.env.EMAIL_PORT === 465, // true for 465, false for 587
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS
	},
	tls: {
		rejectUnauthorized: false
	} 
});

export const sendEmail = async ({ to, subject, text }) => {
	try {
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to,
			subject,
			text
		};

		const info = await transporter.sendMail(mailOptions);
    	return info;
	} catch (error) {
		throw error;
	}
};

export default transporter;