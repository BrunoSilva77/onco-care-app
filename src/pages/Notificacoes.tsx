import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, MessageSquare, Calendar, Activity, Pill } from 'lucide-react';
import '../styles/SettingsShared.css';

const Notificacoes: React.FC = () => {
  const navigate = useNavigate();
  const [appNotif, setAppNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [consultaNotif, setConsultaNotif] = useState(true);
  const [exameNotif, setExameNotif] = useState(true);
  const [medicNotif, setMedicNotif] = useState(false);
  const [relatorioNotif, setRelatorioNotif] = useState(true);

  return (
    <div className="settings-page">
      <div className="settings-topbar">
        <button className="settings-back-btn" onClick={() => navigate('/home')}>
          <ChevronLeft size={20} />
        </button>
        <span className="settings-topbar-title">Notificações</span>
      </div>

      <div className="settings-body">
        {/* Canal */}
        <div className="scard">
          <p className="scard-label">Canal de Envio</p>

          <div className="srow">
            <div className="srow-left">
              <div className="srow-icon">
                <Bell size={18} />
              </div>
              <div className="srow-text">
                <h4>Notificações do App</h4>
                <p>Alertas e lembretes no celular</p>
              </div>
            </div>
            <label className="s-toggle">
              <input type="checkbox" checked={appNotif} onChange={() => setAppNotif(v => !v)} />
              <span className="s-toggle-slider" />
            </label>
          </div>

          <div className="srow" style={{ borderBottom: 'none' }}>
            <div className="srow-left">
              <div className="srow-icon" style={{ background: 'rgba(93, 195, 246, 0.1)', color: '#5dc3f6' }}>
                <MessageSquare size={18} />
              </div>
              <div className="srow-text">
                <h4>Avisos por SMS</h4>
                <p>Receba textos no celular</p>
              </div>
            </div>
            <label className="s-toggle">
              <input type="checkbox" checked={smsNotif} onChange={() => setSmsNotif(v => !v)} />
              <span className="s-toggle-slider" />
            </label>
          </div>
        </div>

        {/* Tipo de alertas */}
        <div className="scard">
          <p className="scard-label">Tipo de Alertas</p>

          <div className="srow">
            <div className="srow-left">
              <div className="srow-icon" style={{ background: 'rgba(255, 140, 163, 0.1)', color: '#ff8ca3' }}>
                <Calendar size={18} />
              </div>
              <div className="srow-text">
                <h4>Consultas</h4>
                <p>Lembrete 24h antes</p>
              </div>
            </div>
            <label className="s-toggle">
              <input type="checkbox" checked={consultaNotif} onChange={() => setConsultaNotif(v => !v)} />
              <span className="s-toggle-slider" />
            </label>
          </div>

          <div className="srow">
            <div className="srow-left">
              <div className="srow-icon" style={{ background: 'rgba(255, 190, 100, 0.1)', color: '#ffbe64' }}>
                <Activity size={18} />
              </div>
              <div className="srow-text">
                <h4>Exames</h4>
                <p>Resultado e agendamento</p>
              </div>
            </div>
            <label className="s-toggle">
              <input type="checkbox" checked={exameNotif} onChange={() => setExameNotif(v => !v)} />
              <span className="s-toggle-slider" />
            </label>
          </div>

          <div className="srow">
            <div className="srow-left">
              <div className="srow-icon" style={{ background: 'rgba(80, 200, 130, 0.1)', color: '#50c882' }}>
                <Pill size={18} />
              </div>
              <div className="srow-text">
                <h4>Medicamentos</h4>
                <p>Horário de uso e reposição</p>
              </div>
            </div>
            <label className="s-toggle">
              <input type="checkbox" checked={medicNotif} onChange={() => setMedicNotif(v => !v)} />
              <span className="s-toggle-slider" />
            </label>
          </div>

          <div className="srow" style={{ borderBottom: 'none' }}>
            <div className="srow-left">
              <div className="srow-icon">
                <Bell size={18} />
              </div>
              <div className="srow-text">
                <h4>Relatórios Semanais</h4>
                <p>Resumo de saúde toda segunda</p>
              </div>
            </div>
            <label className="s-toggle">
              <input type="checkbox" checked={relatorioNotif} onChange={() => setRelatorioNotif(v => !v)} />
              <span className="s-toggle-slider" />
            </label>
          </div>
        </div>

        <button className="settings-save-btn" onClick={() => navigate('/home')}>
          Salvar Preferências
        </button>
      </div>
    </div>
  );
};

export default Notificacoes;
