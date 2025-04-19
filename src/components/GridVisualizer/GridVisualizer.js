import React from 'react';
import './GridVisualizer.css';

const GridVisualizer = ({ 
  grid, 
  onNodeClick, 
  mouseIsPressed, 
  onMouseDown, 
  onMouseUp,
  startNode,
  finishNode
}) => {
  return (
    <div 
      className="grid" 
      onMouseLeave={onMouseUp}  // Clear mouse state when leaving grid
      onMouseUp={onMouseUp}     // Handle mouse up anywhere on grid
    >
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className="grid-row">
          {row.map((node, nodeIdx) => {
            const { row, col, isStart, isFinish, isWall, isVisited, isPath } = node;
            
            // Determine node classes based on state
            const extraClass = 
              isStart ? 'node-start' :
              isFinish ? 'node-finish' :
              isWall ? 'node-wall' :
              isPath ? 'node-path' :
              isVisited ? 'node-visited' : '';
            
            return (
              <div
                key={`${row}-${col}`}
                id={`node-${row}-${col}`}
                className={`node ${extraClass}`}
                onClick={() => onNodeClick(node)}  // Pass entire node object
                onMouseDown={() => {
                  onMouseDown?.();  // Optional chaining for safety
                  onNodeClick(node);
                }}
                onMouseEnter={() => mouseIsPressed && onNodeClick(node)}
                onMouseUp={onMouseUp}
                // Accessibility attributes
                role="gridcell"
                aria-label={
                  isStart ? 'Start node' :
                  isFinish ? 'Finish node' :
                  isWall ? 'Wall node' :
                  `Node at row ${row}, column ${col}`
                }
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default GridVisualizer;