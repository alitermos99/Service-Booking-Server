import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { 
	createAppointment,
	getUserAppointments,
	cancelAppointment
} from "../controllers/appointmentController.js";

const router = express.Router();

router.use(authMiddleware);

router.get('/', getUserAppointments);
router.post('/', createAppointment);
router.post('/:id', cancelAppointment);

export default router;