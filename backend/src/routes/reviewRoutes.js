import express from 'express';
import {
  getPackageReviews,
  submitReview,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/package/:packageId', getPackageReviews);
router.post('/', protect, submitReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

export default router;
