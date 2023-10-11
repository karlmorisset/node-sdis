import { Router } from 'express';
import {
  allMatches,
  playedMatches,
  scheduledMatches,
  show,
  syncData,
} from '../Controllers/MatchesController';

const router = Router();

router.get('/', allMatches);
router.get('/show/:id', show);
router.get('/played', playedMatches);
router.get('/scheduled', scheduledMatches);
router.get('/sync-data', syncData);

export default router;
