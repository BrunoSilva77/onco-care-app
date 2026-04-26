import React from 'react';
import TopBar from '../components/TopBar';
import { Search, MapPin } from 'lucide-react';
import './Unidades.css';

const Unidades: React.FC = () => {
  const hospitais = [
    { nome: 'Hospital Sírio-Libanês', endereco: 'Bela Vista, São Paulo - SP', dist: '2.5 km' },
    { nome: 'Hospital Israelita Albert Einstein', endereco: 'Morumbi, São Paulo - SP', dist: '6.8 km' },
    { nome: 'Beneficência Portuguesa', endereco: 'Paraíso, São Paulo - SP', dist: '3.1 km' }
  ];

  return (
    <div className="page-container">
      <TopBar title="Unidades Próximas" />
      
      <div className="unidades-content">
        <div className="search-container">
          <Search className="search-icon" />
          <input type="text" className="search-input" placeholder="Buscar por bairro ou cidade..." />
        </div>

        {hospitais.map((hosp, idx) => (
          <div className="hospital-card" key={idx}>
            <div className="hospital-header">
              <div className="hospital-info">
                <h3>{hosp.nome}</h3>
                <p><MapPin size={12} /> {hosp.endereco}</p>
              </div>
              <span className="distance-badge">{hosp.dist}</span>
            </div>
            <button className="map-btn" onClick={() => alert('Abrindo mapa...')}>
              Traçar Rota
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Unidades;
