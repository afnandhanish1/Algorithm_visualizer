import React, { useState, useEffect, useRef } from 'react';
import './QueensControls.css';

const QueensControls = ({ onVisualize, onNextSolution, solutionsCount }) => {
  const [speed, setSpeed] = useState(500);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  
  return (
    <div className="queens-controls">
      <button onClick={() => onVisualize(showSteps, speed)}>
        {showSteps ? 'Show Solving Steps' : 'Show All Solutions'}
      </button>
      
      <button onClick={onNextSolution}>
        Next Solution ({solutionsCount} total)
      </button>
      
      <div className="speed-control">
        <label>Speed:</label>
        <input
          type="range"
          min="50"
          max="2000"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
        <span>{speed}ms</span>
      </div>
      
      <label className="toggle-steps">
        <input
          type="checkbox"
          checked={showSteps}
          onChange={() => setShowSteps(!showSteps)}
        />
        Show Solving Steps
      </label>
    </div>
  );
};

export default QueensControls;