import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = ({ voices, selectedVoice, setSelectedVoice, toggleTheme, theme }) => {
  return (
    <div className="header">
      <h1>Algorithm Visualizer</h1>
      <div className="header-controls">
        <div className="voice-control">
          <label>Voice:</label>
          <select
            value={selectedVoice?.name || ''}
            onChange={(e) => {
              const voice = voices.find(v => v.name === e.target.value);
              setSelectedVoice(voice);
            }}
          >
            {voices.map(voice => (
              <option key={voice.name} value={voice.name}>
                {voice.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={toggleTheme} className="theme-toggle">
          <FontAwesomeIcon icon={theme === 'light-theme' ? faMoon : faSun} />
        </button>
      </div>
    </div>
  );
};

export default Header;