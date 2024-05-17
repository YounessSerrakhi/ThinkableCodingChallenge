import React from 'react';

interface ButtonProps {
  onClick?: () => void; // Make onClick prop optional
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, type = 'button', children }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      style={{
        backgroundColor: '#0085a1',
        border: 'none',
        color: 'white',
        padding: '15px 32px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer',
        borderRadius: '8px',
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        transition: 'transform 0.3s ease',
      }}
    >
      {children}
    </button>
  );
};

export default Button;
