import express from 'express';
import { createService, getServices, updateService, deleteService } from '../controllers/serviceController.js';
import { authorize } from '../middlewares/roleMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.use(authorize('admin'));

router.post('/', createService);
router.get('/', getServices);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;