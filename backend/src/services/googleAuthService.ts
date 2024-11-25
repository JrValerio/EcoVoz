import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

import User from '../models/User.js';

// Configuração do cliente OAuth2 do Google
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Interface que define o payload do token do Google.
 */
interface GooglePayload extends TokenPayload {
  sub: string;
  email: string;
  name: string;
  picture: string;
}

/**
 * Interface que define a estrutura de um erro de validação do Mongoose.
 */
interface MongooseValidationError extends Error {
  errors: {
    [key: string]: {
      message: string;
    };
  };
}

/**
 * Função para validar o formato de um endereço de email.
 * @param email O endereço de email a ser validado.
 * @returns True se o email for válido, false caso contrário.
 */
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Controlador para realizar o login com o Google.
 * 
 * @param req A requisição HTTP.
 * @param res A resposta HTTP.
 */
export const googleLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { idToken } = req.body;

    // Valida se o idToken foi fornecido
    if (!idToken) {
      res.status(400).json({ error: 'O idToken é obrigatório.' });
      return;
    }

    console.log('[INFO] Requisição recebida em /api/auth/google:', { idToken });

    // Verifica o token do Google
    const payload = await verifyGoogleToken(idToken);
    if (!payload) {
      res.status(401).json({ error: 'Falha ao validar o token do Google.' });
      return;
    }

    // Extrai os dados do payload
    const email = payload.email || '';
    const name = payload.name || 'Usuário sem nome';
    const picture = payload.picture || '';

    console.log('[INFO] Payload recebido do Google:', payload);

    // Validações adicionais
    if (!validateEmail(email)) {
      res.status(400).json({ error: 'Email inválido.' });
      return;
    }

    if (name.length < 3) {
      res.status(400).json({ error: 'O nome deve ter pelo menos 3 caracteres.' });
      return;
    }

    try {
      // Busca ou cria o usuário no banco de dados
      let user = await User.findOne({ email });
      if (!user) {
        console.log('[INFO] Criando um novo usuário...');
        user = new User({
          googleId: payload.sub,
          username: name,
          email,
          picture,
        });
        await user.save();
        console.log('[SUCCESS] Usuário criado:', user);
      } else {
        console.log('[INFO] Usuário encontrado:', user);
      }

      // Gera o token JWT
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: '1h' },
      );

      // Configuração do cookie HttpOnly com o token JWT
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600 * 1000, // 1 hora
      });

      console.log('[SUCCESS] Usuário autenticado com sucesso:', { user, token });

      // Retorna os dados do usuário
      res.status(200).json({ user }); // Remove o token da resposta JSON, pois ele está no cookie
    } catch (error: unknown) {
      // Tratamento de erros específicos do Mongoose
      if (error instanceof Error && 'errors' in error) {
        const validationErrors = Object.values((error as MongooseValidationError).errors).map((err) => err.message);
        res.status(400).json({ error: validationErrors.join('; ') });
      } else {
        console.error('[ERROR] Erro ao salvar o usuário:', error);
        res.status(500).json({
          error: 'Erro ao processar a autenticação. Por favor, tente novamente mais tarde.',
        });
      }
    }
  } catch (error) {
    console.error('[ERROR] Erro no login com Google:', error);
    res.status(500).json({
      error: 'Ocorreu um erro inesperado ao autenticar com o Google.',
    });
  }
};

/**
 * Verifica o token do Google e retorna o payload.
 * @param idToken O token de identidade do Google.
 * @returns O payload do token ou null em caso de erro.
 */
export const verifyGoogleToken = async (idToken: string): Promise<GooglePayload | null> => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      console.warn('[WARN] Payload inválido recebido do Google:', payload);
      return null;
    }
    return payload as GooglePayload;
  } catch (error) {
    console.error('[ERROR] Erro ao verificar o token do Google:', error);
    return null;
  }
};