import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Brain } from 'lucide-react';
import './FloatingAssistant.css';

const FloatingAssistant: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide the floating button on the login screen and the assistant screen itself
  if (location.pathname === '/login' || location.pathname === '/assistente') {
    return null;
  }

  return (
    <button className="global-fab-oc-ia" onClick={() => navigate('/assistente')}>
      <Brain />
    </button>
  );
};

export default FloatingAssistant;
