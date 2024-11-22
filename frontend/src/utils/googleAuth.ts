export const handleGoogleLogin = async (idToken: string) => {
  try {
    const response = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao autenticar com o Google.');
    }

    const data = await response.json();
    return data; // Retorna os dados do backend
  } catch (error) {
    console.error('Erro no login com Google:', error);
    throw error;
  }
};
