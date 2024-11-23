/**
 * Obtém o cabeçalho de autorização com o token JWT.
 * 
 * @returns Um objeto contendo o cabeçalho de autorização ou um objeto vazio se o token não estiver presente.
 */
export const getAuthHeader = (): Record<string, string> => {
    // Obtém o token do localStorage
    const token = localStorage.getItem('authToken');
  
    // Se o token existir, retorna o cabeçalho de autorização
    if (token) {
      return { Authorization: `Bearer ${token}` }; 
    }
  
    // Caso contrário, retorna um objeto vazio
    return {}; 
  };