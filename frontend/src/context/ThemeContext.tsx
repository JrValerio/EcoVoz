import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Constantes para os temas
const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

// Interface para o contexto do tema
interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}

// Cria o contexto do tema
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

/**
 * Provedor do tema para a aplicação.
 * Gerencia o estado do tema e atualiza a classe do elemento body.
 * @param children Os componentes filhos que serão envolvidos pelo provedor.
 * @returns O componente ThemeContext.Provider com o valor do tema e a função para alternar o tema.
 */
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicializa o estado do tema com o valor do localStorage ou o tema claro como padrão
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || LIGHT_THEME;
  });

  /**
   * Alterna o tema entre claro e escuro e salva no localStorage.
   */
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  // Atualiza a classe do tema no elemento body quando o tema muda
  useEffect(() => {
    const rootElement = document.documentElement;
    rootElement.classList.remove(LIGHT_THEME, DARK_THEME);
    rootElement.classList.add(theme);

    // Atualiza o estilo do body para refletir o fundo corretamente
    document.body.className = theme === DARK_THEME ? 'dark:bg-gray-900' : 'bg-gray-100';
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook para acessar o contexto do tema.
 * @returns O contexto do tema, contendo o tema atual e a função para alternar o tema.
 * @throws Erro se o hook for usado fora de um ThemeProvider.
 */
export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};