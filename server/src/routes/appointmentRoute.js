import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { 
	createAppointment,
	getUserAppointment,
	getUserAppointments,
	updateAppointment,
	cancelAppointment
} from "../controllers/appointmentController.js";

const router = express.Router();

router.use(authMiddleware);

router.get('/', getUserAppointments);
router.get('/:id', getUserAppointment);
router.post('/', createAppointment);
router.put('/:id', updateAppointment);
router.post('/:id', cancelAppointment);

export default router;