import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import { Calendar, MapPin, Plus, Check } from 'lucide-react';
import '../styles/Exames.css';

const Exames: React.FC = () => {
  const [exames, setExames] = useState([
    { date: '15 de Maio, 14:00', title: 'Consulta Oncológica', local: 'Clínica Oncológica, Araçatuba - SP' },
    { date: '20 de Maio, 09:30', title: 'Tomografia Computadorizada', local: 'Laboratório São Paulo, Araçatuba - SP' },
    { date: '02 de Junho, 10:00', title: 'Sessão de Quimioterapia', local: 'Hospital Unimed, Araçatuba - SP' }
  ]);

  const [isAgendando, setIsAgendando] = useState(false);
  const [novoExame, setNovoExame] = useState({ title: '', local: 'Clínica Oncológica, Araçatuba - SP', date: '' });
  const [sucesso, setSucesso] = useState(false);

  const handleAgendar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoExame.title || !novoExame.date) return;
    
    // Formata a data (ex: "2026-06-15T14:30" -> "15 de Junho, 14:30")
    const d = new Date(novoExame.date);
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const dataFormatada = `${d.getDate()} de ${meses[d.getMonth()]}, ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;

    setExames([...exames, { date: dataFormatada, title: novoExame.title, local: novoExame.local }]);
    setSucesso(true);
    
    setTimeout(() => {
      setSucesso(false);
      setIsAgendando(false);
      setNovoExame({ title: '', local: 'Clínica Oncológica, Araçatuba - SP', date: '' });
    }, 2000);
  };

  return (
    <div className="page-container">
      <TopBar title="Exames / Consultas" />
      
      <div className="exames-content">
        {!isAgendando ? (
          <>
            <button className="btn-novo-agendamento" onClick={() => setIsAgendando(true)}>
              <Plus size={20} /> Agendar Nova Consulta
            </button>
            
            <div className="exames-list">
              {exames.map((exame, idx) => (
                <div className="exam-card" key={idx}>
                  <div className="exam-date">
                    <Calendar size={16} />
                    {exame.date}
                  </div>
                  <h3 className="exam-title">{exame.title}</h3>
                  <div className="exam-local">
                    <MapPin size={14} />
                    {exame.local}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="agendamento-form-container fade-in">
            <h3>Agendar Novo Procedimento</h3>
            <p>Selecione a especialidade e o melhor horário.</p>

            <form onSubmit={handleAgendar} className="agendamento-form">
              <div className="form-group">
                <label>Especialidade / Exame</label>
                <select 
                  value={novoExame.title} 
                  onChange={e => setNovoExame({...novoExame, title: e.target.value})}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Consulta Oncológica">Consulta Oncológica</option>
                  <option value="Consulta Nutricional">Consulta Nutricional</option>
                  <option value="Sessão de Quimioterapia">Sessão de Quimioterapia</option>
                  <option value="Exame de Sangue">Exame de Sangue</option>
                  <option value="Tomografia Computadorizada">Tomografia</option>
                </select>
              </div>

              <div className="form-group">
                <label>Unidade de Atendimento</label>
                <select 
                  value={novoExame.local} 
                  onChange={e => setNovoExame({...novoExame, local: e.target.value})}
                  required
                >
                  <option value="Clínica Oncológica, Araçatuba - SP">Clínica Oncológica</option>
                  <option value="Hospital Unimed, Araçatuba - SP">Hospital Unimed</option>
                  <option value="Santa Casa de Misericórdia, Araçatuba - SP">Santa Casa de Misericórdia</option>
                  <option value="Laboratório São Paulo, Araçatuba - SP">Laboratório São Paulo</option>
                </select>
              </div>

              <div className="form-group">
                <label>Data e Hora</label>
                <input 
                  type="datetime-local" 
                  value={novoExame.date}
                  onChange={e => setNovoExame({...novoExame, date: e.target.value})}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancelar" onClick={() => setIsAgendando(false)}>
                  Cancelar
                </button>
                <button type="submit" className={`btn-confirmar ${sucesso ? 'sucesso' : ''}`}>
                  {sucesso ? <><Check size={20} /> Confirmado!</> : 'Confirmar Agendamento'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exames;
