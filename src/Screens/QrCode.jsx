import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Qr.css'; 
import logoww from "../Images/logoww.png"
import qrlogo from "../Images/qrlogo.png"
const Qr = () => {
  const navigate = useNavigate();

  return (
    <div className="background-image">
      <div className="home">
        <div className="main-home">
        <img
        src={logoww}
        alt="Logo"
        className="w-3/5 mb-8 absolute top-12"
      />
          <div className="qr-container">
            <img 
              src={qrlogo} 
              alt="QR Code"
              className="qr"
            />
            <p className="text">Scan QR Code</p>
            <button 
              className="scanned-button"
              onClick={() => navigate('/qrscan')}
            >
              <span className="button-text">Scan Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Qr;
