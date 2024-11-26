/**
 * Obtém o cabeçalho de autorização com o token JWT.
 *
 * @returns Um objeto contendo o cabeçalho de autorização ou um objeto vazio se o token não estiver presente ou inválido.
 */
export const getAuthHeader = (): Record<string, string> => {
  try {
    // Obtém o token do localStorage
    const token = localStorage.getItem('authToken');

    // Verifica se o token está presente
    if (token) {
      // Validação opcional do formato do token (ex.: JWT deve conter 3 partes separadas por '.')
      if (token.split('.').length === 3) {
        return { Authorization: `Bearer ${token}` };
      } else {
        console.error('Invalid token format:', token);
        return {};
      }
    }

    // Loga quando o token está ausente (apenas em ambiente de desenvolvimento)
    if (process.env.NODE_ENV === 'development') {
      console.warn('Auth token is missing. Ensure the user is logged in.');
    }

    return {};
  } catch (error) {
    console.error('Error retrieving auth token:', error);
    return {};
  }
};
