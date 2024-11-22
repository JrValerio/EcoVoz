import { Router } from 'express';
import { validateRegister, validateLogin } from '../validators/userValidators';
import AuthController from '../controllers/AuthController';
import authMiddleware from '../middlewares/authMiddleware';
import validateObjectId from '../middlewares/validateObjectId';

const router = Router();

// Rotas abertas
router.post('/register', validateRegister, AuthController.createUser);
router.post('/login', validateLogin, AuthController.login);
router.post('/google', AuthController.googleLogin);

// Rotas protegidas
router.use(authMiddleware);

router.get('/users/:id', validateObjectId, AuthController.getUser);
router.put('/users/:id', validateObjectId, AuthController.updateUser);

export default router;
