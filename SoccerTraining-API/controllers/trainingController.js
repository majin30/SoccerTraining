import Training from '../models/Training.js';
import { checkAndUnlockAchievements } from './achievementController.js';

// Crear entrenamiento
export const createTraining = async (req, res) => {
  try {
    const training = await Training.create({
      user: req.user._id,
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      type: req.body.type,
    });
    
    // Verificar y desbloquear logros después de crear un entrenamiento
    checkAndUnlockAchievements(req.user._id).catch((err) => {
      console.error('Error al verificar logros:', err);
    });

    console.log(
      `[Training] Usuario ${req.user?.email ?? req.user?._id} creó un entrenamiento "${training.title}" (${training._id})`
    );
    
    res.status(201).json(training);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear entrenamiento' });
  }
};

// Obtener entrenamientos
export const getTrainings = async (req, res) => {
  try {
    const trainings = await Training.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener entrenamientos' });
  }
};

// Obtener un entrenamiento por ID
export const getTrainingById = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) return res.status(404).json({ message: 'Entrenamiento no encontrado' });

    if (training.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    res.json(training);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener entrenamiento' });
  }
};

// Actualizar entrenamiento
export const updateTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) return res.status(404).json({ message: 'Entrenamiento no encontrado' });

    if (training.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    training.title = req.body.title || training.title;
    training.description = req.body.description !== undefined ? req.body.description : training.description;
    training.duration = req.body.duration || training.duration;
    training.type = req.body.type || training.type;

    const updatedTraining = await training.save();
    res.json(updatedTraining);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar entrenamiento' });
  }
};

// Eliminar entrenamiento
export const deleteTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) return res.status(404).json({ message: 'Entrenamiento no encontrado' });

    if (training.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    await training.deleteOne();
    console.log(
      `[Training] Usuario ${req.user?.email ?? req.user?._id} eliminó el entrenamiento "${training.title}" (${training._id})`
    );
    res.json({ message: 'Entrenamiento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar entrenamiento' });
  }
};