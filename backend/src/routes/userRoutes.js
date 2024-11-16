import { Router } from 'express';
import { validateRegister, validateLogin } from '../validators/userValidators';
import UserController from '../controllers/UserController';
import authMiddleware from '../middlewares/authMiddleware';
const router = Router();
// Rotas abertas
router.post('/register', validateRegister, UserController.createUser);
router.post('/login', validateLogin, UserController.login);
// Rotas protegidas
router.use(authMiddleware);
router.get('/users/:id', UserController.getUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);
export default router;
