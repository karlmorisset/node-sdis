import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import { start, connectDB } from './app';
import matchesRouter from './app/Routes/matchesRoutes';
import commentsRouter from './app/Routes/commentsRoutes';
import authRouter from './app/Routes/authRoutes';

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
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('hello');
});
