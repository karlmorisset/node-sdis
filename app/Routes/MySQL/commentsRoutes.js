import { Router } from 'express';
import { store, destroy } from '../../Controllers/MySQL/CommentsController';
import { auth } from '../../Middleware/authMiddleware';

const router = Router();

router.post('/', auth, store);
router.delete('/', auth, destroy);

export default router;
