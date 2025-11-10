import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getUserAchievements, checkAndUnlockAchievements } from '../controllers/achievementController.js';

const router = express.Router();

// Obtener logros del usuario (verifica y desbloquea antes de devolver)
router.get('/', protect, async (req, res) => {
  try {
    // Verificar y desbloquear logros antes de obtenerlos
    await checkAndUnlockAchievements(req.user._id);
    
    // Obtener logros actualizados
    await getUserAchievements(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener logros' });
  }
});

export default router;
