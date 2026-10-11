import express from 'express';
import {
  getHotspots,
  getHotspotById,
  createHotspot,
  updateHotspot,
  deleteHotspot,
} from '../controllers/hotspotController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getHotspots)
  .post(protect, adminOnly, createHotspot);

router.route('/:id')
  .get(getHotspotById)
  .put(protect, adminOnly, updateHotspot)
  .delete(protect, adminOnly, deleteHotspot);

export default router;
