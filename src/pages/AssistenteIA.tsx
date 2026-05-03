import React, { useState, useRef, useEffect } from 'react';
import TopBar from '../components/TopBar';
import { Send, MoreVertical, X } from 'lucide-react';
import '../styles/AssistenteIA.css';

type Message = { role: 'ai' | 'user'; text: string };

// Base de respostas por palavras-chave
const RESPOSTAS: { keywords: string[]; response: string }[] = [
  {
    keywords: ['sintoma', 'sintomas', 'dor', 'sinto', 'enjoo', 'náusea', 'cansaço', 'fadiga'],
    response: 'Entendo que você está sentindo desconforto. Recomendo registrar seus sintomas na seção "Sintomas" do app para que seu médico acompanhe de perto. Síntomas persistentes como náusea, dor ou fadiga devem ser comunicados ao oncologista imediatamente. Posso te ajudar com mais alguma informação?'
  },
  {
    keywords: ['quimio', 'quimioterapia', 'quimo'],
    response: 'A quimioterapia é um tratamento sistêmico que usa medicamentos para destruir células cancerosas. É normal sentir efeitos colaterais como fadiga, náusea e queda de cabelo. Converse sempre com sua equipe médica sobre o que está sentindo — eles podem ajustar o tratamento para melhorar sua qualidade de vida.'
  },
  {
    keywords: ['radioterapia', 'radio', 'radiação'],
    response: 'A radioterapia utiliza radiação de alta energia para combater o tumor. Os efeitos colaterais variam conforme a região tratada. Hidratação e cuidados com a pele são fundamentais durante o tratamento. Anote suas dúvidas e leve para a próxima consulta com seu radioterapeuta.'
  },
  {
    keywords: ['remédio', 'medicamento', 'tomar', 'comprimido', 'dose', 'horário'],
    response: 'É muito importante seguir o esquema de medicamentos prescrito pelo seu oncologista. Não altere doses sem orientação médica. Você pode usar a seção de Acompanhamento do OncoCare para registrar e receber lembretes dos seus medicamentos.'
  },
  {
    keywords: ['alimenta', 'comer', 'dieta', 'nutrição', 'comida', 'alimento'],
    response: 'Durante o tratamento oncológico, uma alimentação equilibrada ajuda a manter as energias e o sistema imunológico. Evite alimentos ultraprocessados e prefira proteínas magras, frutas e vegetais. Um nutricionista especializado em oncologia pode montar um plano personalizado para você.'
  },
  {
    keywords: ['exame', 'resultado', 'hemograma', 'biópsia', 'tomografia', 'ressonância'],
    response: 'Resultados de exames devem ser interpretados pelo seu médico, que conhece todo o seu histórico clínico. Na seção "Exames / Consultas" do OncoCare você pode registrar seus exames e acompanhar a evolução. Precisa de ajuda para entender algum termo médico específico?'
  },
  {
    keywords: ['consulta', 'agend', 'marcar', 'médico', 'oncologista', 'telemedicina'],
    response: 'Você pode agendar sua teleconsulta diretamente pela seção "Telemedicina" do OncoCare. Lembre-se de anotar suas principais dúvidas antes da consulta para aproveitar melhor o tempo com seu médico.'
  },
  {
    keywords: ['ansie', 'medo', 'preocupa', 'tristeza', 'deprim', 'emocional', 'psicológico'],
    response: 'É completamente normal sentir medo e ansiedade durante o tratamento. Você não está sozinho(a). Converse com sua equipe médica sobre suporte psicológico — muitos centros oncológicos oferecem esse acompanhamento. O apoio emocional é parte fundamental do tratamento.'
  },
  {
    keywords: ['plano', 'convênio', 'seguro', 'cobertura', 'particular'],
    response: 'O OncoCare oferece planos especializados para pacientes oncológicos com diferentes coberturas. Acesse a seção "Planos OncoCare" para comparar as opções disponíveis e escolher o que melhor se adapta à sua situação.'
  },
  {
    keywords: ['farmácia', 'farmacia', 'remédio', 'desconto', 'medicamento barato'],
    response: 'Temos parceria com diversas farmácias que oferecem descontos especiais em medicamentos oncológicos. Consulte a seção "Farmácias Parceiras" para encontrar a unidade mais próxima de você.'
  },
  {
    keywords: ['hospital', 'unidade', 'próximo', 'perto', 'endereço'],
    response: 'Você pode encontrar as unidades hospitalares especializadas mais próximas de você na seção "Unidades Hospitalares" do OncoCare, com mapa e informações de contato.'
  },
  {
    keywords: ['obrigado', 'obrigada', 'valeu', 'grato', 'grata', 'agradeço'],
    response: 'Fico feliz em poder ajudar! Lembre-se: estou aqui sempre que precisar de orientação. Cuide-se e não hesite em perguntar qualquer dúvida sobre seu tratamento. 💜'
  },
  {
    keywords: ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'opa'],
    response: 'Olá! Sou a MyCare, sua assistente virtual de oncologia. Posso responder dúvidas sobre seu tratamento, sintomas, medicamentos, exames e muito mais. Como posso te ajudar hoje?'
  },
];

const RESPOSTA_PADRAO = 'Entendo sua dúvida. Para orientações mais precisas, recomendo consultar seu oncologista ou equipe médica. Eles têm acesso ao seu prontuário completo e podem oferecer a melhor orientação. Posso te ajudar com mais alguma informação sobre tratamento, sintomas ou o app OncoCare?';

const SUGESTOES = [
  'Sintomas de quimioterapia',
  'Como agendar consulta?',
  'Dicas de alimentação',
  'Farmácias parceiras',
  'Me sinto ansioso(a)',
];

function getResponse(text: string): string {
  const lower = text.toLowerCase();
  for (const item of RESPOSTAS) {
    if (item.keywords.some(kw => lower.includes(kw))) {
      return item.response;
    }
  }
  return RESPOSTA_PADRAO;
}

const AssistenteIA: React.FC = () => {
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState<Message[]>([
    { role: 'ai', text: 'Olá! Sou a MyCare, sua assistente de oncologia. Posso responder dúvidas sobre sintomas, tratamentos, medicamentos e muito mais. Como posso te ajudar hoje? 💜' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', text };
    setChat(prev => [...prev, userMsg]);
    setMsg('');
    setIsTyping(true);
    // Simula delay de digitação
    setTimeout(() => {
      setIsTyping(false);
      setChat(prev => [...prev, { role: 'ai', text: getResponse(text) }]);
    }, 1200);
  };

  const dotsButton = (
    <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
      <button className="mycare-dots-btn" onClick={() => setMenuOpen(v => !v)}>
        <MoreVertical size={20} />
      </button>
      {menuOpen && (
        <div className="mycare-dots-menu">
          <button
            className="mycare-dots-item"
            onClick={() => { setShowAbout(true); setMenuOpen(false); }}
          >
            Sobre a MyCare
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="page-container" style={{ height: '100vh' }} onClick={() => setMenuOpen(false)}>
      <TopBar title="MyCare" rightElement={dotsButton} />
      
      <div className="chat-container">
        <div className="chat-messages">
          {chat.map((c, i) => (
            <div key={i} className={`message ${c.role === 'ai' ? 'message-ai' : 'message-user'}`}>
              {c.role === 'ai' && (
                <img
                  src="/assets/images/mycare_avatar.jpg"
                  alt="MyCare"
                  className="ai-avatar"
                />
              )}
              <span>{c.text}</span>
            </div>
          ))}
          {isTyping && (
            <div className="message message-ai typing-indicator">
              <span></span><span></span><span></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {/* Sugestões rápidas */}
        <div className="suggestions-row">
          {SUGESTOES.map((s, i) => (
            <button key={i} className="suggestion-chip" onClick={() => sendMessage(s)}>
              {s}
            </button>
          ))}
        </div>


        <div className="chat-input-area">
          <input 
            type="text" 
            className="chat-input" 
            placeholder="Digite sua dúvida..." 
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(msg)}
          />
          <button className="send-btn" onClick={() => sendMessage(msg)}>
            <Send size={18} />
          </button>
        </div>
      </div>

      {showAbout && (
        <div className="mycare-modal-overlay" onClick={() => setShowAbout(false)}>
          <div className="mycare-modal" onClick={e => e.stopPropagation()}>
            <button className="mycare-modal-close" onClick={() => setShowAbout(false)}>
              <X size={20} />
            </button>

            <p className="mycare-modal-tag">ASSISTENTE VIRTUAL</p>
            <h2 className="mycare-modal-title">MyCare</h2>

            <div className="mycare-modal-avatar-wrap">
              <img src="/assets/images/mycare_avatar.jpg" alt="MyCare" className="mycare-modal-avatar" />
              <div className="mycare-modal-avatar-info">
                <h3>O Ícone</h3>
                <p>
                  O avatar não foi escolhido ao acaso — é uma estilização de
                  <strong> Myrela</strong>, pessoa especial homenageada pela equipe
                  OncoCare, trazendo humanização imediata ao ambiente digital.
                </p>
              </div>
            </div>

            <div className="mycare-modal-divider" />

            <h3 className="mycare-modal-section">Sobre o Nome "MyCare"</h3>
            <p className="mycare-modal-text">
              A escolha do nome foi o &quot;xeque-mate&quot; para fechar o conceito da homenagem:
            </p>

            <div className="mycare-modal-item">
              <span className="mycare-modal-bullet">My</span>
              <p>
                Funciona em dois níveis. Primeiro, é a sílaba inicial de <strong>Myrela</strong>,
                mantendo a essência dela em cada interação. Segundo, em inglês significa
                &quot;Meu&quot; — dando ao paciente sensação de suporte personalizado:
                <em> &quot;Este é o MEU cuidado&quot;</em>.
              </p>
            </div>

            <div className="mycare-modal-item">
              <span className="mycare-modal-bullet">Care</span>
              <p>
                Conecta-se diretamente ao nome do site (<strong>OncoCare</strong>),
                criando um branding consistente onde o produto e o serviço se
                fundem perfeitamente.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssistenteIA;
