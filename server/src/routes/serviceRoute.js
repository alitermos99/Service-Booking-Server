import express from 'express';
import { createService, getService, getServices, updateService, deleteService } from '../controllers/serviceController.js';
import { authorize } from '../middlewares/roleMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.use(authorize('admin'));

router.get('/', getServices);
router.get('/:id', getService);
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;