import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import { Pill, Clock, CheckCircle2, Circle } from 'lucide-react';
import '../styles/Medicamentos.css';

interface Medicamento {
  id: string;
  nome: string;
  dosagem: string;
  horario: string;
  tomado: boolean;
}

const Medicamentos: React.FC = () => {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([
    { id: '1', nome: 'Tamoxifeno', dosagem: '20mg', horario: '08:00', tomado: false },
    { id: '2', nome: 'Ondansetrona', dosagem: '8mg', horario: '08:00', tomado: true },
    { id: '3', nome: 'Dexametasona', dosagem: '4mg', horario: '14:00', tomado: false },
    { id: '4', nome: 'Tamoxifeno', dosagem: '20mg', horario: '20:00', tomado: false }
  ]);

  const toggleTomado = (id: string) => {
    setMedicamentos(prev =>
      prev.map(med => (med.id === id ? { ...med, tomado: !med.tomado } : med))
    );
  };

  const progresso = Math.round(
    (medicamentos.filter(m => m.tomado).length / medicamentos.length) * 100
  );

  return (
    <div className="page-container">
      <TopBar title="Meus Medicamentos" />
      
      <div className="medicamentos-content">
        {/* Progress Header */}
        <div className="med-progress-card">
          <div className="med-progress-info">
            <h2>Progresso Diário</h2>
            <p>Você tomou {medicamentos.filter(m => m.tomado).length} de {medicamentos.length} medicamentos hoje.</p>
          </div>
          <div className="med-progress-circle">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path className="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path className="circle"
                strokeDasharray={`${progresso}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className="percentage">{progresso}%</text>
            </svg>
          </div>
        </div>

        {/* List */}
        <div className="med-list">
          {medicamentos.map(med => (
            <div 
              key={med.id} 
              className={`med-item ${med.tomado ? 'med-tomado' : ''}`}
              onClick={() => toggleTomado(med.id)}
            >
              <div className="med-icon-container">
                <Pill size={24} className="med-icon" />
              </div>
              
              <div className="med-info">
                <h3>{med.nome}</h3>
                <p>{med.dosagem}</p>
                <div className="med-time">
                  <Clock size={12} /> {med.horario}
                </div>
              </div>

              <div className="med-check">
                {med.tomado ? (
                  <CheckCircle2 size={28} className="check-icon checked" />
                ) : (
                  <Circle size={28} className="check-icon unchecked" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Medicamentos;
