import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
  createProgress, 
  getProgress, 
  getProgressById, 
  updateProgress, 
  deleteProgress 
} from '../controllers/progressController.js';

const router = express.Router();

// 📊 Rutas protegidas (solo usuarios logueados)
router.route('/')
  .post(protect, createProgress)   // Crear nuevo registro
  .get(protect, getProgress);      // Obtener todos los registros del usuario

router.route('/:id')
  .get(protect, getProgressById)   // Obtener un registro específico
  .put(protect, updateProgress)    // Actualizar registro
  .delete(protect, deleteProgress); // Eliminar registro

export default router;
