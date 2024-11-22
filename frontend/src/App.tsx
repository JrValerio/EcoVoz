import React, { Suspense } from 'react';
import './i18n/i18n'; // Configuração de internacionalização
import AppRoutes from './routes/AppRoutes'; // Rotas da aplicação
import Header from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loading aria-live="polite" />}>
      {/* Contêiner principal com tema aplicado */}
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Cabeçalho da aplicação */}
        <Header />

        {/* Área de conteúdo principal */}
        <main
          id="main-content"
          className="flex-grow container mx-auto p-4"
          role="main"
          aria-label="Main Content"
          tabIndex={-1} // Facilita o foco para navegação acessível
        >
          <AppRoutes />
        </main>

        {/* Rodapé da aplicação */}
        <Footer />
      </div>
    </Suspense>
  );
};

export default App;
