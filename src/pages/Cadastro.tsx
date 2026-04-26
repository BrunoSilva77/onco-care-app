import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Stethoscope } from 'lucide-react';
import './Cadastro.css';
import './Login.css'; // Reusing some inputs and buttons

const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'selecao' | 'paciente' | 'medico'>('selecao');

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
          <h3>Sou Paciente</h3>
          <p>Quero acompanhar meu tratamento e agendar consultas.</p>
        </div>
      </div>

      <div className="profile-card" onClick={() => setStep('medico')}>
        <div className="profile-icon">
          <Stethoscope />
        </div>
        <div>
          <h3>Sou Médico</h3>
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
          Cadastro de {isPaciente ? 'Paciente' : 'Médico'}
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
            <img src="/assets/images/gov_icon.png" alt="gov.br" className="gov-icon" />
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
