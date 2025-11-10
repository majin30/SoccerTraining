import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createTraining, getTrainings, getTrainingById, updateTraining, deleteTraining } from '../controllers/trainingController.js';

const router = express.Router();

router.route('/')
  .post(protect, createTraining)
  .get(protect, getTrainings);

router.route('/:id')
  .get(protect, getTrainingById)
  .put(protect, updateTraining)
  .delete(protect, deleteTraining);

export default router;
