import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Send, Phone, Video, MoreVertical } from 'lucide-react';
import './ChatTelemedicina.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'doctor';
  time: string;
}

const ChatTelemedicina: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Olá! Sou ${doctor?.name || 'seu profissional'}. Como posso ajudar você hoje?`,
      sender: 'doctor',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!doctor) {
      navigate('/telemedicina');
    }
  }, [doctor, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate doctor reply
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Certo, entendi. Pode me dar mais detalhes sobre o que está sentindo?',
        sender: 'doctor',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 1500);
  };

  if (!doctor) return null;

  return (
    <div className="chat-container">
      {/* Header */}
      <header className="chat-header">
        <div className="chat-header-left">
          <button className="chat-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} />
          </button>
          <div className="chat-doctor-avatar">{doctor.initial}</div>
          <div className="chat-doctor-info">
            <h2>{doctor.name}</h2>
            <p>
              <span className="online-dot"></span> Online
            </p>
          </div>
        </div>
        <div className="chat-header-right">
          <button className="chat-icon-btn" onClick={() => alert('Ligação de voz indisponível no momento.')}>
            <Phone size={20} />
          </button>
          <button className="chat-icon-btn" onClick={() => navigate('/telemedicina/video', { state: { doctor } })}>
            <Video size={20} />
          </button>
          <button className="chat-icon-btn">
            <MoreVertical size={20} />
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="chat-messages-area">
        <div className="chat-date-divider">
          <span>Hoje</span>
        </div>
        
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message-wrapper ${msg.sender === 'user' ? 'message-sent' : 'message-received'}`}>
            <div className="chat-bubble">
              <p>{msg.text}</p>
              <span className="chat-time">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chat-input-area">
        <input
          type="text"
          className="chat-input"
          placeholder="Mensagem..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className={`chat-send-btn ${inputText.trim() ? 'active' : ''}`} onClick={handleSend}>
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatTelemedicina;
