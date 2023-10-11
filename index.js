import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import { start, connectDB } from './app.js';
import matchesRouter from './app/Routes/matchesRoutes.js';
import commentsRouter from './app/Routes/commentsRoutes.js';

// Démarrage de l'application
connectDB();
const app = start();

// Définition du répertoire des ressources statiques
app.use(express.static('public'));

// Définition du moteur de rendu
app.use(expressEjsLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Middleware permettant d'extraire le body d'une requête
app.use(express.json());
app.use(express.urlencoded());

// Routes de l'application
app.use('/matches', matchesRouter);
app.use('/comments', commentsRouter);

app.get('/', (req, res) => {
  res.send('hello');
});

// import express from 'express';
// import { getPlayedMatches, getScheduldedMatches } from './rugby-data.js';

// const app = express();

// app.use('/played', async (req, res) => {
//   const playedMatches = await getPlayedMatches();
//   res.status(200).json(playedMatches);
// });

// app.use('/scheduled', async (req, res) => {
//   const scheduldedMatches = await getScheduldedMatches();
//   res.status(200).json(scheduldedMatches);
// });

// app.listen(3000);
