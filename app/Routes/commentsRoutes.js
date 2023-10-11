import { Router } from 'express';
import { store } from '../Controllers/CommentsController';

const router = Router();

router.post('/', store);

export default router;
