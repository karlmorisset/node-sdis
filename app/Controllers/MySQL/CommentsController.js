import Comment from '../../Models/MySQL/Comment';
import Match from '../../Models/MySQL/Match';
import User from '../../Models/MySQL/User';
import handleErrors from '../../Services/validationError';

/**
 * Ajoute un commentaire
 *
 * @param {Request} req
 * @param {Response} res
 */
export const store = async (req, res) => {
  const { comment, match: matchId } = req.body;

  try {
    const match = Match.findByPk(matchId);

    let freshComment = {};
    let newComment = {};

    if (match) {
      freshComment = await Comment.create({
        comment,
        matchId,
        authorId: res.locals.user.id,
      });

      newComment = await Comment.findByPk(freshComment.id, {
        include: [
          {
            model: User,
            as: 'author',
            required: true,
          },
          {
            model: Match,
            as: 'match',
            required: true,
          },
        ],
      });
    }

    return res.status(201).json(newComment);
  } catch (error) {
    return res.status(403).json({ errors: handleErrors(error) });
  }
};

export const destroy = async (req, res) => {
  const { comment: commentId } = req.body;
  const currentUser = res.locals.user;

  const comment = await Comment.findByPk(commentId, {
    include: [
      {
        model: User,
        as: 'author',
        required: true,
      },
      {
        model: Match,
        as: 'match',
        required: true,
      },
    ],
  });

  try {
    // eslint-disable-next-line no-underscore-dangle
    if (comment && comment.author.id === currentUser.id) {
      await comment.destroy();
      return res.send(204).end();
    }
  } catch (error) {
    return res.send(500).end();
  }
};
