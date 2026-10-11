import express from 'express';
import {
  getAdminStats,
  getAllBookings,
  updateBookingStatus,
  getAllUsers,
  getAllContactRequests,
  updateContactStatus,
  getSubscribers,
} from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, adminOnly);

router.get('/stats', getAdminStats);
router.get('/bookings', getAllBookings);
router.put('/bookings/:id/status', updateBookingStatus);
router.get('/users', getAllUsers);
router.get('/contact', getAllContactRequests);
router.put('/contact/:id', updateContactStatus);
router.get('/subscribers', getSubscribers);

export default router;
