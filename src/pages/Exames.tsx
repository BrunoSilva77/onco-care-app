import React, { useState, useMemo } from 'react';
import TopBar from '../components/TopBar';
import Calendar from '../components/Calendar';
import { Clock, MapPin, Plus, Check } from 'lucide-react';
import '../styles/Exames.css';

const categoryColors: Record<string, string> = {
  'Consulta Oncológica': '#48dbfb',
  'Sessão de Quimioterapia': '#ff6b6b',
  'Consulta Nutricional': '#1dd1a1',
  'Exame de Sangue': '#ff9f43',
  'Tomografia Computadorizada': '#5f27cd',
  'default': '#c8d6e5'
};

const Exames: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Example initial data relative to current month for demonstration
  const today = new Date();
  const [exames, setExames] = useState([
    { date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0), title: 'Consulta Oncológica', local: 'Clínica Oncológica, Araçatuba - SP' },
    { date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 9, 30), title: 'Tomografia Computadorizada', local: 'Laboratório São Paulo, Araçatuba - SP' },
    { date: new Date(today.getFullYear(), today.getMonth() + 1, 5, 10, 0), title: 'Sessão de Quimioterapia', local: 'Hospital Unimed, Araçatuba - SP' }
  ]);

  const [isAgendando, setIsAgendando] = useState(false);
  const [novoExame, setNovoExame] = useState({ title: '', local: 'Clínica Oncológica, Araçatuba - SP', date: '' });
  const [sucesso, setSucesso] = useState(false);

  const calendarEvents = useMemo(() => {
    return exames.map(ex => ({
      date: ex.date,
      color: categoryColors[ex.title] || categoryColors.default
    }));
  }, [exames]);

  const selectedDayExames = useMemo(() => {
    return exames.filter(ex => 
      ex.date.getDate() === selectedDate.getDate() &&
      ex.date.getMonth() === selectedDate.getMonth() &&
      ex.date.getFullYear() === selectedDate.getFullYear()
    ).sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [exames, selectedDate]);

  const handleAgendar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoExame.title || !novoExame.date) return;
    
    const d = new Date(novoExame.date);

    setExames([...exames, { date: d, title: novoExame.title, local: novoExame.local }]);
    setSucesso(true);
    
    setSelectedDate(d);
    
    setTimeout(() => {
      setSucesso(false);
      setIsAgendando(false);
      setNovoExame({ title: '', local: 'Clínica Oncológica, Araçatuba - SP', date: '' });
    }, 2000);
  };

  const openAgendamento = () => {
    const offset = selectedDate.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(selectedDate.getTime() - offset)).toISOString().slice(0, 16);
    setNovoExame(prev => ({ ...prev, date: localISOTime }));
    setIsAgendando(true);
  };

  const formatTime = (date: Date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className="page-container">
      <TopBar title="Agenda Inteligente" />
      
      <div className="exames-content">
        {!isAgendando ? (
          <>
            <Calendar 
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              events={calendarEvents}
            />

            <div className="day-agenda-section fade-in">
              <div className="agenda-header">
                <h3>Compromissos do Dia</h3>
                <span className="agenda-date-subtitle">
                  {selectedDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
                </span>
              </div>
              
              <button className="btn-novo-agendamento" onClick={openAgendamento}>
                <Plus size={20} /> Novo Agendamento
              </button>
              
              <div className="exames-list">
                {selectedDayExames.length === 0 ? (
                  <div className="empty-agenda">
                    <p>Nenhum compromisso agendado para este dia.</p>
                  </div>
                ) : (
                  selectedDayExames.map((exame, idx) => (
                    <div className="exam-card fade-in" key={idx} style={{ borderLeftColor: categoryColors[exame.title] || categoryColors.default }}>
                      <div className="exam-time-column">
                        <Clock size={16} />
                        <span>{formatTime(exame.date)}</span>
                      </div>
                      <div className="exam-details-column">
                        <h3 className="exam-title">{exame.title}</h3>
                        <div className="exam-local">
                          <MapPin size={14} />
                          {exame.local}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
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
