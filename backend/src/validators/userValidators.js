import { body } from 'express-validator';
export const validateRegister = [
  body('username')
    .isString()
    .isLength({ min: 3 })
    .withMessage('O nome de usuário deve ter pelo menos 3 caracteres'),
  body('email').isEmail().withMessage('Formato de e-mail inválido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('A senha deve ter pelo menos 6 caracteres'),
];
export const validateLogin = [
  body('email').isEmail().withMessage('Formato de e-mail inválido'),
  body('password').notEmpty().withMessage('A senha é obrigatória'),
];
