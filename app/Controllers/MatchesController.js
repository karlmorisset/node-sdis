import { format, parseISO } from 'date-fns';
import Match from '../Models/Match';
import { getApiData } from '../Services/dataService';
import Comment from '../Models/Comment';

/**
 * Affiche tous les matches
 *
 * @param {Request} req
 * @param {Response} res
 */
export const allMatches = async (req, res) => {
  try {
    const matches = await Match.find();

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
    const matches = await Match.find({ played: true });

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
    const matches = await Match.find({ played: false });

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

  const match = await Match.findById(id);
  const comments = await Comment.find({ match: id });

  res.status(200).render('matches/show', { match, comments });
};

/**
 * Synchronise les données de l'API RWC avec la base MongoDB
 *
 * @param {Request} req
 * @param {Response} res
 */
export const syncData = async (req, res) => {
  await Match.deleteMany({});

  const { matches } = await getApiData();

  matches.forEach(async (m) => {
    await Match.create({
      teams: `${m.teams[0].name} / ${m.teams[1].name}`,
      scores: `${m.scores[0]} / ${m.scores[1]}`,
      date: m.time.label,
      venue: {
        name: m.venue.name,
        city: m.venue.city,
      },
      status: m.status,
      played: m.status === 'C',
    });
  });

  res.redirect('back');
};
