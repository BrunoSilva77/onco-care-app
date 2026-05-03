import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { CheckCircle2, Shield, ArrowUpCircle, Zap } from 'lucide-react';
import '../styles/Planos.css';

const Planos: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <TopBar title="Meu Plano" />
      
      <div className="planos-content">
        <div className="current-plan-card">
          <div className="current-plan-header">
            <div className="plan-icon-container">
              <Shield className="plan-icon" size={32} />
            </div>
            <div>
               <h2>Essencial</h2>
               <p className="status-badge">Plano Ativo</p>
            </div>
          </div>
          
          <div className="benefits-section">
            <h3>Seus Direitos Atuais</h3>
            <ul className="plano-features">
              <li><CheckCircle2 size={20} className="feature-icon" /> Acompanhamento de Sintomas</li>
              <li><CheckCircle2 size={20} className="feature-icon" /> Acesso à Biblioteca Completa</li>
              <li><CheckCircle2 size={20} className="feature-icon" /> Descontos em Farmácias Parceiras</li>
              <li><CheckCircle2 size={20} className="feature-icon" /> Suporte Básico OncoCare</li>
            </ul>
          </div>
          
          <div className="upgrade-teaser">
            <div className="teaser-icon">
              <Zap size={20} />
            </div>
            <div className="teaser-text">
              <h4>Desbloqueie mais recursos</h4>
              <p>Telemedicina ilimitada e Assistente IA com o Premium.</p>
            </div>
          </div>

          <button className="upgrade-btn" onClick={() => navigate('/planos-disponiveis')}>
            <ArrowUpCircle size={20} />
            Atualizar para Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default Planos;
