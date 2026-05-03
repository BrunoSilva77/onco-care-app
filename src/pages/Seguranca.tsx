import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Shield, Fingerprint, Lock, Eye, EyeOff, Smartphone, AlertTriangle } from 'lucide-react';
import '../styles/SettingsShared.css';

const Seguranca: React.FC = () => {
  const navigate = useNavigate();
  const [biometria, setBiometria] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [autoLock, setAutoLock] = useState(true);
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    setSenhaAtual(''); setNovaSenha(''); setConfirmarSenha('');
  };

  return (
    <div className="settings-page">
      <div className="settings-topbar">
        <button className="settings-back-btn" onClick={() => navigate('/home')}>
          <ChevronLeft size={20} />
        </button>
        <span className="settings-topbar-title">Segurança</span>
      </div>

      <div className="settings-body">
        {/* Acesso */}
        <div className="scard">
          <p className="scard-label">Controle de Acesso</p>

          <div className="srow">
            <div className="srow-left">
              <div className="srow-icon" style={{ background: 'rgba(80, 200, 130, 0.1)', color: '#50c882' }}>
                <Fingerprint size={18} />
              </div>
              <div className="srow-text">
                <h4>Face ID / Digital</h4>
                <p>Entrar sem digitar senha</p>
              </div>
            </div>
            <label className="s-toggle">
              <input type="checkbox" checked={biometria} onChange={() => setBiometria(v => !v)} />
              <span className="s-toggle-slider" />
            </label>
          </div>

          <div className="srow">
            <div className="srow-left">
              <div className="srow-icon">
                <Smartphone size={18} />
              </div>
              <div className="srow-text">
                <h4>Verificação em 2 etapas</h4>
                <p>Código por SMS ao entrar</p>
              </div>
            </div>
            <label className="s-toggle">
              <input type="checkbox" checked={twoFactor} onChange={() => setTwoFactor(v => !v)} />
              <span className="s-toggle-slider" />
            </label>
          </div>

          <div className="srow" style={{ borderBottom: 'none' }}>
            <div className="srow-left">
              <div className="srow-icon" style={{ background: 'rgba(255, 190, 64, 0.1)', color: '#ffbe00' }}>
                <Lock size={18} />
              </div>
              <div className="srow-text">
                <h4>Bloqueio Automático</h4>
                <p>Travar após 2 min de inatividade</p>
              </div>
            </div>
            <label className="s-toggle">
              <input type="checkbox" checked={autoLock} onChange={() => setAutoLock(v => !v)} />
              <span className="s-toggle-slider" />
            </label>
          </div>
        </div>

        {/* Alterar Senha */}
        <div className="scard">
          <p className="scard-label">Alterar Senha</p>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '8px 0 16px' }}>
            <div>
              <div className="settings-input-label">
                <Lock size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                Senha Atual
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  className="settings-input"
                  type={showPass ? 'text' : 'password'}
                  value={senhaAtual}
                  onChange={e => setSenhaAtual(e.target.value)}
                  placeholder="••••••"
                  style={{ paddingRight: 44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', marginTop: 4 }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <div className="settings-input-label">Nova Senha</div>
              <input
                className="settings-input"
                type="password"
                value={novaSenha}
                onChange={e => setNovaSenha(e.target.value)}
                placeholder="••••••"
              />
            </div>
            <div>
              <div className="settings-input-label">Confirmar Nova Senha</div>
              <input
                className="settings-input"
                type="password"
                value={confirmarSenha}
                onChange={e => setConfirmarSenha(e.target.value)}
                placeholder="••••••"
              />
            </div>
            <button type="submit" className="settings-save-btn" style={{ marginTop: 4 }}>
              {saved ? '✓ Senha atualizada!' : 'Atualizar Senha'}
            </button>
          </form>
        </div>

        {/* Zona de perigo */}
        <div className="scard">
          <p className="scard-label" style={{ color: '#ff4b4b' }}>Zona de Risco</p>
          <div style={{ padding: '8px 0 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button className="danger-btn" onClick={() => navigate('/login')}>
              <Shield size={16} /> Encerrar Sessão em Todos os Dispositivos
            </button>
            <button className="danger-btn">
              <AlertTriangle size={16} /> Excluir Minha Conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seguranca;
