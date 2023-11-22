import Match from '../../Models/MySQL/Match';
import Comment from '../../Models/MySQL/Comment';
import { getApiData } from '../../Services/dataService';
import User from '../../Models/MySQL/User';

/**
 * Affiche tous les matches
 *
 * @param {Request} req
 * @param {Response} res
 */
export const allMatches = async (req, res) => {
  try {
    await Match.sync();

    const matches = await Match.findAll();

    res.status(200).render('matches/list', { matches });
  } catch (err) {
    console.warn(err);
  }
};

/**
 * Affiche seulement les matches joués
 *
 * @param {Request} req
 * @param {Response} res
 */
export const playedMatches = async (req, res) => {
  try {
    await Match.sync();

    const matches = await Match.findAll({
      where: {
        played: true,
      },
    });

    res.status(200).render('matches/list', { matches });
  } catch (err) {
    console.warn(err);
  }
};

/**
 * Affiche seulement les matches programmés
 *
 * @param {Request} req
 * @param {Response} res
 */
export const scheduledMatches = async (req, res) => {
  try {
    await Match.sync();

    const matches = await Match.findAll({
      where: {
        played: false,
      },
    });

    res.status(200).render('matches/list', { matches });
  } catch (err) {
    console.warn(err);
  }
};

/**
 * Affiche un match en particulier
 *
 * @param {Request} req
 * @param {Response} res
 */
export const show = async (req, res) => {
  const { id } = req.params;

  await Match.sync();
  await Comment.sync();

  const match = await Match.findByPk(id);

  const comments = await Comment.findAll({
    where: {
      matchId: parseInt(id, 10),
    },
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

  res.status(200).render('matches/show', { match, comments });
};

/**
 * Synchronise les données de l'API RWC avec la base MongoDB
 *
 * @param {Request} req
 * @param {Response} res
 */
export const syncData = async (req, res) => {
  await Match.sync({ force: true });

  const { matches } = await getApiData();

  matches.forEach(async (m) => {
    await Match.create({
      teams: `${m.teams[0].name} / ${m.teams[1].name}`,
      scores: `${m.scores[0]} / ${m.scores[1]}`,
      date: m.time.label,
      venue: `${m.venue.name} / ${m.venue.city}`,
      status: m.status,
      played: m.status === 'C',
    });
  });

  res.redirect('back');
};
