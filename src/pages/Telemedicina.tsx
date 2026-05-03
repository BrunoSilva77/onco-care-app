import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { Video, MessageCircle } from 'lucide-react';
import './Telemedicina.css';

const Telemedicina: React.FC = () => {
  const navigate = useNavigate();
  const doctors = [
    { name: 'Dr. Roberto Alves', spec: 'Oncologista Clínico', online: true, initial: 'RA' },
    { name: 'Dra. Carla Mendes', spec: 'Psico-oncologista', online: true, initial: 'CM' },
    { name: 'Enf. Juliana Costa', spec: 'Enfermeira Oncológica', online: true, initial: 'JC' },
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
              <div className="doctor-actions">
                <button className="chat-btn" onClick={() => navigate('/telemedicina/chat', { state: { doctor: doc } })}>
                  <MessageCircle size={20} />
                </button>
                <button className="call-btn" onClick={() => navigate('/telemedicina/video', { state: { doctor: doc } })}>
                  <Video size={20} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Telemedicina;
