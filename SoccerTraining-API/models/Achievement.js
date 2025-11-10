import mongoose from 'mongoose';

const achievementSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    achievementType: {
      type: String,
      required: true,
      enum: [
        'first_training',
        'training_streak_3',
        'training_streak_7',
        'training_streak_30',
        'total_trainings_5',
        'total_trainings_10',
        'total_trainings_25',
        'total_trainings_50',
        'speed_milestone',
        'endurance_milestone',
        'strength_milestone',
      ],
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '🏆',
    },
    unlockedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Índice para búsquedas rápidas
achievementSchema.index({ user: 1, achievementType: 1 }, { unique: true });

export default mongoose.model('Achievement', achievementSchema);

