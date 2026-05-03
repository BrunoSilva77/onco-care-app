import React from 'react';
import TopBar from '../components/TopBar';
import { CheckCircle2, Star, Zap, Crown } from 'lucide-react';
import '../styles/PlanosDisponiveis.css';

const PlanosDisponiveis: React.FC = () => {
  return (
    <div className="page-container">
      <TopBar title="Nossos Planos" />
      
      <div className="planos-disponiveis-content">
        <div className="pd-card">
          <div className="pd-header">
            <h3>Essencial</h3>
            <div className="pd-price">R$ 49<span>/mês</span></div>
          </div>
          <p className="pd-description">O básico que você precisa para acompanhar seu tratamento com segurança.</p>
          <ul className="pd-features">
            <li><CheckCircle2 size={18} className="feature-icon" /> Acompanhamento de Sintomas</li>
            <li><CheckCircle2 size={18} className="feature-icon" /> Biblioteca Completa</li>
            <li><CheckCircle2 size={18} className="feature-icon" /> Descontos em parceiros</li>
            <li><CheckCircle2 size={18} className="feature-icon" /> Suporte Básico OncoCare</li>
          </ul>
          <button className="pd-action-btn pd-current-btn" disabled>Seu Plano Atual</button>
        </div>

        <div className="pd-card pd-premium">
          <div className="premium-badge">
            <Star size={12} /> RECOMENDADO
          </div>
          <div className="pd-header">
            <div className="premium-title-row">
              <Zap size={24} className="premium-icon" />
              <h3>Premium</h3>
            </div>
            <div className="pd-price">R$ 149<span>/mês</span></div>
          </div>
          <p className="pd-description">Acesso total a todos os recursos avançados de telemedicina e IA.</p>
          <ul className="pd-features">
            <li><CheckCircle2 size={18} className="feature-icon-premium" /> Todos os benefícios do Essencial</li>
            <li><CheckCircle2 size={18} className="feature-icon-premium" /> Telemedicina ilimitada</li>
            <li><CheckCircle2 size={18} className="feature-icon-premium" /> Assistente IA Avançado (OC IA)</li>
            <li><CheckCircle2 size={18} className="feature-icon-premium" /> Suporte psicológico 24h</li>
            <li><CheckCircle2 size={18} className="feature-icon-premium" /> Prioridade de atendimento</li>
          </ul>
          <button className="pd-action-btn pd-upgrade-btn">Assinar Premium</button>
        </div>

        <div className="pd-card pd-exclusive">
          <div className="pd-header">
            <div className="exclusive-title-row">
              <Crown size={24} className="exclusive-icon" />
              <h3>Exclusive</h3>
            </div>
            <div className="pd-price">R$ 299<span>/mês</span></div>
          </div>
          <p className="pd-description">A experiência mais completa com atendimento presencial e cuidados estendidos.</p>
          <ul className="pd-features">
            <li><CheckCircle2 size={18} className="feature-icon-exclusive" /> Todos os benefícios do Premium</li>
            <li><CheckCircle2 size={18} className="feature-icon-exclusive" /> Atendimento domiciliar (Enfermagem)</li>
            <li><CheckCircle2 size={18} className="feature-icon-exclusive" /> Nutricionista oncológico dedicado</li>
            <li><CheckCircle2 size={18} className="feature-icon-exclusive" /> Segunda opinião médica internacional</li>
            <li><CheckCircle2 size={18} className="feature-icon-exclusive" /> Transporte para quimioterapia</li>
          </ul>
          <button className="pd-action-btn pd-upgrade-exclusive-btn">Assinar Exclusive</button>
        </div>
      </div>
    </div>
  );
};

export default PlanosDisponiveis;
