import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Stethoscope, 
  FileText, 
  ClipboardCheck, 
  Info,
  Search,
  UserPlus,
  Brain,
  Settings,
  User,
  Bell,
  Moon,
  Shield,
  LogOut
} from 'lucide-react';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<'home' | 'settings'>('home');
  return (
    <div className="home-container">
      {/* Header Area */}
      <header className="home-header">
        <div className="header-user-info">
          <div className="user-avatar">
             <img src="/assets/images/logo.png" alt="Avatar" />
          </div>
          <div className="greeting-text">
            <h2>Olá, Michael</h2>
            <p>Como posso ajudar hoje?</p>
          </div>
        </div>
      </header>

      {/* Circular Menu Area */}
      <section className="circular-menu-wrapper">
        <div className="half-circle">
          <div className={`inner-half-circle spinning-wheel ${activeMenu}`}>
             <div 
                className={`wheel-icon pos-home ${activeMenu === 'home' ? 'active' : ''}`}
                onClick={() => setActiveMenu('home')}
             >
               <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
               </svg>
             </div>
             <div 
                className={`wheel-icon pos-settings ${activeMenu === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveMenu('settings')}
             >
               <Settings size={28} />
             </div>
          </div>
        </div>
        
        <div className={`menu-items-container ${activeMenu}`}>
          {activeMenu === 'home' && (
            <>
              <div className="menu-item-wrapper seq-1">
                <div className="menu-pill" onClick={() => navigate('/sintomas')}>
                  <div className="menu-icon"><UserPlus /></div>
                  <div className="menu-text">
                    <h3>SINTOMAS</h3>
                    <p>Registre seus sintomas</p>
                  </div>
                </div>
              </div>

              <div className="menu-item-wrapper seq-2">
                <div className="menu-pill" onClick={() => navigate('/telemedicina')}>
                  <div className="menu-icon"><Stethoscope /></div>
                  <div className="menu-text">
                    <h3>TELEMEDICINA</h3>
                    <p>Fale com o médico</p>
                  </div>
                </div>
              </div>

              <div className="menu-item-wrapper seq-3">
                <div className="menu-pill" onClick={() => navigate('/exames')}>
                  <div className="menu-icon"><FileText /></div>
                  <div className="menu-text">
                    <h3>EXAMES / CONSULTAS</h3>
                    <p>Veja seus compromissos</p>
                  </div>
                </div>
              </div>

              <div className="menu-item-wrapper seq-4">
                <div className="menu-pill" onClick={() => navigate('/acompanhamento')}>
                  <div className="menu-icon"><ClipboardCheck /></div>
                  <div className="menu-text">
                    <h3>ACOMPANHAMENTO</h3>
                    <p>Histórico atualizado</p>
                  </div>
                </div>
              </div>

              <div className="menu-item-wrapper seq-5">
                <div className="menu-pill" onClick={() => navigate('/biblioteca')}>
                  <div className="menu-icon"><Info /></div>
                  <div className="menu-text">
                    <h3>BIBLIOTECA</h3>
                    <p>Acompanhe informações</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeMenu === 'settings' && (
            <>
              <div className="menu-item-wrapper seq-1">
                <div className="menu-pill settings-pill" onClick={() => navigate('/configuracoes')}>
                  <div className="menu-icon settings-icon"><User /></div>
                  <div className="menu-text">
                    <h3>MEU PERFIL</h3>
                    <p>Editar conta e senha</p>
                  </div>
                </div>
              </div>

              <div className="menu-item-wrapper seq-2">
                <div className="menu-pill settings-pill" onClick={() => navigate('/configuracoes')}>
                  <div className="menu-icon settings-icon"><Bell /></div>
                  <div className="menu-text">
                    <h3>NOTIFICAÇÕES</h3>
                    <p>Alertas e lembretes</p>
                  </div>
                </div>
              </div>

              <div className="menu-item-wrapper seq-3">
                <div className="menu-pill settings-pill" onClick={() => navigate('/configuracoes')}>
                  <div className="menu-icon settings-icon"><Moon /></div>
                  <div className="menu-text">
                    <h3>APARÊNCIA</h3>
                    <p>Modo escuro e tema</p>
                  </div>
                </div>
              </div>

              <div className="menu-item-wrapper seq-4">
                <div className="menu-pill settings-pill" onClick={() => navigate('/configuracoes')}>
                  <div className="menu-icon settings-icon"><Shield /></div>
                  <div className="menu-text">
                    <h3>SEGURANÇA</h3>
                    <p>Biometria e privacidade</p>
                  </div>
                </div>
              </div>

              <div className="menu-item-wrapper seq-5">
                <div className="menu-pill logout-pill" onClick={() => navigate('/login')}>
                  <div className="menu-icon logout-icon"><LogOut /></div>
                  <div className="menu-text">
                    <h3>SAIR DA CONTA</h3>
                    <p>Encerrar sessão</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Bottom Action List */}
      <section className="action-list">
        <div className="action-bar" onClick={() => navigate('/unidades')}>
          <Search />
          <span>Unidades hospitalares mais próximas de você</span>
        </div>
        <div className="action-bar" onClick={() => navigate('/farmacias')}>
          <Search />
          <span>Farmácias parceiras</span>
        </div>
        <div className="action-bar" onClick={() => navigate('/planos')}>
          <Search />
          <span>Planos OncoCare</span>
        </div>
        
        <div className="assistant-button-container">
          <button className="oc-ia-btn" onClick={() => navigate('/assistente')}>
            <Brain />
          </button>
        </div>
      </section>

    </div>
  );
};

export default Home;
