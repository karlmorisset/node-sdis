import { Schema, model } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';
import ValidationError from '../Exceptions/ValidationError';

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Merci de saisir un email'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [isEmail, "Cet email n'est pas valide"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Merci de saisir un mot de passe'],
    minLength: [6, 'Le mot de passe doit avoir 6 caractères minimum'],
  },
});

async function encryptPassword(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
}

userSchema.pre('save', encryptPassword);

userSchema.statics.login = async function login(email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    throw new ValidationError('Informations invalides', {
      email: 'Email ou mot de passe invalide',
      password: 'Email ou mot de passe invalide',
    });
  }
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error({
      errors: {
        email: 'Email ou mot de passe invalide',
        password: 'Email ou mot de passe invalide',
      },
    });
  }

  return user;
};

export default model('User', userSchema);
