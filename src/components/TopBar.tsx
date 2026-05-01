import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import './TopBar.css';

interface TopBarProps {
  title: string;
  rightElement?: React.ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({ title, rightElement }) => {
  const navigate = useNavigate();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </button>
        <h2 className="topbar-title">{title}</h2>
      </div>
      {rightElement && rightElement}
    </header>
  );
};

export default TopBar;
