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

// Connexion d'unn utilisateur
export const connection = (req, res) => {
  const { email, password } = req.body;

  try {
    User.login(email, password);
  } catch (error) {
    res.status(403).json({ errors: handleErrors(error) });
  }
};
