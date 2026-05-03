import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { 
  User, Bell, Moon, Sun, Lock, Shield, 
  HelpCircle, ChevronRight, LogOut, FileText 
} from 'lucide-react';
import '../styles/Configuracoes.css';

const Configuracoes: React.FC = () => {
  const navigate = useNavigate();
  const [notificacoesApp, setNotificacoesApp] = useState(true);
  const [notificacoesSms, setNotificacoesSms] = useState(false);
  const [modoEscuro, setModoEscuro] = useState(false);
  const [biometria, setBiometria] = useState(true);

  return (
    <div className="page-container">
      <TopBar title="Configurações" />
      
      <div className="config-content">
        
        {/* Perfil */}
        <div className="config-section">
          <span className="section-title">Minha Conta</span>
          <div className="config-card">
            <div className="config-item" onClick={() => alert('Editar Perfil em desenvolvimento.')}>
              <div className="config-item-left">
                <div className="config-icon"><User size={20} /></div>
                <div className="config-text">
                  <h4>Editar Perfil</h4>
                  <p>Altere foto, nome e e-mail</p>
                </div>
              </div>
              <ChevronRight className="config-item-right" size={20} />
            </div>
            <div className="config-item" onClick={() => alert('Alterar Senha em desenvolvimento.')}>
              <div className="config-item-left">
                <div className="config-icon"><Lock size={20} /></div>
                <div className="config-text">
                  <h4>Alterar Senha</h4>
                  <p>Mantenha sua conta segura</p>
                </div>
              </div>
              <ChevronRight className="config-item-right" size={20} />
            </div>
          </div>
        </div>

        {/* Notificações */}
        <div className="config-section">
          <span className="section-title">Notificações</span>
          <div className="config-card">
            <div className="config-item">
              <div className="config-item-left">
                <div className="config-icon"><Bell size={20} /></div>
                <div className="config-text">
                  <h4>Notificações do App</h4>
                  <p>Lembretes e alertas no celular</p>
                </div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  className="toggle-input" 
                  checked={notificacoesApp}
                  onChange={() => setNotificacoesApp(!notificacoesApp)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="config-item">
              <div className="config-item-left">
                <div className="config-icon" style={{ background: 'rgba(93, 195, 246, 0.1)', color: '#5dc3f6' }}>
                  <Bell size={20} />
                </div>
                <div className="config-text">
                  <h4>Avisos por SMS</h4>
                  <p>Alertas de consultas via texto</p>
                </div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  className="toggle-input" 
                  checked={notificacoesSms}
                  onChange={() => setNotificacoesSms(!notificacoesSms)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Acessibilidade */}
        <div className="config-section">
          <span className="section-title">Aparência</span>
          <div className="config-card">
            <div className="config-item">
              <div className="config-item-left">
                <div className="config-icon" style={{ background: 'rgba(0, 0, 0, 0.1)', color: '#000' }}>
                  {modoEscuro ? <Moon size={20} /> : <Sun size={20} />}
                </div>
                <div className="config-text">
                  <h4>Modo Escuro</h4>
                  <p>Melhor para leitura noturna</p>
                </div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  className="toggle-input" 
                  checked={modoEscuro}
                  onChange={() => setModoEscuro(!modoEscuro)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Segurança */}
        <div className="config-section">
          <span className="section-title">Segurança</span>
          <div className="config-card">
            <div className="config-item">
              <div className="config-item-left">
                <div className="config-icon" style={{ background: 'rgba(46, 125, 50, 0.1)', color: '#2e7d32' }}>
                  <Shield size={20} />
                </div>
                <div className="config-text">
                  <h4>Acesso por Biometria</h4>
                  <p>Usar Face ID ou Digital para entrar</p>
                </div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  className="toggle-input" 
                  checked={biometria}
                  onChange={() => setBiometria(!biometria)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Sobre */}
        <div className="config-section">
          <span className="section-title">Sobre</span>
          <div className="config-card">
            <div className="config-item" onClick={() => alert('Termos de Uso em desenvolvimento.')}>
              <div className="config-item-left">
                <div className="config-icon" style={{ background: 'rgba(255, 140, 163, 0.1)', color: '#ff8ca3' }}><FileText size={20} /></div>
                <div className="config-text">
                  <h4>Termos e Privacidade</h4>
                  <p>Nossas políticas de uso</p>
                </div>
              </div>
              <ChevronRight className="config-item-right" size={20} />
            </div>
            <div className="config-item" onClick={() => alert('Central de Ajuda em desenvolvimento.')}>
              <div className="config-item-left">
                <div className="config-icon" style={{ background: 'rgba(255, 140, 163, 0.1)', color: '#ff8ca3' }}><HelpCircle size={20} /></div>
                <div className="config-text">
                  <h4>Central de Ajuda</h4>
                  <p>Dúvidas e suporte técnico</p>
                </div>
              </div>
              <ChevronRight className="config-item-right" size={20} />
            </div>
          </div>
        </div>

        <button className="logout-btn-full" onClick={() => navigate('/login')}>
          <LogOut size={20} /> Sair da Conta
        </button>

      </div>
    </div>
  );
};

export default Configuracoes;
