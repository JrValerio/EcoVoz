import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Função para verificar o token do Google
export async function verifyGoogleToken(idToken: string) {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload) {
      throw new Error('Token inválido ou payload vazio.');
    }

    return payload; // Retorna as informações do usuário autenticado
  } catch (error) {
    console.error('Erro ao verificar o token do Google:', error);
    throw new Error('Falha na verificação do token.');
  }
}
