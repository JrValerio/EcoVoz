import { body } from 'express-validator';

/**
 * Middleware para validar os dados de registro de usuário.
 * Verifica se o nome de usuário tem pelo menos 3 caracteres, se o email é válido e se a senha tem pelo menos 6 caracteres.
 */
export const validateRegister = [
  body('username')
    .isString()
    .isLength({ min: 3 })
    .withMessage('O nome de usuário deve ter pelo menos 3 caracteres'),

  body('email')
    .isEmail()
    .withMessage('Formato de e-mail inválido'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('A senha deve ter pelo menos 6 caracteres'),
];

/**
 * Middleware para validar os dados de login de usuário.
 * Verifica se o email é válido e se a senha foi fornecida.
 */
export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Formato de e-mail inválido'),

  body('password')
    .notEmpty()
    .withMessage('A senha é obrigatória'),
];