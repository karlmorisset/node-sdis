import { Router } from 'express';
import download from '../Controllers/downloadController';

const router = Router();

router.get('/', download);

export default router;
