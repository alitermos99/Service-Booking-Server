import express from 'express';
import { createService, getServices, updateService, deleteService, createServiceRules } from '../controllers/serviceController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.use(authorize('admin'));

router.post('/', createServiceRules, createService);
router.get('/', getServices);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;