import express from 'express';
import mongoose from 'mongoose';
import { createServer } from 'node:http';
import 'dotenv/config';

/**
 * Démarre l'application
 */
export const start = (port = null) => {
  const app = express();
  const httpServer = createServer(app);
  const realPort = port || process.env.NODE_PORT;

  httpServer.listen(realPort);
  console.log(`Application lancée sur le port ${realPort}`);

  return { app, httpServer };
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
