import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

interface GoogleAuthProviderProps {
  children: React.ReactNode;
}

/**
 * Componente que fornece o contexto de autenticação do Google para a aplicação.
 * @param children Os componentes filhos que serão envolvidos pelo provedor.
 * @returns O componente GoogleOAuthProvider com o ID do cliente do Google.
 */
const GoogleAuthProvider: React.FC<GoogleAuthProviderProps> = ({ children }) => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!clientId) {
    console.error('[ERROR] A variável de ambiente VITE_GOOGLE_CLIENT_ID não está definida.');
    return null; // Ou renderize um componente de erro
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthProvider;