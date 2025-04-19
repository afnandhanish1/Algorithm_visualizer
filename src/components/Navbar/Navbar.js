import React from 'react';
import './Navbar.css';

const Navbar = ({
  selectedAlgorithm,
  setSelectedAlgorithm,
  visualizationType,
  setVisualizationType
}) => {
  return (
    <div className="navbar">
      <h2>Visualization</h2>
      <div className="visualization-type">
        <button
          className={visualizationType === 'sorting' ? 'active' : ''}
          onClick={() => {
            setVisualizationType('sorting');
            setSelectedAlgorithm('bubbleSort'); // Reset to default sorting algorithm
          }}
        >
          Sorting
        </button>
        <button
          className={visualizationType === 'pathfinding' ? 'active' : ''}
          onClick={() => {
            setVisualizationType('pathfinding');
            setSelectedAlgorithm('dijkstra'); // Reset to default pathfinding algorithm
          }}
        >
          Pathfinding
        </button>
        <button
          className={visualizationType === 'nqueens' ? 'active' : ''}
          onClick={() => {
            setVisualizationType('nqueens');
            setSelectedAlgorithm(null); // No algorithm selection for nqueens
          }}
        >
          8 Queens
        </button>
      </div>

      <h2>Algorithms</h2>
      <ul>
        {visualizationType === 'sorting' ? (
          <>
            <li
              className={selectedAlgorithm === 'bubbleSort' ? 'active' : ''}
              onClick={() => setSelectedAlgorithm('bubbleSort')}
            >
              Bubble Sort
            </li>
            <li
              className={selectedAlgorithm === 'mergeSort' ? 'active' : ''}
              onClick={() => setSelectedAlgorithm('mergeSort')}
            >
              Merge Sort
            </li>
            <li
              className={selectedAlgorithm === 'quickSort' ? 'active' : ''}
              onClick={() => setSelectedAlgorithm('quickSort')}
            >
              Quick Sort
            </li>
          </>
        ) : visualizationType === 'pathfinding' ? (
          <>
            <li
              className={selectedAlgorithm === 'dijkstra' ? 'active' : ''}
              onClick={() => setSelectedAlgorithm('dijkstra')}
            >
              Dijkstra's
            </li>
            <li
              className={selectedAlgorithm === 'aStar' ? 'active' : ''}
              onClick={() => setSelectedAlgorithm('aStar')}
            >
              A* Search
            </li>
          </>
        ) : (
          // No algorithm selection for nqueens
          <li className="no-algorithm">
            Select a visualization type to see available algorithms
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;