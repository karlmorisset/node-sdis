import { DataTypes } from 'sequelize';
import { sequelize } from '../../../app';

const Match = sequelize.define(
  'Match',
  {
    teams: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Merci de saisir le noms des équipes',
        },
      },
    },
    scores: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Merci de saisir le score du match',
        },
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Merci de saisir la date du match',
        },
      },
    },
    venue: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    status: {
      type: DataTypes.STRING,
    },
    played: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return !!this.getDataValue('played');
      },
    },
  },
  { timestamps: false },
);

export default Match;
