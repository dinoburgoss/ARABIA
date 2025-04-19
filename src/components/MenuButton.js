// src/components/MenuButton.js
import React from 'react';

const MenuButton = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="m-2 px-4 py-2 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600 transition-all"
    >
      {label}
    </button>
  );
};

export default MenuButton;
