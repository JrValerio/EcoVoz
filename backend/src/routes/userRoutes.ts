import { Router } from 'express';

import { validateRegister, validateLogin } from '../validators/userValidators';
import AuthController from '../controllers/AuthController';
import authMiddleware from '../middlewares/authMiddleware';
import validateObjectId from '../middlewares/validateObjectId';

const router = Router();

// Rotas de autenticação abertas
router.post('/register', validateRegister, AuthController.createUser);
router.post('/login', validateLogin, AuthController.login);
router.post('/google', AuthController.googleLogin);

// Aplica o middleware de autenticação a todas as rotas abaixo
router.use(authMiddleware);

// Rotas de usuário protegidas
router.get('/users/:id', validateObjectId, AuthController.getUser);
router.put('/users/:id', validateObjectId, AuthController.updateUser);

export default router;