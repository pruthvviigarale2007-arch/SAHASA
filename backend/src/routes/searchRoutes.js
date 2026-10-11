import express from 'express';
import { searchUnified } from '../controllers/searchController.js';

const router = express.Router();

router.get('/', searchUnified);

export default router;
