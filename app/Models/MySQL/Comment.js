import { DataTypes } from 'sequelize';
import { sequelize } from '../../../app';
import User from './User';
import Match from './Match';

const Comment = sequelize.define(
  'Comment',
  {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Le commentaire ne peut pas être vide',
        },
        notEmpty: {
          msg: 'Le commentaire ne peut pas être vide',
        },
      },
    },
    authorId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    matchId: {
      type: DataTypes.INTEGER,
      references: {
        model: Match,
        key: 'id',
      },
    },
  },
  { timestamps: true },
);

Comment.belongsTo(User, { as: 'author', foreignKey: 'authorId' });
User.hasMany(Comment, { foreignKey: 'authorId' });

Comment.belongsTo(Match, { as: 'match', foreignKey: 'matchId' });
Match.hasMany(Comment, { foreignKey: 'matchId' });

export default Comment;
