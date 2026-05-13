import React, { useState, useMemo } from 'react';
import TopBar from '../components/TopBar';
import { MapPin, Activity, Syringe, FileText, Search } from 'lucide-react';
import '../styles/Acompanhamento.css';

interface HistoryItem {
  id: string;
  date: string;
  rawDate: Date;
  title: string;
  type: 'consulta' | 'exame' | 'sessao' | 'outro';
  local: string;
  desc: string;
}

const Acompanhamento: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('todos');
  const [filterLocation, setFilterLocation] = useState<string>('');

  const history: HistoryItem[] = [
    { 
      id: '1', 
      date: '10 de Maio, 2026', 
      rawDate: new Date(2026, 4, 10),
      title: 'Exame de Sangue', 
      type: 'exame',
      local: 'Laboratório Central, São Paulo - SP', 
      desc: 'Hemograma completo realizado. Resultados dentro da normalidade esperada para a fase do tratamento.' 
    },
    { 
      id: '2', 
      date: '01 de Maio, 2026', 
      rawDate: new Date(2026, 4, 1),
      title: 'Primeira Sessão de Quimioterapia', 
      type: 'sessao',
      local: 'Santa Casa da Misericórdia, Araçatuba - SP', 
      desc: 'Ciclo 1 concluído sem reações adversas severas. Paciente reportou fadiga moderada.' 
    },
    { 
      id: '3', 
      date: '20 de Abril, 2026', 
      rawDate: new Date(2026, 3, 20),
      title: 'Consulta Inicial Oncológica', 
      type: 'consulta',
      local: 'Clínica Oncologia, Campo Grande - MS', 
      desc: 'Definição do protocolo de tratamento e agendamento das primeiras sessões.' 
    },
    { 
      id: '4', 
      date: '15 de Abril, 2026', 
      rawDate: new Date(2026, 3, 15),
      title: 'Tomografia Computadorizada', 
      type: 'exame',
      local: 'Hospital Unimed, Araçatuba - SP', 
      desc: 'Exame de imagem para estadiamento completo.' 
    }
  ];

  const locations = useMemo(() => {
    const locs = history.map(item => item.local);
    return Array.from(new Set(locs));
  }, [history]);

  const filteredHistory = useMemo(() => {
    return history.filter(item => {
      // Type filter
      if (filterType !== 'todos' && item.type !== filterType) return false;
      
      // Location filter
      if (filterLocation && item.local !== filterLocation) return false;
      
      return true;
    });
  }, [history, filterType, filterLocation]);

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'consulta': return <Activity size={14} />;
      case 'sessao': return <Syringe size={14} />;
      case 'exame': return <FileText size={14} />;
      default: return <Activity size={14} />;
    }
  };

  return (
    <div className="page-container">
      <TopBar title="Acompanhamento" />
      
      <div className="acompanhamento-content">
        
        {/* Filtros */}
        <div className="filters-section">
          <div className="chips-container">
            <button className={`chip ${filterType === 'todos' ? 'active' : ''}`} onClick={() => setFilterType('todos')}>Todos</button>
            <button className={`chip ${filterType === 'consulta' ? 'active' : ''}`} onClick={() => setFilterType('consulta')}>Consultas</button>
            <button className={`chip ${filterType === 'exame' ? 'active' : ''}`} onClick={() => setFilterType('exame')}>Exames</button>
            <button className={`chip ${filterType === 'sessao' ? 'active' : ''}`} onClick={() => setFilterType('sessao')}>Sessões</button>
          </div>

          <div className="dropdowns-container">
            <div className="filter-input-group">
              <MapPin size={16} />
              <select 
                value={filterLocation} 
                onChange={e => setFilterLocation(e.target.value)}
                className="filter-input"
              >
                <option value="">Todos os locais</option>
                {locations.map((loc, idx) => (
                  <option key={idx} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Linha do Tempo */}
        <div className="timeline-container fade-in">
          {filteredHistory.length === 0 ? (
            <div className="empty-state">
              <Search size={32} color="#ccc" />
              <p>Nenhum registro encontrado com estes filtros.</p>
              <button onClick={() => {setFilterType('todos'); setFilterLocation('');}}>
                Limpar Filtros
              </button>
            </div>
          ) : (
            <div className="timeline">
              {filteredHistory.map((item) => (
                <div className={`timeline-item type-${item.type}`} key={item.id}>
                  <div className="timeline-dot">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="timeline-card">
                    <div className="timeline-date">{item.date}</div>
                    <h3 className="timeline-title">{item.title}</h3>
                    <div className="timeline-location">
                      <MapPin size={12} /> {item.local}
                    </div>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Acompanhamento;
