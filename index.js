import express from 'express';
import { getPlayedMatches, getScheduldedMatches } from './rugby-data.js';

const app = express();

app.use('/played', async (req, res) => {
  const playedMatches = await getPlayedMatches();
  res.status(200).json(playedMatches);
});

app.use('/scheduled', async (req, res) => {
  const scheduldedMatches = await getScheduldedMatches();
  res.status(200).json(scheduldedMatches);
});

app.listen(3000);
