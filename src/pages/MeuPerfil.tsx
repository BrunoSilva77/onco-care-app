import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Mail, Phone, Calendar, ChevronRight, Camera } from 'lucide-react';
import './SettingsShared.css';

const MeuPerfil: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('Michael');
  const [email, setEmail] = useState('michael@oncocare.com.br');
  const [telefone, setTelefone] = useState('(11) 99999-0000');
  const [nascimento, setNascimento] = useState('1985-06-20');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="settings-page">
      {/* Top Bar */}
      <div className="settings-topbar">
        <button className="settings-back-btn" onClick={() => navigate('/home')}>
          <ChevronLeft size={20} />
        </button>
        <span className="settings-topbar-title">Meu Perfil</span>
      </div>

      <div className="settings-body">
        {/* Avatar */}
        <div className="avatar-section">
          <div className="avatar-circle" style={{ background: 'none', padding: 0, overflow: 'hidden' }}>
            <img
              src="/assets/images/user_avatar.jpg"
              alt="Foto de perfil"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', borderRadius: '50%' }}
            />
          </div>
          <button className="avatar-edit-btn">
            <Camera size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            Alterar foto
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="scard">
            <p className="scard-label">Informações Pessoais</p>

            <div className="srow" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <div className="settings-input-label">
                <User size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                Nome Completo
              </div>
              <input
                className="settings-input"
                value={nome}
                onChange={e => setNome(e.target.value)}
                placeholder="Seu nome"
              />
            </div>

            <div className="srow" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <div className="settings-input-label">
                <Mail size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                Email
              </div>
              <input
                className="settings-input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
              />
            </div>

            <div className="srow" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <div className="settings-input-label">
                <Phone size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                Telefone
              </div>
              <input
                className="settings-input"
                type="tel"
                value={telefone}
                onChange={e => setTelefone(e.target.value)}
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="srow" style={{ flexDirection: 'column', alignItems: 'flex-start', borderBottom: 'none' }}>
              <div className="settings-input-label">
                <Calendar size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                Data de Nascimento
              </div>
              <input
                className="settings-input"
                type="date"
                value={nascimento}
                onChange={e => setNascimento(e.target.value)}
              />
            </div>
          </div>

          <div className="scard">
            <p className="scard-label">Conta</p>
            <div className="srow" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
              <div className="srow-left">
                <div className="srow-icon" style={{ background: 'rgba(255, 140, 163, 0.1)', color: '#ff8ca3' }}>
                  <User size={18} />
                </div>
                <div className="srow-text">
                  <h4>Alterar Senha</h4>
                  <p>Mantenha sua conta segura</p>
                </div>
              </div>
              <ChevronRight size={18} className="srow-right" />
            </div>
            <div className="srow" style={{ borderBottom: 'none' }}>
              <div className="srow-left">
                <div className="srow-icon" style={{ background: 'rgba(93, 195, 246, 0.1)', color: '#5dc3f6' }}>
                  <Mail size={18} />
                </div>
                <div className="srow-text">
                  <h4>CPF Cadastrado</h4>
                  <p>***.***.***-00</p>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="settings-save-btn">
            {saved ? '✓ Salvo com sucesso!' : 'Salvar Alterações'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MeuPerfil;
