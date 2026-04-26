import React from 'react';
import TopBar from '../components/TopBar';
import { Video } from 'lucide-react';
import './Telemedicina.css';

const Telemedicina: React.FC = () => {
  const doctors = [
    { name: 'Dr. Roberto Alves', spec: 'Oncologista Clínico', online: true, initial: 'RA' },
    { name: 'Dra. Carla Mendes', spec: 'Psico-oncologista', online: true, initial: 'CM' },
    { name: 'Dr. Fernando Silva', spec: 'Nutricionista', online: false, initial: 'FS' }
  ];

  return (
    <div className="page-container">
      <TopBar title="Telemedicina" />
      
      <div className="telemedicina-content">
        {doctors.map((doc, idx) => (
          <div className="doctor-card" key={idx}>
            <div className="doctor-avatar">{doc.initial}</div>
            <div className="doctor-info">
              <h3>{doc.name}</h3>
              <p>{doc.spec}</p>
              <span className={`status-badge ${doc.online ? 'status-online' : 'status-offline'}`}>
                {doc.online ? 'Online agora' : 'Indisponível'}
              </span>
            </div>
            {doc.online && (
              <button className="call-btn" onClick={() => alert(`Iniciando chamada com ${doc.name}...`)}>
                <Video size={20} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Telemedicina;
