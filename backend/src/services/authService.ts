import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User'; 
import { IUser } from 'src/types/IUser';

/**
 * Gera um access token JWT.
 * @param userId O ID do usuário.
 * @returns O access token JWT.
 */
const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '15m' });
};

/**
 * Gera um refresh token JWT.
 * @param userId O ID do usuário.
 * @returns O refresh token JWT.
 */
const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
};

/**
 * Realiza o login do usuário.
 * @param req A requisição HTTP.
 * @param res A resposta HTTP.
 */
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
    const { email, password } = req.body;

  // Lógica de autenticação do usuário
  const user = await User.findOne({ email }) as IUser;

  if (!user || !(await user.isValidPassword(password))) {
    res.status(401).json({ error: 'Credenciais inválidas.' });
  }

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  // Armazena o refresh token em um cookie seguro
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
  });

  res.status(200).json({ accessToken, user });
  } catch (error) {
    next(error); // Passa o erro para o próximo middleware (tratamento de erros)
  }
};