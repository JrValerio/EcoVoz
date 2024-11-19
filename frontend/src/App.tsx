import React from 'react';
import { Suspense } from 'react';
import './i18n/i18n';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ThemeProvider>
        <div className="app-container">
          <Header />
          <main id="main-content" className="flex-grow" role="main">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
