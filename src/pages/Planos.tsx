import React from 'react';
import TopBar from '../components/TopBar';
import { CheckCircle2 } from 'lucide-react';
import './Planos.css';

const Planos: React.FC = () => {
  return (
    <div className="page-container">
      <TopBar title="Planos OncoCare" />
      
      <div className="planos-content">
        <div className="plano-card">
          <div className="plano-header">
            <h3>Essencial</h3>
            <div className="plano-price">R$ 49<span>/mês</span></div>
          </div>
          <ul className="plano-features">
            <li><CheckCircle2 size={16} className="feature-icon" /> Acompanhamento de Sintomas</li>
            <li><CheckCircle2 size={16} className="feature-icon" /> Biblioteca Completa</li>
            <li><CheckCircle2 size={16} className="feature-icon" /> Descontos em parceiros</li>
          </ul>
          <button className="saiba-mais-btn">Assinar Essencial</button>
        </div>

        <div className="plano-card plano-premium">
          <div className="plano-header">
            <h3>Premium</h3>
            <div className="plano-price">R$ 149<span>/mês</span></div>
          </div>
          <ul className="plano-features">
            <li><CheckCircle2 size={16} className="feature-icon" /> Todos os benefícios do Essencial</li>
            <li><CheckCircle2 size={16} className="feature-icon" /> Telemedicina ilimitada</li>
            <li><CheckCircle2 size={16} className="feature-icon" /> Assistente IA Avançado (OC IA)</li>
            <li><CheckCircle2 size={16} className="feature-icon" /> Suporte psicológico 24h</li>
          </ul>
          <button className="saiba-mais-btn">Assinar Premium</button>
        </div>
      </div>
    </div>
  );
};

export default Planos;
