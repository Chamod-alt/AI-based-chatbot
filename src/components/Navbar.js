import React from 'react';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out!");
    navigate('/'); // Redirect to login
  };

  return (
    <nav
      style={{
        backgroundColor: '#f9f9f9',
        color: '#333',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #ddd',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
      }}
    >
      <h2 style={{ margin: 0, fontWeight: 600, fontSize: '22px' }}>ChatBot</h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button onClick={() => navigate('/ChatWindow')} style={buttonStyle()}>
          Chat
        </button>
        <button onClick={() => navigate('/ChatPage')} style={buttonStyle()}>
          History
        </button>
        <button onClick={handleLogout} style={buttonStyle()}>
          <MdLogout size={20} /> Logout
        </button>
      </div>
    </nav>
  );
}

// 🔘 Light theme button style
function buttonStyle() {
  return {
    backgroundColor: '#ffffff',
    color: '#333',
    border: '1px solid #ccc',
    padding: '8px 14px',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'background 0.2s',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  };
}
