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
            <img src="/assets/images/gov_icon.png" alt="gov.br" className="gov-icon" />
            Entrar com gov.br
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
