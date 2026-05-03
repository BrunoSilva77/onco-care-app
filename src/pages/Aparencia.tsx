import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Moon, Sun, Type, Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import type { ThemeType } from '../context/ThemeContext';
import '../styles/SettingsShared.css';

const THEMES: { id: ThemeType; label: string; dot: string }[] = [
  { id: 'roxo', label: 'Roxo', dot: 'linear-gradient(135deg, #a580ff, #5eb8ff)' },
  { id: 'rosa', label: 'Rosa', dot: 'linear-gradient(135deg, #ff8ca3, #ffd1dc)' },
  { id: 'azul', label: 'Azul', dot: 'linear-gradient(135deg, #5dc3f6, #0077b6)' },
];

const Aparencia: React.FC = () => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode, theme, setTheme, fontSize, setFontSize } = useTheme();

  return (
    <div className="settings-page">
      <div className="settings-topbar">
        <button className="settings-back-btn" onClick={() => navigate('/home')}>
          <ChevronLeft size={20} />
        </button>
        <span className="settings-topbar-title">Aparência</span>
      </div>

      <div className="settings-body">
        {/* Modo Escuro */}
        <div className="scard">
          <p className="scard-label">Modo de Exibição</p>
          <div className="srow" style={{ borderBottom: 'none' }}>
            <div className="srow-left">
              <div
                className="srow-icon"
                style={{
                  background: darkMode ? 'rgba(165,128,255,0.15)' : 'rgba(255,190,64,0.1)',
                  color: darkMode ? '#a580ff' : '#ffbe00',
                }}
              >
                {darkMode ? <Moon size={18} /> : <Sun size={18} />}
              </div>
              <div className="srow-text">
                <h4>Modo Escuro</h4>
                <p>{darkMode ? 'Ativado — tema noturno' : 'Desativado — tema claro'}</p>
              </div>
            </div>
            <label className="s-toggle">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="s-toggle-slider" />
            </label>
          </div>
        </div>

        {/* Tema de Cores */}
        <div className="scard">
          <p className="scard-label">Tema de Cores</p>
          <div style={{ padding: '8px 0 16px' }}>
            <div className="srow-left" style={{ marginBottom: 12 }}>
              <div className="srow-icon">
                <Palette size={18} />
              </div>
              <div className="srow-text">
                <h4>Cor Principal</h4>
                <p>Define o visual de botões e ícones</p>
              </div>
            </div>
            <div className="theme-grid">
              {THEMES.map(t => (
                <div
                  key={t.id}
                  className={`theme-card ${theme === t.id ? 'theme-card--active' : ''}`}
                  onClick={() => setTheme(t.id)}
                >
                  <div className="theme-dot" style={{ background: t.dot }} />
                  <span>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tamanho da Fonte */}
        <div className="scard">
          <p className="scard-label">Tamanho do Texto</p>
          <div style={{ padding: '8px 0 16px' }}>
            <div className="srow-left" style={{ marginBottom: 8 }}>
              <div className="srow-icon">
                <Type size={18} />
              </div>
              <div className="srow-text">
                <h4>Tamanho da Fonte</h4>
                <p>Atual: <strong>{fontSize}px</strong></p>
              </div>
            </div>
            <input
              type="range"
              className="font-slider"
              min={13}
              max={22}
              value={fontSize}
              onChange={e => setFontSize(Number(e.target.value))}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              <span style={{ fontSize: 11, color: '#aaa' }}>Pequeno</span>
              <span style={{ fontSize: 14, color: 'var(--color-primary)', fontWeight: 700 }}>
                {fontSize}px
              </span>
              <span style={{ fontSize: 11, color: '#aaa' }}>Grande</span>
            </div>

            {/* Preview ao vivo */}
            <div
              style={{
                marginTop: 16,
                padding: '12px 16px',
                borderRadius: 14,
                background: 'rgba(138,99,229,0.06)',
                border: '1px solid rgba(138,99,229,0.15)',
              }}
            >
              <p style={{ fontSize: fontSize, color: '#333', margin: 0, lineHeight: 1.5 }}>
                Prévia do texto com {fontSize}px — OncoCare cuida de você.
              </p>
            </div>
          </div>
        </div>

        <button className="settings-save-btn" onClick={() => navigate('/home')}>
          Aplicar e Voltar
        </button>
      </div>
    </div>
  );
};

export default Aparencia;
