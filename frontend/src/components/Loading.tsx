import React from 'react';

/**
 * Componente que exibe uma tela de carregamento com um spinner e uma mensagem.
 */
const Loading: React.FC = () => {
  return (
    <div className="loading-screen">
      <div className="spinner"></div> 
      <p>Carregando aplicação...</p>
    </div>
  );
};

export default Loading;