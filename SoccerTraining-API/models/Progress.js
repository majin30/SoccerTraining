import mongoose from 'mongoose';

const progressSchema = mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    date: { 
      type: Date, 
      default: Date.now 
    },
    weight: { type: Number },          // Peso corporal (kg)
    height: { type: Number },          // Altura (cm)
    speed: { type: Number },           // Velocidad máxima (km/h)
    endurance: { type: Number },       // Resistencia (min corriendo)
    strength: { type: Number },        // Fuerza (kg en press de banca o similar)
    matchesPlayed: { type: Number },   // Partidos jugados
    goals: { type: Number },           // Goles marcados
    assists: { type: Number },         // Asistencias
    notes: { type: String },           // Comentarios del entrenamiento
  },
  { timestamps: true }
);

export default mongoose.model('Progress', progressSchema);
