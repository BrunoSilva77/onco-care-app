import React from 'react';
import TopBar from '../components/TopBar';
import { BookOpen } from 'lucide-react';
import './Biblioteca.css';

const Biblioteca: React.FC = () => {
  const articles = [
    { cat: 'Nutrição', title: 'Alimentação durante a Quimioterapia', desc: 'Dicas práticas para manter a nutrição adequada e lidar com enjoos.' },
    { cat: 'Bem-estar', title: 'Exercícios Leves para o Dia a Dia', desc: 'Movimentos simples que ajudam a combater a fadiga e melhorar o humor.' },
    { cat: 'Informativo', title: 'Entendendo seus Exames', desc: 'Um guia simplificado para ajudar a ler os resultados laboratoriais básicos.' }
  ];

  return (
    <div className="page-container">
      <TopBar title="Biblioteca" />
      
      <div className="biblioteca-content">
        {articles.map((art, idx) => (
          <div className="article-card" key={idx}>
            <div className="article-image">
              <BookOpen size={40} opacity={0.5} />
            </div>
            <div className="article-info">
              <span className="article-category">{art.cat}</span>
              <h3>{art.title}</h3>
              <p>{art.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Biblioteca;
