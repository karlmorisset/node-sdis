import jwt from 'jsonwebtoken';
import User from '../Models/User';
import handleErrors from '../Services/validationError';

// Affichage du formulaire d'inscription d'un utilisateur
export const signUp = (req, res) => {
  try {
    res.status(200).render('auth/signup');
  } catch (error) {
    console.warn(error);
  }
};

// Enregistrement d'un utilisateur
export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });

    res.status(201).json({ user });
  } catch (error) {
    res.status(403).json({ errors: handleErrors(error) });
  }
};

// Affichage du formulaire de connexion
export const login = async (req, res) => {
  try {
    res.status(200).render('auth/login');
  } catch (error) {
    console.warn(error);
  }
};

// Connexion d'un utilisateur
export const connection = async (req, res) => {
  const { email, password } = req.body;

  const maxAge = 60 * 60 * 24;

  let user;

  try {
    user = await User.login(email, password);
  } catch (error) {
    res.status(403).json({ errors: handleErrors(error) });
  }

  if (user) {
    const token = jwt.sign({ user: user.id }, process.env.JWT_SECRET, {
      expiresIn: maxAge, // en secondes
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000, // en millisecondes
    });

    res.status(200).json({ user });
  }
};

export const logout = (req, res) => {
  try {
    res.locals.user = null;
    res.cookie('jwt', '', { maxAge: 1 });

    res.status(200).end();
  } catch (error) {
    console.warn(error);
  }
};
