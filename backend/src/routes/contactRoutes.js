import express from 'express';
import { submitContactRequest } from '../controllers/contactController.js';

const router = express.Router();

router.post('/', submitContactRequest);

export default router;
