import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Constantes para os temas
const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

// Interface para o contexto do tema
interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}

// Cria o contexto com valores padrão
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Provedor do Tema
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicializa o estado com o tema salvo no localStorage (ou padrão: 'light')
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || LIGHT_THEME;
  });

  // Alterna o tema e salva no localStorage
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  // Atualiza a classe do tema no elemento <body>
  useEffect(() => {
    const rootElement = document.documentElement;
    rootElement.classList.remove(LIGHT_THEME, DARK_THEME);
    rootElement.classList.add(theme); // Adiciona a classe 'light' ou 'dark'
  
    // Atualiza também o estilo do body para refletir o fundo corretamente
    document.body.className = theme === DARK_THEME ? 'dark:bg-gray-900' : 'bg-gray-100';
  }, [theme]);
  
  
  
  

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para usar o contexto do tema
export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
