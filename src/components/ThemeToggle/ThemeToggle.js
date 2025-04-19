import React from 'react';
import './ThemeToggle.css';

const ThemeToggle = ({ toggleTheme }) => {
  return (
    <button onClick={toggleTheme} className="theme-toggle">
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;