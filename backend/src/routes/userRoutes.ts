import { Router } from 'express';
import { body } from 'express-validator';
import UserController from '../controllers/UserController';

const router = Router();

router.post(
  '/users',
  [
    body('username')
      .isString()
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  UserController.createUser
);

export default router;
