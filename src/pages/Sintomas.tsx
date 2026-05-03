import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import '../styles/Sintomas.css';

const Sintomas: React.FC = () => {
  const [mood, setMood] = useState<number | null>(null);
  const [pain, setPain] = useState<number>(0);

  const emojis = ['😭', '😔', '😐', '🙂', '😄'];

  return (
    <div className="page-container">
      <TopBar title="Sintomas" />
      
      <div className="sintomas-content">
        <div className="glass-card">
          <h3>Como você está se sentindo hoje?</h3>
          <div className="emoji-selector">
            {emojis.map((emoji, index) => (
              <button 
                key={index} 
                className={`emoji-btn ${mood === index ? 'active' : ''}`}
                onClick={() => setMood(index)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <h3>Nível de Dor</h3>
          <div className="pain-scale">
            <input 
              type="range" 
              min="0" 
              max="10" 
              value={pain} 
              onChange={(e) => setPain(Number(e.target.value))}
            />
            <div className="pain-labels">
              <span>Sem dor (0)</span>
              <span>Dor intensa (10)</span>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <h3>Observações adicionais</h3>
          <textarea 
            className="textarea-input" 
            placeholder="Descreva aqui se houve algum sintoma específico, como náusea, febre, etc..."
          />
        </div>

        <button className="save-btn" onClick={() => alert('Sintomas salvos com sucesso!')}>
          Salvar Registro
        </button>
      </div>
    </div>
  );
};

export default Sintomas;
