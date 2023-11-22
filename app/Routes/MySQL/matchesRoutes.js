import { Router } from 'express';
import {
  allMatches,
  playedMatches,
  scheduledMatches,
  show,
  syncData,
} from '../../Controllers/MySQL/MatchesController';
import { auth } from '../../Middleware/authMiddleware';

const router = Router();

router.get('/', auth, allMatches);
router.get('/show/:id', auth, show);
router.get('/played', auth, playedMatches);
router.get('/scheduled', auth, scheduledMatches);
router.get('/sync-data', auth, syncData);

export default router;
