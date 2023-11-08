import Comment from '../Models/Comment';
import Match from '../Models/Match';
import handleErrors from '../Services/validationError';

/**
 * Ajoute un commentaire
 *
 * @param {Request} req
 * @param {Response} res
 */
export const store = async (req, res) => {
  const { comment, match: matchId } = req.body;

  try {
    const match = Match.findById(matchId);

    let freshComment = {};
    let newComment = {};

    if (match) {
      freshComment = await Comment.create({
        comment,
        match: matchId,
        user: res.locals.user,
      });

      newComment = await Comment.findById(freshComment.id).populate([
        'match',
        'user',
      ]);
    }

    return res.status(201).json({ newComment });
  } catch (error) {
    return res.status(403).json({ errors: handleErrors(error) });
  }
};

export const destroy = async (req, res) => {
  const { comment: commentId } = req.body;
  const currentUser = res.locals.user;

  const comment = await Comment.findById(commentId);

  try {
    // eslint-disable-next-line no-underscore-dangle
    if (comment && comment.user._id.toString() === currentUser) {
      await Comment.deleteOne({ _id: comment });
      return res.send(204).end();
    }
  } catch (error) {
    return res.send(500).end();
  }
};
