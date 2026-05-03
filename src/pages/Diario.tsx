import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import { Smile, Meh, Frown, Check, Activity, BarChart2 } from 'lucide-react';
import '../styles/Diario.css';

const Diario: React.FC = () => {
  const [humor, setHumor] = useState<string | null>(null);
  const [dor, setDor] = useState<number>(3);
  const [salvo, setSalvo] = useState(false);

  const humores = [
    { id: 'excelente', icon: <Smile size={32} />, label: 'Excelente' },
    { id: 'bom', icon: <Smile size={32} style={{ opacity: 0.8 }} />, label: 'Bom' },
    { id: 'neutro', icon: <Meh size={32} />, label: 'Neutro' },
    { id: 'ruim', icon: <Frown size={32} />, label: 'Ruim' },
    { id: 'pessimo', icon: <Frown size={32} style={{ opacity: 0.5 }} />, label: 'Péssimo' }
  ];

  // Dados mockados para o gráfico de evolução da dor na semana
  const historicoDor = [
    { dia: 'Seg', nivel: 4 },
    { dia: 'Ter', nivel: 6 },
    { dia: 'Qua', nivel: 5 },
    { dia: 'Qui', nivel: 3 },
    { dia: 'Sex', nivel: 2 },
    { dia: 'Sáb', nivel: 3 },
    { dia: 'Hoje', nivel: dor }
  ];

  const handleSalvar = () => {
    if (!humor) return;
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3000);
  };

  return (
    <div className="page-container">
      <TopBar title="Diário de Bem-Estar" />
      
      <div className="diario-content">
        {/* Formulário do dia */}
        <div className="diario-card">
          <div className="diario-header">
            <h3>Como você está se sentindo hoje?</h3>
            <p>Seu registro ajuda os médicos a personalizarem seu tratamento.</p>
          </div>

          <div className="humor-selector">
            {humores.map(h => (
              <div 
                key={h.id}
                className={`humor-option ${humor === h.id ? 'active' : ''}`}
                onClick={() => setHumor(h.id)}
              >
                <div className="humor-icon">{h.icon}</div>
                <span>{h.label}</span>
              </div>
            ))}
          </div>

          <div className="dor-selector">
            <div className="dor-header">
              <span className="dor-title"><Activity size={16} /> Nível de Dor Física</span>
              <span className="dor-value">{dor}/10</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="10" 
              value={dor} 
              onChange={(e) => setDor(parseInt(e.target.value))}
              className="dor-slider"
            />
            <div className="dor-labels">
              <span>Sem dor</span>
              <span>Dor intensa</span>
            </div>
          </div>

          <button 
            className={`btn-salvar-diario ${salvo ? 'saved' : ''} ${!humor ? 'disabled' : ''}`}
            onClick={handleSalvar}
            disabled={!humor}
          >
            {salvo ? <><Check size={20} /> Registrado com sucesso!</> : 'Salvar Registro Diário'}
          </button>
        </div>

        {/* Gráficos de Evolução */}
        <div className="diario-card chart-card">
          <div className="diario-header">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <BarChart2 size={20} color="var(--color-primary)" /> 
              Evolução da Dor (7 dias)
            </h3>
          </div>
          
          <div className="chart-container">
            {historicoDor.map((item, idx) => {
              const heightPercentage = (item.nivel / 10) * 100;
              return (
                <div className="chart-bar-wrapper" key={idx}>
                  <div className="chart-bar-value">{item.nivel}</div>
                  <div className="chart-bar">
                    <div 
                      className="chart-bar-fill" 
                      style={{ 
                        height: `${heightPercentage}%`,
                        backgroundColor: item.nivel > 6 ? '#ff6b6b' : item.nivel > 3 ? '#feca57' : '#48dbfb'
                      }}
                    ></div>
                  </div>
                  <div className="chart-bar-label">{item.dia}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diario;
