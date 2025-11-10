import mongoose from 'mongoose';

const trainingSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    duration: { type: Number }, // duración en minutos
    type: { type: String, enum: ['Físico', 'Técnico', 'Táctico'], default: 'Físico' },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('Training', trainingSchema);
