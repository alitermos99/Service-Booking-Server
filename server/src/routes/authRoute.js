import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { register, login, logout, updateProfile, changePassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/profile", authMiddleware, updateProfile);
router.patch("/change-password", authMiddleware, changePassword);

export default router;