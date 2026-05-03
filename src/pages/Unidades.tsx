import React from 'react';
import TopBar from '../components/TopBar';
import { Search, MapPin } from 'lucide-react';
import './Unidades.css';

const Unidades: React.FC = () => {
  const hospitais = [
    { nome: 'Santa Casa de Misericórdia', endereco: 'Centro, Araçatuba - SP', dist: '1.2 km' },
    { nome: 'Hospital Unimed Araçatuba', endereco: 'Vila Mendonça, Araçatuba - SP', dist: '2.5 km' },
    { nome: 'Hospital da Mulher', endereco: 'Jardim Sumaré, Araçatuba - SP', dist: '3.8 km' }
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
