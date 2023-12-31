import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import { start, connectDB, connectMySQL } from './app';
import matchesRouter from './app/Routes/MySQL/matchesRoutes';
import commentsRouter from './app/Routes/MySQL/commentsRoutes';
import authRouter from './app/Routes/MySQL/authRoutes';
import downloadRouter from './app/Routes/MySQL/downloadsRoutes';
import { authUser } from './app/Middleware/authMiddleware';

// Démarrage de l'application
//connectDB();
connectMySQL();
const { app, httpServer } = start();

// Définition du répertoire des ressources statiques
app.use(express.static('public'));

// Définition du moteur de rendu
app.use(expressEjsLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Middleware permettant d'extraire le body d'une requête
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// Permet d'ajouter l'utilisateur aux locals de la réponse
app.use(authUser);

const io = new Server(httpServer);

io.on('connection', (socket) => {
  socket.on('commentAddedFromFront', (data) => {
    io.sockets.emit('commentAddedfromBack', data);
  });

  console.log('connected à socket.io');
});

// Routes de l'application
app.use('/matches', matchesRouter);
app.use('/comments', commentsRouter);
app.use('/auth', authRouter);
app.use('/downloads', downloadRouter);

app.get('/', (req, res) => {
  res.redirect('/matches');
});
