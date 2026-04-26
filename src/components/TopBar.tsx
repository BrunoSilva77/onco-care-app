import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import DropdownMenu from './DropdownMenu';
import './TopBar.css';

interface TopBarProps {
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </button>
        <h2 className="topbar-title">{title}</h2>
      </div>
      <DropdownMenu />
    </header>
  );
};

export default TopBar;
