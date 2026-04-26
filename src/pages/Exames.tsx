import React from 'react';
import TopBar from '../components/TopBar';
import { Calendar, MapPin } from 'lucide-react';
import './Exames.css';

const Exames: React.FC = () => {
  const exames = [
    { date: '15 de Maio, 14:00', title: 'Consulta Oncológica', local: 'Hospital Sírio-Libanês' },
    { date: '20 de Maio, 09:30', title: 'Tomografia Computadorizada', local: 'Laboratório Fleury' },
    { date: '02 de Junho, 10:00', title: 'Sessão de Quimioterapia', local: 'Clínica OncoCare Central' }
  ];

  return (
    <div className="page-container">
      <TopBar title="Exames / Consultas" />
      
      <div className="exames-content">
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
    </div>
  );
};

export default Exames;
