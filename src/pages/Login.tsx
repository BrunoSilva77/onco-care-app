import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('OncoCare@projeto.com');
  const [password, setPassword] = useState('123456');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="logo-section">
          <div className="login-logo">
            <img src="/assets/images/logo.png" alt="OncoCare Logo" />
          </div>
          <p className="brand-subtitle">Cuidado que acolhe, tecnologia que aproxima</p>
        </div>

        <div className="welcome-section">
          <h2 className="welcome-title">Bem-vindo</h2>
          <p className="welcome-subtitle">Faça login para continuar.</p>
        </div>

        <form className="form-section" onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">EMAIL</label>
            <input
              type="email"
              className="glass-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">SENHA</label>
            <input
              type="password"
              className="glass-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Entrar
          </button>

          <div className="links-section">
            <a href="#" className="forgot-password">Esqueceu a senha?</a>
            <a href="#" className="register-link" onClick={(e) => {
              e.preventDefault();
              navigate('/cadastro');
            }}>Cadastre-se!</a>
          </div>

          <div className="divider">
            <span>OU</span>
          </div>

          <button type="button" className="gov-button" onClick={() => navigate('/home')}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="4" fill="white" fillOpacity="0.2"/>
              <path d="M12 3L4 7.5V12C4 16.1 7.4 19.9 12 21C16.6 19.9 20 16.1 20 12V7.5L12 3Z" fill="white"/>
              <path d="M10 14.5L7.5 12L8.9 10.6L10 11.7L15.1 6.6L16.5 8L10 14.5Z" fill="#1351b4"/>
            </svg>
            Entrar com gov.br
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
