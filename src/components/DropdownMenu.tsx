import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Home, Settings } from 'lucide-react';
import '../styles/DropdownMenu.css';

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div className="dropdown-container" ref={menuRef}>
      <button 
        className="icon-btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        <Menu />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <button className="dropdown-item" onClick={() => handleNavigate('/home')}>
            <Home /> Página inicial
          </button>
          <button className="dropdown-item" onClick={() => handleNavigate('/configuracoes')}>
            <Settings /> Configurações
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
