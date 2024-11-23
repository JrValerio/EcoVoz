import api from './api';

interface ProfileUpdates {
  name?: string;
  email?: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  picture?: string; // Caso haja uma imagem associada ao perfil
}

/**
 * Função para validar o formato de um email.
 * @param email O email a ser validado.
 * @returns True se o email for válido, false caso contrário.
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Função para validar o formato do ID do usuário (exemplo usando UUID).
 * @param userId O ID do usuário.
 * @returns True se o ID for válido, false caso contrário.
 */
const isValidUserId = (userId: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(userId);
};

/**
 * Serviço para atualizar o perfil do usuário.
 * @param userId O ID do usuário.
 * @param updates As informações a serem atualizadas.
 * @returns Os dados do perfil atualizado.
 */
export const updateUserProfile = async (
  userId: string,
  updates: ProfileUpdates,
): Promise<UserProfile> => {
  try {
    // Valida o userId
    if (!isValidUserId(userId)) {
      throw new Error('ID de usuário inválido.');
    }

    // Valida o email (se fornecido)
    if (updates.email && !isValidEmail(updates.email)) {
      throw new Error('Formato de email inválido.');
    }

    // Envia a requisição ao backend
    const response = await api.put(`/api/users/${userId}`, updates);
    console.log('[INFO] Perfil atualizado com sucesso:', response.data);
    return response.data;
  } catch (error: unknown) {
    console.error('[ERROR] Erro ao atualizar o perfil:', error);

    // Repassa uma mensagem de erro mais detalhada ao chamador
    const errorMessage =
      error instanceof Error ? error.message : 'Erro desconhecido ao atualizar o perfil.';
    throw new Error(errorMessage);
  }
};
