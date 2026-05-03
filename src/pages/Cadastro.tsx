import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Stethoscope } from 'lucide-react';
import '../styles/Cadastro.css';
import '../styles/Login.css';

const TIPOS_CANCER = [
  'Mama', 'Pulmão', 'Cólon e Reto', 'Próstata', 'Estômago',
  'Fígado', 'Cervical', 'Esôfago', 'Pâncreas', 'Leucemia',
  'Linfoma', 'Melanoma', 'Bexiga', 'Rim', 'Tireoide',
  'Ovário', 'Cérebro', 'Osso', 'Outro',
];

const FASES_CANCER = [
  { value: '0', label: 'Estágio 0 — In situ (células anormais, sem invasão)' },
  { value: '1', label: 'Estágio I — Localizado, pequeno tamanho' },
  { value: '2', label: 'Estágio II — Maior ou com linfonodos próximos' },
  { value: '3', label: 'Estágio III — Disseminação regional' },
  { value: '4', label: 'Estágio IV — Metastático (órgãos distantes)' },
];

const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'selecao' | 'paciente' | 'medico'>('selecao');
  const [tipoCancer, setTipoCancer] = useState('');
  const [faseCancer, setFaseCancer] = useState('');

  const handleBack = () => {
    if (step === 'selecao') {
      navigate('/login');
    } else {
      setStep('selecao');
    }
  };

  const renderSelecao = () => (
    <div className="selection-grid">
      <div className="profile-card" onClick={() => setStep('paciente')}>
        <div className="profile-icon">
          <User />
        </div>
        <div>
          <h3 style={{ textAlign: 'center' }}>Sou Paciente</h3>
          <p>Quero acompanhar meu tratamento e agendar consultas.</p>
        </div>
      </div>

      <div className="profile-card" onClick={() => setStep('medico')}>
        <div className="profile-icon">
          <Stethoscope />
        </div>
        <div>
          <h3 style={{ textAlign: 'center' }}>Sou Profissional</h3>
          <p>Quero gerenciar meus pacientes e realizar telemedicina.</p>
        </div>
      </div>
    </div>
  );

  const renderForm = () => {
    const isPaciente = step === 'paciente';
    return (
      <form className="cadastro-form" onSubmit={(e) => { e.preventDefault(); navigate('/home'); }}>
        <h3 className="form-title">
          Cadastro de {isPaciente ? 'Paciente' : 'Profissional'}
        </h3>

        <div className="input-group">
          <label className="input-label">NOME COMPLETO</label>
          <input type="text" className="glass-input" placeholder="Seu nome" required />
        </div>

        <div className="input-group">
          <label className="input-label">EMAIL</label>
          <input type="email" className="glass-input" placeholder="seu@email.com" required />
        </div>

        {isPaciente ? (
          <>
            <div className="input-group">
              <label className="input-label">CPF</label>
              <input type="text" className="glass-input" placeholder="000.000.000-00" required />
            </div>
            <div className="input-group">
              <label className="input-label">DATA DE NASCIMENTO</label>
              <input type="date" className="glass-input" required />
            </div>

            {/* Tipo de Câncer */}
            <div className="input-group">
              <label className="input-label">TIPO DE CÂNCER</label>
              <select
                className="glass-input glass-select"
                value={tipoCancer}
                onChange={(e) => setTipoCancer(e.target.value)}
                required
              >
                <option value="" disabled>Selecione o tipo de câncer</option>
                {TIPOS_CANCER.map((tipo) => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>

            {/* Fase / Estágio */}
            <div className="input-group">
              <label className="input-label">ESTÁGIO CLÍNICO</label>
              <div className="fase-grid">
                {FASES_CANCER.map((fase) => (
                  <div
                    key={fase.value}
                    className={`fase-card ${faseCancer === fase.value ? 'fase-card--active' : ''}`}
                    onClick={() => setFaseCancer(fase.value)}
                  >
                    <span className="fase-badge">
                      {fase.value === '0' ? '0' : `${fase.value}`}
                    </span>
                    <span className="fase-label">{fase.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="input-group">
              <label className="input-label">CRM</label>
              <input type="text" className="glass-input" placeholder="000000-UF" required />
            </div>
            <div className="input-group">
              <label className="input-label">ESPECIALIDADE</label>
              <input type="text" className="glass-input" placeholder="Ex: Oncologista Clínico" required />
            </div>
          </>
        )}

        <div className="input-group">
          <label className="input-label">SENHA</label>
          <input type="password" className="glass-input" placeholder="******" required />
        </div>

        <div className="action-buttons">
          <button type="submit" className="login-button">
            Criar Conta
          </button>

          <div className="divider">
            <span>OU</span>
          </div>

          <button type="button" className="gov-button" onClick={() => navigate('/home')}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="4" fill="white" fillOpacity="0.2" />
              <path d="M12 3L4 7.5V12C4 16.1 7.4 19.9 12 21C16.6 19.9 20 16.1 20 12V7.5L12 3Z" fill="white" />
              <path d="M10 14.5L7.5 12L8.9 10.6L10 11.7L15.1 6.6L16.5 8L10 14.5Z" fill="#1351b4" />
            </svg>
            Cadastrar com gov.br
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-content">
        <div className="cadastro-header">
          <button className="back-button" onClick={handleBack}>
            <ChevronLeft />
          </button>
          <h1 className="cadastro-title">Cadastro</h1>
        </div>

        {step === 'selecao' ? renderSelecao() : renderForm()}
      </div>
    </div>
  );
};

export default Cadastro;
