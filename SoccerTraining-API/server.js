import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import trainingRoutes from './routes/trainingRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import nutritionRoutes from './routes/nutritionRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('⚽ SoccerTraining API is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/achievements', achievementRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
