import { Router } from 'express';
import {
  signUp,
  login,
  register,
  connection,
  logout,
} from '../Controllers/authController';

const router = Router();

router.get('/signup', signUp);
router.post('/signup', register);
router.get('/login', login);
router.post('/login', connection);
router.post('/logout', logout);

export default router;
