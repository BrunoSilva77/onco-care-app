import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageCircle } from 'lucide-react';
import './ChamadaVideoTelemedicina.css';

const ChamadaVideoTelemedicina: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callTime, setCallTime] = useState(0);

  useEffect(() => {
    if (!doctor) {
      navigate('/telemedicina');
      return;
    }

    const timer = setInterval(() => {
      setCallTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [doctor, navigate]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleEndCall = () => {
    navigate(-1);
  };

  if (!doctor) return null;

  return (
    <div className="video-call-container">
      {/* Main Video Area (Doctor) */}
      <div className="main-video-area">
        <div className="main-video-placeholder">
          <div className="doctor-large-avatar">{doctor.initial}</div>
        </div>
        <div className="video-overlay-info">
          <h2>{doctor.name}</h2>
          <p>{formatTime(callTime)}</p>
        </div>
      </div>

      {/* PIP Video Area (Patient) */}
      <div className={`pip-video-area ${isVideoOff ? 'pip-off' : ''}`}>
        {isVideoOff ? (
          <div className="pip-placeholder">Você</div>
        ) : (
          <img src="/assets/images/user_avatar.jpg" alt="Você" className="pip-image" />
        )}
      </div>

      {/* Controls Area */}
      <div className="video-controls-area">
        <button 
          className={`control-btn ${isMuted ? 'btn-disabled' : ''}`} 
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
        </button>

        <button 
          className={`control-btn ${isVideoOff ? 'btn-disabled' : ''}`} 
          onClick={() => setIsVideoOff(!isVideoOff)}
        >
          {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
        </button>

        <button 
          className="control-btn" 
          onClick={() => navigate('/telemedicina/chat', { state: { doctor } })}
        >
          <MessageCircle size={24} />
        </button>

        <button className="control-btn btn-end-call" onClick={handleEndCall}>
          <PhoneOff size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChamadaVideoTelemedicina;
