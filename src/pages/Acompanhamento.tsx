import React from 'react';
import TopBar from '../components/TopBar';
import { MapPin } from 'lucide-react';
import '../styles/Acompanhamento.css';

const Acompanhamento: React.FC = () => {
  const history = [
    { date: '10 de Maio, 2026', title: 'Exame de Sangue', local: 'Santa Casa de Misericórdia, Araçatuba - SP', desc: 'Hemograma completo realizado. Resultados dentro da normalidade esperada para a fase do tratamento.' },
    { date: '01 de Maio, 2026', title: 'Sessão de Quimio', local: 'Hospital Unimed Araçatuba - SP', desc: 'Ciclo 2 concluído sem reações adversas severas. Paciente reportou fadiga moderada.' },
    { date: '20 de Abril, 2026', title: 'Consulta Inicial', local: 'Clínica Oncológica, Araçatuba - SP', desc: 'Definição do protocolo de tratamento e agendamento das primeiras sessões.' }
  ];

  return (
    <div className="page-container">
      <TopBar title="Histórico" />
      
      <div className="acompanhamento-content">
        <div className="timeline">
          {history.map((item, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
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
      </div>
    </div>
  );
};

export default Acompanhamento;
