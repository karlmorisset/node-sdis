import bcrypt from 'bcryptjs';
import { DataTypes } from 'sequelize';
import { sequelize } from '../../../app';
import ValidationError from '../../Exceptions/ValidationError';
import ValidationErrorItem from '../../Exceptions/ValidationErrorItem';

async function encryptPassword(user) {
  const salt = await bcrypt.genSalt();

  const hashedPassword = await bcrypt.hash(user.getDataValue('password'), salt);

  user.setDataValue('password', hashedPassword);

  return hashedPassword;
}

const User = sequelize.define(
  'User',
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Cet email est déjà utilisé',
      },
      validate: {
        notNull: {
          msg: 'Merci de saisir un email',
        },
        notEmpty: {
          msg: 'Merci de saisir un email',
        },
        isEmail: {
          msg: 'Merci de saisir un email valide',
        },
      },
      set(value) {
        this.setDataValue('email', value.toLowerCase());
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Merci de saisir un mot de passe',
        },
        notEmpty: {
          msg: 'Merci de saisir un mot de passe',
        },
        len: {
          args: 6,
          msg: 'Le password doit avoir au minimum 6 caractères',
        },
      },
    },
  },
  {
    timestamps: false,
    hooks: {
      beforeCreate: encryptPassword,
    },
  },
);

const throwValidationError = () => {
  throw new ValidationError('Identifiants incorrects', [
    new ValidationErrorItem('email', 'Email ou mot de passe invalide'),
    new ValidationErrorItem('password', 'Email ou mot de passe invalide'),
  ]);
};

User.login = async function login(email, password) {
  const user = await this.findOne({
    where: {
      email,
    },
  });

  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) return user;
  }

  throwValidationError();
};

export default User;
