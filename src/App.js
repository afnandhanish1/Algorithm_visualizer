import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import ArrayVisualizer from './components/ArrayVisualizer/ArrayVisualizer';
import GridVisualizer from './components/GridVisualizer/GridVisualizer';
import Chessboard from './components/Chessboard/Chessboard';
import Controls from './components/Controls/Controls';
import { bubbleSortSteps } from './algorithms/sorting/bubbleSort';
import { mergeSortSteps } from './algorithms/sorting/mergeSort';
import { quickSortSteps } from './algorithms/sorting/quickSort';
import { dijkstra, getNodesInShortestPathOrder } from './algorithms/pathfinding/dijkstra';
import { aStar } from './algorithms/pathfinding/aStar';
import { solveNQueens, solveNQueensWithSteps, getAllSolutions } from './algorithms/nqueens/solver';
import { createEmptyBoard } from './algorithms/nqueens/boardUtils';
import { speak } from './algorithms/utils/speak';
import { getInitialGrid, getNewGridWithWallToggled } from './algorithms/pathfinding/gridUtils';
import './App.css';
import './themes.css';

function App() {
  // Common state
  const [theme, setTheme] = useState('light-theme');
  const [isRunning, setIsRunning] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort');
  const [visualizationType, setVisualizationType] = useState('sorting');
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [message, setMessage] = useState('Select a visualization type');

  // Sorting state
  const [array, setArray] = useState([5, 3, 8, 4, 2]);
  const [speed, setSpeed] = useState(100);
  const [step, setStep] = useState(0);
  const [algorithmSteps, setAlgorithmSteps] = useState([]);
  const [swappingIndices, setSwappingIndices] = useState([]);
  const [mergingIndices, setMergingIndices] = useState([]);

  // Pathfinding state
  const [grid, setGrid] = useState(getInitialGrid(20, 50));
  const [startNode, setStartNode] = useState({ row: 10, col: 15 });
  const [finishNode, setFinishNode] = useState({ row: 10, col: 35 });
  const [isSettingStart, setIsSettingStart] = useState(false);
  const [isSettingFinish, setIsSettingFinish] = useState(false);

  // 8 Queens state
  const [queensBoard, setQueensBoard] = useState(createEmptyBoard(8));
  const [solutions, setSolutions] = useState([]);
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);
  const [animationSteps, setAnimationSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeCell, setActiveCell] = useState(null);
  const [conflicts, setConflicts] = useState([]);
  const [showAllSteps, setShowAllSteps] = useState(false);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      const bestVoice = availableVoices.find(
        voice => voice.name.includes('Microsoft David') || 
                voice.name.includes('Google US English')
      );
      setSelectedVoice(bestVoice || availableVoices[0]);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Initialize N-Queens solutions when mode changes to nqueens
  useEffect(() => {
    if (visualizationType === 'nqueens') {
      const allSolutions = getAllSolutions(8);
      setSolutions(allSolutions);
      if (allSolutions.length > 0) {
        setQueensBoard(allSolutions[0]);
      }
      setCurrentSolutionIndex(0);
      setMessage('Click "Visualize" to see the solution process');
      
      const steps = solveNQueensWithSteps(8);
      setAnimationSteps(steps);
    } else {
      setMessage('Select a visualization type');
    }
  }, [visualizationType]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'light-theme' ? 'dark-theme' : 'light-theme');
  };

  // Handle chessboard cell clicks for N-Queens
  const handleCellClick = (row, col) => {
    if (visualizationType !== 'nqueens' || isRunning) return;
    
    if (queensBoard[row][col] === 1) {
      const queenPosition = `Queen at row ${row + 1}, column ${col + 1} in solution ${currentSolutionIndex + 1}`;
      speak(queenPosition, selectedVoice);
      setMessage(queenPosition);
    }
  };

  // Handle array input for sorting
  const handleSubmitArray = (newArray) => {
    setArray(newArray);
    setStep(0);
    setAlgorithmSteps([]);
    setSwappingIndices([]);
    setMergingIndices([]);
  };

  // Handle node clicks for pathfinding
  const handleNodeClick = (node) => {
    if (isRunning) return;
    
    const { row, col } = node;
    
    if (isSettingStart) {
      // Clear old start node
      const newGrid = grid.map(row => row.map(node => ({
        ...node,
        isStart: false
      })));
      // Set new start node
      newGrid[row][col].isStart = true;
      setGrid(newGrid);
      setStartNode({ row, col });
      setIsSettingStart(false);
      return;
    }

    if (isSettingFinish) {
      // Clear old finish node
      const newGrid = grid.map(row => row.map(node => ({
        ...node,
        isFinish: false
      })));
      // Set new finish node
      newGrid[row][col].isFinish = true;
      setGrid(newGrid);
      setFinishNode({ row, col });
      setIsSettingFinish(false);
      return;
    }

    // Toggle wall if not start/finish node
    if (!node.isStart && !node.isFinish) {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
    }
  };

  // Clear walls from grid
  const clearGrid = () => {
    if (isRunning) return;
    const newGrid = grid.map(row => 
      row.map(node => ({
        ...node,
        isWall: false,
        isVisited: false,
        isPath: false,
      }))
    );
    setGrid(newGrid);
  };

  // Reset entire grid
  const resetGrid = () => {
    if (isRunning) return;
    setGrid(getInitialGrid(20, 50));
    setStartNode({ row: 10, col: 15 });
    setFinishNode({ row: 10, col: 35 });
  };

  // Start algorithm
  const startAlgorithm = () => {
    if (visualizationType === 'sorting') {
      visualizeSortingAlgorithm();
    } else if (visualizationType === 'pathfinding') {
      visualizePathfindingAlgorithm();
    } else if (visualizationType === 'nqueens') {
      visualizeNQueens();
    }
  };

  // Visualize sorting algorithm
  const visualizeSortingAlgorithm = () => {
    let steps;
    switch (selectedAlgorithm) {
      case 'bubbleSort':
        steps = bubbleSortSteps([...array]);
        break;
      case 'mergeSort':
        steps = mergeSortSteps([...array]);
        break;
      case 'quickSort':
        steps = quickSortSteps([...array]);
        break;
      default:
        steps = [];
    }
    setAlgorithmSteps(steps);
    setIsRunning(true);
    setStep(0);
  };

  // Visualize pathfinding algorithm
  const visualizePathfindingAlgorithm = () => {
    // Reset grid visualization
    const newGrid = grid.map(row => 
      row.map(node => ({
        ...node,
        isVisited: false,
        distance: Infinity,
        previousNode: null,
        isPath: false,
      }))
    );
    setGrid(newGrid);

    // Get fresh references to start and finish nodes
    const start = newGrid[startNode.row][startNode.col];
    const finish = newGrid[finishNode.row][finishNode.col];
    
    let visitedNodesInOrder;
    if (selectedAlgorithm === 'dijkstra') {
      visitedNodesInOrder = dijkstra(newGrid, start, finish);
    } else if (selectedAlgorithm === 'aStar') {
      visitedNodesInOrder = aStar(newGrid, start, finish);
    }
    
    // Only animate path if finish node was reached
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finish);
    animatePathfinding(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  // Visualize N-Queens solution with steps
  const visualizeNQueens = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setCurrentStep(0);
    setMessage('Visualizing solution...');
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < animationSteps.length) {
        const step = animationSteps[i];
        
        // Stop if we found a solution and don't want to show all steps
        if (!showAllSteps && step.type === 'solution') {
          setQueensBoard(step.board);
          setMessage('Found first solution!');
          clearInterval(interval);
          setIsRunning(false);
          return;
        }
        
        setQueensBoard(step.board);
        setMessage(step.message);
        
        if (step.type === 'try') {
          setActiveCell({ row: step.row, col: step.col });
          // Calculate conflicting cells for visualization
          const newConflicts = [];
          for (let r = 0; r < step.row; r++) {
            if (step.board[r][step.col]) newConflicts.push([r, step.col]);
          }
          // Check diagonals
          for (let r = step.row, c = step.col; r >= 0 && c >= 0; r--, c--) {
            if (step.board[r][c]) newConflicts.push([r, c]);
          }
          for (let r = step.row, c = step.col; r >= 0 && c < 8; r--, c++) {
            if (step.board[r][c]) newConflicts.push([r, c]);
          }
          setConflicts(newConflicts);
        } else {
          setActiveCell(null);
          setConflicts([]);
        }
        
        i++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setMessage(`Solution ${currentSolutionIndex + 1}/${solutions.length}`);
      }
    }, speed);
  };

  // Animate pathfinding algorithm
  const animatePathfinding = (visitedNodesInOrder, nodesInShortestPathOrder = []) => {
    setIsRunning(true);
    
    // Animate visited nodes
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const newGrid = [...grid];
        newGrid[node.row][node.col].isVisited = true;
        setGrid(newGrid);
      }, 10 * i);
    }
  };

  // Animate the shortest path
  const animateShortestPath = (path) => {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const node = path[i];
        const newGrid = [...grid];
        newGrid[node.row][node.col].isPath = true;
        setGrid(newGrid);
      }, 50 * i);
    }
    setTimeout(() => setIsRunning(false), 50 * path.length);
  };

  // Next step for sorting algorithms
  const nextStep = () => {
    if (step < algorithmSteps.length - 1) {
      const currentStep = algorithmSteps[step];
      setArray(currentStep.array);
      speak(currentStep.message, selectedVoice);

      if (currentStep.swappingIndices) {
        setSwappingIndices(currentStep.swappingIndices);
        setTimeout(() => setSwappingIndices([]), speed);
      }
      if (currentStep.mergingIndices) {
        setMergingIndices(currentStep.mergingIndices);
        setTimeout(() => setMergingIndices([]), speed);
      }

      setStep(step + 1);
    } else {
      setIsRunning(false);
    }
  };

  // Function to handle setting start node
  const handleSetStart = () => {
    setIsSettingStart(true);
    setIsSettingFinish(false);
  };

  // Function to handle setting finish node
  const handleSetFinish = () => {
    setIsSettingFinish(true);
    setIsSettingStart(false);
  };

  // Show next N-Queens solution
  const showNextSolution = () => {
    if (solutions.length > 0) {
      const nextIndex = (currentSolutionIndex + 1) % solutions.length;
      setCurrentSolutionIndex(nextIndex);
      setQueensBoard(solutions[nextIndex]);
      setActiveCell(null);
      setConflicts([]);
      const message = `Solution ${nextIndex + 1} of ${solutions.length}`;
      speak(message, selectedVoice);
      setMessage(message);
    }
  };

  return (
    <div className={`App ${theme}`}>
      <Header
        voices={voices}
        selectedVoice={selectedVoice}
        setSelectedVoice={setSelectedVoice}
        toggleTheme={toggleTheme}
        theme={theme}
      />
      <Navbar
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
        visualizationType={visualizationType}
        setVisualizationType={setVisualizationType}
      />
      <div className="main-content">
        <div className="message">{message}</div>
        
        {visualizationType === 'sorting' ? (
          <>
            <ArrayVisualizer
              array={array}
              swappingIndices={swappingIndices}
              mergingIndices={mergingIndices}
            />
            <Controls
              handleSubmitArray={handleSubmitArray}
              startAlgorithm={startAlgorithm}
              speed={speed}
              setSpeed={setSpeed}
              nextStep={nextStep}
              isRunning={isRunning}
              visualizationType={visualizationType}
            />
          </>
        ) : visualizationType === 'pathfinding' ? (
          <>
            <GridVisualizer
              grid={grid}
              onNodeClick={handleNodeClick}
              startNode={startNode}
              finishNode={finishNode}
              onMouseDown={() => setMouseIsPressed(true)}
              onMouseUp={() => setMouseIsPressed(false)}
              mouseIsPressed={mouseIsPressed}
            />
            <Controls
              startAlgorithm={startAlgorithm}
              isRunning={isRunning}
              visualizationType={visualizationType}
              handleSetStart={handleSetStart}
              handleSetFinish={handleSetFinish}
              isSettingStart={isSettingStart}
              isSettingFinish={isSettingFinish}
              clearGrid={clearGrid}
              resetGrid={resetGrid}
            />
          </>
        ) : (
          // N-Queens visualization
          <>
            <Chessboard 
              board={queensBoard} 
              onCellClick={handleCellClick}
              activeRow={activeCell?.row}
              activeCol={activeCell?.col}
              conflictCells={conflicts}
            />
            <Controls
              isRunning={isRunning}
              visualizationType={visualizationType}
              showNextSolution={showNextSolution}
              currentSolutionIndex={currentSolutionIndex}
              totalSolutions={solutions.length}
              startAlgorithm={visualizeNQueens}
              showAllSteps={showAllSteps}
              setShowAllSteps={setShowAllSteps}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;