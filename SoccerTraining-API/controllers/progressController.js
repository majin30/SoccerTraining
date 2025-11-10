import Progress from '../models/Progress.js';

// Crear nuevo registro de progreso
export const createProgress = async (req, res) => {
  try {
    const progress = await Progress.create({
      user: req.user._id,
      ...req.body,
    });
    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar progreso' });
  }
};

// Obtener progreso del usuario (últimos registros)
export const getProgress = async (req, res) => {
  try {
    const progressData = await Progress.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(progressData);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener progreso' });
  }
};

// Obtener un único registro por ID
export const getProgressById = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);
    if (!progress) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener registro' });
  }
};

// Actualizar un registro
export const updateProgress = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);
    if (!progress) return res.status(404).json({ message: 'Registro no encontrado' });

    if (progress.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const updated = await Progress.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar progreso' });
  }
};

// Eliminar un registro
export const deleteProgress = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);
    if (!progress) return res.status(404).json({ message: 'Registro no encontrado' });

    if (progress.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    await progress.deleteOne();
    res.json({ message: 'Registro eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar registro' });
  }
};
