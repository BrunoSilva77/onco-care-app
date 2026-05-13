import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import TopBar from '../components/TopBar';
import '../styles/AssistenteIA.css';

type Message = { role: 'ai' | 'user'; text: string };

// Base de respostas por palavras-chave
const RESPOSTAS: { keywords: string[]; response: string }[] = [
  {
    keywords: ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'opa', 'e aí', 'tudo bem', 'tudo bom', 'hello'],
    response: 'Olá! Sou a MyCare, sua assistente virtual de oncologia. Estou aqui para te ajudar com dúvidas sobre o seu tratamento, agendamentos, sintomas, ou apenas para bater um papo. Como posso ser útil hoje?'
  },
  {
    keywords: ['sintomas de quimioterapia', 'quimio efeitos', 'efeitos colaterais', 'enjoo', 'náusea', 'cansaço', 'fadiga'],
    response: 'Os sintomas da quimioterapia variam, mas é comum sentir náuseas, fadiga e baixa imunidade. No OncoCare, você pode usar a seção "Sintomas" para registrar como está se sentindo diariamente. Se a dor ou enjoo for muito forte, comunique seu oncologista. Quer que eu te ajude a registrar um sintoma?'
  },
  {
    keywords: ['como agendar consulta', 'agendar consulta', 'marcar consulta', 'telemedicina'],
    response: 'Para agendar uma consulta, basta voltar ao menu principal clicando no ícone de Casa (Home) e acessar a aba "Telemedicina". Lá você poderá escolher a especialidade e o horário desejado com a nossa equipe médica. Tudo de forma rápida e segura!'
  },
  {
    keywords: ['dicas de alimentação', 'o que comer', 'nutrição', 'dieta', 'alimentação'],
    response: 'A alimentação é uma parte essencial do seu tratamento! É recomendável preferir alimentos leves, bem cozidos e fáceis de digerir. Evite frituras e alimentos crus se sua imunidade estiver baixa. Não se esqueça de beber bastante água! Um nutricionista oncológico pode te ajudar com um plano personalizado.'
  },
  {
    keywords: ['farmácias parceiras', 'farmácia', 'desconto', 'comprar remédio'],
    response: 'O OncoCare possui parceria com diversas farmácias para oferecer descontos em medicamentos oncológicos e de suporte. Acesse "Farmácias" no menu principal para encontrar a unidade mais próxima e gerar o seu cupom de desconto.'
  },
  {
    keywords: ['me sinto ansioso', 'ansioso', 'ansiosa', 'medo', 'angústia', 'psicológico', 'triste', 'depressão'],
    response: 'O tratamento oncológico é um grande desafio e é perfeitamente normal sentir ansiedade ou medo. A saúde mental é tão importante quanto a física. Se precisar desabafar, a nossa "Rede de Apoio" (Comunidade) está cheia de pessoas incríveis que entendem exatamente o que você está passando. Também temos psicólogos via Telemedicina disponíveis.'
  },
  {
    keywords: ['meu perfil', 'dados', 'foto'],
    response: 'Você pode atualizar seus dados pessoais, sua foto e visualizar seu diagnóstico na aba "Meu Perfil" do menu principal. É importante manter essas informações sempre atualizadas para a sua equipe médica.'
  },
  {
    keywords: ['menu principal', 'voltar', 'home', 'início'],
    response: 'Para voltar ao menu principal, basta clicar no botão de voltar (seta) na barra superior!'
  },
  {
    keywords: ['quimio', 'quimioterapia', 'quimo'],
    response: 'A quimioterapia é um tratamento sistêmico que usa medicamentos para destruir células cancerosas. É normal sentir efeitos colaterais. Converse sempre com sua equipe médica sobre o que está sentindo — eles podem ajustar o tratamento para melhorar sua qualidade de vida.'
  },
  {
    keywords: ['radioterapia', 'radio', 'radiação'],
    response: 'A radioterapia utiliza radiação de alta energia para combater o tumor. Os efeitos colaterais variam conforme a região tratada. Hidratação e cuidados com a pele são fundamentais durante o tratamento.'
  },
  {
    keywords: ['remédio', 'medicamento', 'tomar', 'comprimido', 'dose', 'horário'],
    response: 'É muito importante seguir o esquema de medicamentos prescrito pelo seu oncologista. Não altere doses sem orientação médica. Você pode usar a seção de Acompanhamento do OncoCare para registrar e receber lembretes.'
  },
  {
    keywords: ['obrigado', 'obrigada', 'valeu', 'grato', 'grata', 'agradeço'],
    response: 'Fico feliz em poder ajudar! Lembre-se: estou aqui sempre que precisar de orientação. Cuide-se e não hesite em perguntar qualquer dúvida sobre seu tratamento. 💜'
  }
];

const RESPOSTA_PADRAO = 'Entendo. Para orientações mais precisas e seguras sobre isso, recomendo consultar seu oncologista ou equipe médica. Eles têm acesso ao seu prontuário e podem oferecer a melhor orientação. Posso te ajudar com mais alguma informação sobre o app OncoCare?';

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
    setTimeout(() => {
      setIsTyping(false);
      setChat(prev => [...prev, { role: 'ai', text: getResponse(text) }]);
    }, 1200);
  };

  return (
    <div className="page-container">
      <TopBar titleElement={
        <div className="mycare-chat-header">
          <div className="mycare-avatar-wrap">
            <img src="/assets/images/mycare_avatar.jpg" alt="MyCare" className="mycare-header-avatar" />
            <span className="mycare-online-dot"></span>
          </div>
          <div className="mycare-header-text">
            <span className="mycare-header-name">MyCare</span>
            <span className="mycare-header-status">
              <span className="mycare-status-dot"></span>
              Online · Assistente Virtual
            </span>
          </div>
        </div>
      } />

      <div className="chat-feed">
        <div className="chat-messages">
          {chat.map((c, i) => (
            <div
              key={i}
              className={`message ${c.role === 'ai' ? 'message-ai' : 'message-user'}`}
            >
              <span>{c.text}</span>
            </div>
          ))}
          {isTyping && (
            <div className="message message-ai typing-indicator">
              <span></span><span></span><span></span>
            </div>
          )}

          {/* Sugestões rápidas */}
          <div className="suggestions-row">
            {SUGESTOES.map((s, i) => (
              <button key={i} className="suggestion-chip" onClick={() => sendMessage(s)}>
                {s}
              </button>
            ))}
          </div>

          <div ref={messagesEndRef} />
        </div>

        {/* Input sticky na base */}
        <div className="chat-input-area floating">
          <input
            type="text"
            className="chat-input"
            placeholder="Digite sua dúvida..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(msg)}
          />
          <button
            className={`send-btn icon-only ${msg.trim() ? 'active' : ''}`}
            onClick={() => sendMessage(msg)}
            disabled={!msg.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssistenteIA;
