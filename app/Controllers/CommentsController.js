import Comment from '../Models/Comment';
import Match from '../Models/Match';

/**
 * Ajoute un commentaire
 *
 * @param {Request} req
 * @param {Response} res
 */
export const store = async (req, res) => {
  const { content, match: matchId } = req.body;

  try {
    const match = Match.findById(matchId);

    if (match) {
      await Comment.create({
        content,
        match: matchId,
      });
    }
  } catch (error) {
    console.warn(error);
  }

  res.redirect('back');
};
