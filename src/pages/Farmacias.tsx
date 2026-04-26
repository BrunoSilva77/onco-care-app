import React from 'react';
import TopBar from '../components/TopBar';
import { Search, Percent, Store } from 'lucide-react';
import './Farmacias.css';

const Farmacias: React.FC = () => {
  const farmacias = [
    { nome: 'Droga Raia', endereco: 'Av. Paulista, 1234', desconto: 'Até 30% Off' },
    { nome: 'Drogasil', endereco: 'Rua Augusta, 500', desconto: 'Até 25% Off' },
    { nome: 'Pague Menos', endereco: 'Av. Brigadeiro, 800', desconto: 'Até 40% Off' }
  ];

  return (
    <div className="page-container">
      <TopBar title="Farmácias Parceiras" />
      
      <div className="farmacias-content">
        <div className="search-container">
          <Search className="search-icon" />
          <input type="text" className="search-input" placeholder="Buscar por bairro ou cidade..." />
        </div>

        {farmacias.map((farm, idx) => (
          <div className="farmacia-card" key={idx}>
            <div className="farmacia-header">
              <div className="farmacia-icon">
                <Store size={20} />
              </div>
              <div className="farmacia-info">
                <h3>{farm.nome}</h3>
                <p>{farm.endereco}</p>
              </div>
            </div>
            <div className="discount-badge">
              <Percent size={14} /> {farm.desconto} em oncológicos
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Farmacias;
