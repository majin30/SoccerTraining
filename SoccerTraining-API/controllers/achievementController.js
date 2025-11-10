import Achievement from '../models/Achievement.js';
import Training from '../models/Training.js';
import Progress from '../models/Progress.js';

// Definir todos los logros disponibles
const ACHIEVEMENTS_DEFINITIONS = {
  first_training: {
    title: 'Primer Paso',
    description: 'Completa tu primer entrenamiento',
    icon: '🎯',
  },
  training_streak_3: {
    title: 'Racha de 3 Días',
    description: 'Entrena 3 días consecutivos',
    icon: '🔥',
  },
  training_streak_7: {
    title: 'Semana de Fuego',
    description: 'Entrena 7 días consecutivos',
    icon: '💪',
  },
  training_streak_30: {
    title: 'Mes de Disciplina',
    description: 'Entrena 30 días consecutivos',
    icon: '👑',
  },
  total_trainings_5: {
    title: 'Principiante',
    description: 'Completa 5 entrenamientos',
    icon: '⭐',
  },
  total_trainings_10: {
    title: 'En Forma',
    description: 'Completa 10 entrenamientos',
    icon: '🌟',
  },
  total_trainings_25: {
    title: 'Atleta',
    description: 'Completa 25 entrenamientos',
    icon: '💎',
  },
  total_trainings_50: {
    title: 'Leyenda',
    description: 'Completa 50 entrenamientos',
    icon: '🏆',
  },
  speed_milestone: {
    title: 'Velocidad Suprema',
    description: 'Alcanza un hito de velocidad',
    icon: '⚡',
  },
  endurance_milestone: {
    title: 'Resistencia Máxima',
    description: 'Alcanza un hito de resistencia',
    icon: '🏃',
  },
  strength_milestone: {
    title: 'Fuerza Total',
    description: 'Alcanza un hito de fuerza',
    icon: '💥',
  },
};

// Obtener todos los logros del usuario
export const getUserAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({ user: req.user._id }).sort({ unlockedAt: -1 });
    
    // Obtener todos los logros disponibles con su estado
    const allAchievements = Object.keys(ACHIEVEMENTS_DEFINITIONS).map((type) => {
      const unlocked = achievements.find((a) => a.achievementType === type);
      return {
        type,
        ...ACHIEVEMENTS_DEFINITIONS[type],
        unlocked: !!unlocked,
        unlockedAt: unlocked?.unlockedAt || null,
      };
    });

    res.json({
      unlocked: achievements,
      all: allAchievements,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener logros' });
  }
};

// Desbloquear un logro (función auxiliar para usar desde otros controladores)
export const unlockAchievement = async (userId, achievementType) => {
  try {
    // Verificar si el logro ya está desbloqueado
    const existing = await Achievement.findOne({
      user: userId,
      achievementType,
    });

    if (existing) {
      return null; // Ya está desbloqueado
    }

    // Verificar que el tipo de logro existe
    if (!ACHIEVEMENTS_DEFINITIONS[achievementType]) {
      return null;
    }

    // Crear el logro
    const achievement = await Achievement.create({
      user: userId,
      achievementType,
      title: ACHIEVEMENTS_DEFINITIONS[achievementType].title,
      description: ACHIEVEMENTS_DEFINITIONS[achievementType].description,
      icon: ACHIEVEMENTS_DEFINITIONS[achievementType].icon,
    });

    return achievement;
  } catch (error) {
    console.error('Error al desbloquear logro:', error);
    return null;
  }
};

// Verificar y desbloquear logros basados en el progreso del usuario
export const checkAndUnlockAchievements = async (userId) => {
  try {
    // Obtener entrenamientos del usuario
    const trainings = await Training.find({ user: userId }).sort({ createdAt: 1 });
    const totalTrainings = trainings.length;

    // Desbloquear logros basados en total de entrenamientos
    if (totalTrainings >= 1) {
      await unlockAchievement(userId, 'first_training');
    }
    if (totalTrainings >= 5) {
      await unlockAchievement(userId, 'total_trainings_5');
    }
    if (totalTrainings >= 10) {
      await unlockAchievement(userId, 'total_trainings_10');
    }
    if (totalTrainings >= 25) {
      await unlockAchievement(userId, 'total_trainings_25');
    }
    if (totalTrainings >= 50) {
      await unlockAchievement(userId, 'total_trainings_50');
    }

    // Calcular racha de días consecutivos
    if (trainings.length > 0) {
      let currentStreak = 1;
      let maxStreak = 1;
      let lastDate = new Date(trainings[0].createdAt);
      lastDate.setHours(0, 0, 0, 0);

      for (let i = 1; i < trainings.length; i++) {
        const currentDate = new Date(trainings[i].createdAt);
        currentDate.setHours(0, 0, 0, 0);
        const diffDays = Math.floor((lastDate - currentDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          currentStreak++;
          maxStreak = Math.max(maxStreak, currentStreak);
        } else if (diffDays > 1) {
          currentStreak = 1;
        }

        lastDate = currentDate;
      }

      // Desbloquear logros de racha
      if (maxStreak >= 3) {
        await unlockAchievement(userId, 'training_streak_3');
      }
      if (maxStreak >= 7) {
        await unlockAchievement(userId, 'training_streak_7');
      }
      if (maxStreak >= 30) {
        await unlockAchievement(userId, 'training_streak_30');
      }
    }

    // Verificar logros de progreso físico
    const latestProgress = await Progress.findOne({ user: userId }).sort({ createdAt: -1 });
    if (latestProgress) {
      if (latestProgress.speed && latestProgress.speed >= 30) {
        await unlockAchievement(userId, 'speed_milestone');
      }
      if (latestProgress.endurance && latestProgress.endurance >= 60) {
        await unlockAchievement(userId, 'endurance_milestone');
      }
      if (latestProgress.strength && latestProgress.strength >= 100) {
        await unlockAchievement(userId, 'strength_milestone');
      }
    }
  } catch (error) {
    console.error('Error al verificar logros:', error);
  }
};

