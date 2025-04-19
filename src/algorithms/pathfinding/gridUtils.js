// gridUtils.js
export const createNode = (row, col, startPos = {row: 10, col: 5}, finishPos = {row: 10, col: 35}) => {
    return {
      row,
      col,
      isStart: row === startPos.row && col === startPos.col,
      isFinish: row === finishPos.row && col === finishPos.col,
      isWall: false,
      distance: Infinity,  // For Dijkstra's algorithm
      isVisited: false,
      previousNode: null,
      // For A* algorithm
      fScore: Infinity,
      gScore: Infinity,
      hScore: Infinity,
      // Alias for A* compatibility (totalDistance = fScore)
      totalDistance: Infinity
    };
  };
  
  export const getInitialGrid = (rows, cols, startPos, finishPos) => {
    const grid = [];
    for (let row = 0; row < rows; row++) {
      const currentRow = [];
      for (let col = 0; col < cols; col++) {
        currentRow.push(createNode(row, col, startPos, finishPos));
      }
      grid.push(currentRow);
    }
    return grid;
  };
  
  export const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    
    // Don't allow walls on start/finish nodes
    if (node.isStart || node.isFinish) {
      return newGrid;
    }
  
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };
  
  export const resetGrid = (grid, startPos, finishPos) => {
    const newGrid = [];
    for (let row = 0; row < grid.length; row++) {
      const currentRow = [];
      for (let col = 0; col < grid[0].length; col++) {
        currentRow.push(createNode(row, col, startPos, finishPos));
      }
      newGrid.push(currentRow);
    }
    return newGrid;
  };
  
  // Helper function to get all nodes
  export const getAllNodes = (grid) => {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  };
  
  // Helper function to get unvisited neighbors
  export const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = [];
    const {col, row} = node;
    
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    
    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
  };