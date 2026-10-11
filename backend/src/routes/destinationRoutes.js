import express from 'express';
import {
  getDestinations,
  getDestinationBySlug,
  createDestination,
  updateDestination,
  deleteDestination,
} from '../controllers/destinationController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getDestinations)
  .post(protect, adminOnly, createDestination);

router.route('/:slug')
  .get(getDestinationBySlug);

router.route('/:id')
  .put(protect, adminOnly, updateDestination)
  .delete(protect, adminOnly, deleteDestination);

export default router;
