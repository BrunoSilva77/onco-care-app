import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeType = 'roxo' | 'rosa' | 'azul';

const THEME_COLORS: Record<ThemeType, { primary: string; gradient: string; light: string; rgb: string }> = {
  roxo: {
    primary: '#8a63e5',
    gradient: 'linear-gradient(135deg, #a580ff, #5eb8ff)',
    light: 'rgba(138, 99, 229, 0.1)',
    rgb: '138, 99, 229',
  },
  rosa: {
    primary: '#e5638a',
    gradient: 'linear-gradient(135deg, #ff8ca3, #ffd1dc)',
    light: 'rgba(229, 99, 138, 0.1)',
    rgb: '229, 99, 138',
  },
  azul: {
    primary: '#3b9dd4',
    gradient: 'linear-gradient(135deg, #5dc3f6, #0077b6)',
    light: 'rgba(59, 157, 212, 0.1)',
    rgb: '59, 157, 212',
  },
};

interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  theme: ThemeType;
  setTheme: (t: ThemeType) => void;
  fontSize: number;
  setFontSize: (s: number) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  darkMode: false, setDarkMode: () => {},
  theme: 'roxo',   setTheme: () => {},
  fontSize: 16,    setFontSize: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode]   = useState(false);
  const [theme, setTheme]         = useState<ThemeType>('roxo');
  const [fontSize, setFontSize]   = useState(16);

  // Dark mode → classe no #root
  useEffect(() => {
    const root = document.getElementById('root');
    if (root) root.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Tema de cores → CSS variables no :root
  useEffect(() => {
    const c = THEME_COLORS[theme];
    document.documentElement.style.setProperty('--color-primary', c.primary);
    document.documentElement.style.setProperty('--color-primary-gradient', c.gradient);
    document.documentElement.style.setProperty('--color-primary-light', c.light);
    document.documentElement.style.setProperty('--color-primary-rgb', c.rgb);
  }, [theme]);

  // Tamanho da fonte → font-size base no #root
  useEffect(() => {
    const root = document.getElementById('root');
    if (root) root.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, theme, setTheme, fontSize, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
