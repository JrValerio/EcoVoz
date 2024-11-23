import React, { Suspense } from 'react';

// Importações da aplicação
import './i18n/i18n'; // Configuração de internacionalização
import AppRoutes from './routes/AppRoutes'; // Rotas da aplicação
import Header from './components/Header'; // Componente do cabeçalho
import Footer from './components/Footer'; // Componente do rodapé
import Loading from './components/Loading'; // Componente de carregamento

/**
 * Componente principal da aplicação.
 * Renderiza o cabeçalho, o conteúdo principal (com as rotas) e o rodapé.
 * Utiliza Suspense para exibir um componente de carregamento enquanto a aplicação é renderizada.
 */
const App: React.FC = () => {
  return (
    <Suspense fallback={<Loading aria-live="polite" />}> 
      {/* Contêiner principal com classes para flexbox e tema claro/escuro */}
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900"> 
        <Header /> {/* Renderiza o componente do cabeçalho */}

        {/* Área de conteúdo principal */}
        <main
          id="main-content"
          className="flex-grow container mx-auto p-4" 
          role="main"
          aria-label="Main Content"
          tabIndex={-1} // Permite que o elemento receba foco via teclado
        >
          <AppRoutes /> {/* Renderiza as rotas da aplicação */}
        </main>

        <Footer /> {/* Renderiza o componente do rodapé */}
      </div>
    </Suspense>
  );
};

export default App;