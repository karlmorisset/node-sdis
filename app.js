import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

/**
 * Démarre l'application
 */
export const start = (port = null) => {
  const app = express();
  const realPort = port || process.env.NODE_PORT;

  app.listen(realPort);
  console.log(`Application lancée sur le port ${realPort}`);

  return app;
};

/**
 * Se connecte à la base de données MongoDB
 */
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNX);
    console.warn('Connecté à la base de données');
  } catch (error) {
    console.warn(error);
  }
};
