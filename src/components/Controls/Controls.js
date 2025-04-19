import React, { useState } from 'react';
import './Controls.css';

const Controls = ({
  // Common props
  visualizationType = 'sorting',
  isRunning,
  startAlgorithm,
  
  // Sorting props
  handleSubmitArray,
  speed,
  setSpeed,
  nextStep,
  
  // Pathfinding props
  handleSetStart,
  handleSetFinish,
  isSettingStart,
  isSettingFinish,
  clearGrid,
  resetGrid,
  selectedAlgorithm
}) => {
  const [inputArray, setInputArray] = useState('');

  const handleSubmit = () => {
    const newArray = inputArray
      .split(',')
      .map(item => parseInt(item.trim(), 10))
      .filter(item => !isNaN(item));
    handleSubmitArray(newArray);
  };

  const getAlgorithmName = () => {
    switch(selectedAlgorithm) {
      case 'dijkstra': return "Dijkstra's";
      case 'aStar': return "A*";
      case 'bubbleSort': return "Bubble Sort";
      case 'mergeSort': return "Merge Sort";
      case 'quickSort': return "Quick Sort";
      default: return "Algorithm";
    }
  };

  return (
    <div className="controls">
      {visualizationType === 'sorting' ? (
        <>
          <div className="array-input">
            <input
              type="text"
              placeholder="Enter array (e.g., 5,3,8,4,2)"
              value={inputArray}
              onChange={(e) => setInputArray(e.target.value)}
              disabled={isRunning}
            />
            <button onClick={handleSubmit} disabled={isRunning}>
              Set Array
            </button>
          </div>
          <button 
            onClick={startAlgorithm} 
            disabled={isRunning}
            className="visualize-btn"
          >
            Visualize {getAlgorithmName()}
          </button>
          <button 
            onClick={nextStep} 
            disabled={!isRunning}
            className="step-btn"
          >
            Next Step
          </button>
          <div className="speed-control">
            <label>Speed (ms):</label>
            <input
              type="range"
              min="10"
              max="1000"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled={isRunning}
            />
            <span>{speed}</span>
          </div>
        </>
      ) : (
        <>
          <button 
            onClick={handleSetStart}
            className={`set-btn ${isSettingStart ? 'active' : ''}`}
            disabled={isRunning}
          >
            {isSettingStart ? 'Click on Grid' : 'Set Start'}
          </button>
          <button 
            onClick={handleSetFinish}
            className={`set-btn ${isSettingFinish ? 'active' : ''}`}
            disabled={isRunning}
          >
            {isSettingFinish ? 'Click on Grid' : 'Set Finish'}
          </button>
          <button 
            onClick={startAlgorithm} 
            disabled={isRunning}
            className="visualize-btn"
          >
            Visualize {getAlgorithmName()}
          </button>
          <button 
            onClick={clearGrid}
            disabled={isRunning}
            className="clear-btn"
          >
            Clear Walls
          </button>
          <button 
            onClick={resetGrid}
            disabled={isRunning}
            className="reset-btn"
          >
            Reset Grid
          </button>
        </>
      )}
    </div>
  );
};

export default Controls;