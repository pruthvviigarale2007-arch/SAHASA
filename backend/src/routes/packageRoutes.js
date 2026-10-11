import express from 'express';
import {
  getPackages,
  getPackageBySlug,
  createPackage,
  updatePackage,
  deletePackage,
} from '../controllers/packageController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getPackages)
  .post(protect, adminOnly, createPackage);

router.route('/:slug')
  .get(getPackageBySlug);

router.route('/:id')
  .put(protect, adminOnly, updatePackage)
  .delete(protect, adminOnly, deletePackage);

export default router;
