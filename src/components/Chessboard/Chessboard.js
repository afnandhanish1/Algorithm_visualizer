import React, { useEffect, useState } from 'react';
import './Chessboard.css';

const Chessboard = ({ board, activeRow = -1, activeCol = -1, conflictCells = [] }) => {
  return (
    <div className="chessboard">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="chessboard-row">
          {row.map((cell, colIndex) => {
            const isActive = rowIndex === activeRow && colIndex === activeCol;
            const hasConflict = conflictCells.some(
              ([r, c]) => r === rowIndex && c === colIndex
            );
            
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`chessboard-cell 
                  ${(rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark'}
                  ${isActive ? 'active' : ''}
                  ${hasConflict ? 'conflict' : ''}`}
              >
                {cell === 1 && <div className="queen">♛</div>}
                {isActive && <div className="attempt-marker">?</div>}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Chessboard;