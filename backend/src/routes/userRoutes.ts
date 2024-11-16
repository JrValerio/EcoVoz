import { Router } from 'express';
import { body } from 'express-validator';

import UserController from '../controllers/UserController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post(
  '/register',
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
  UserController.createUser.bind(UserController),
);

router.post('/login', UserController.login.bind(UserController));

router.get('/users/:id', authMiddleware, (req, res, next) => {
  UserController.getUser(req, res).catch(next);
});
router.put('/users/:id', authMiddleware, (req, res, next) => {
  UserController.updateUser(req, res).catch(next);
});
router.delete('/users/:id', authMiddleware, (req, res, next) => {
  UserController.deleteUser(req, res).catch(next);
});

export default router;
