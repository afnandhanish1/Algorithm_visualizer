import React from 'react';
import './ArrayVisualizer.css';

const ArrayVisualizer = ({ array, swappingIndices, mergingIndices }) => {
  return (
    <div className="array-container">
      {array.map((value, idx) => (
        <div
          key={idx}
          className={`array-element 
            ${swappingIndices.includes(idx) ? 'swapping' : ''}
            ${mergingIndices?.includes(idx) ? 'merging' : ''}`}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default ArrayVisualizer;