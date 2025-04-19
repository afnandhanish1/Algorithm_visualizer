/**
 * Creates an empty n x n board
 * @param {number} n - board size
 * @returns {number[][]} empty board
 */
function createEmptyBoard(n) {
    return Array(n).fill().map(() => Array(n).fill(0));
  }
  
  /**
   * Returns solving steps with animation details
   * @param {number} n - The size of the chessboard (n x n)
   * @returns {Object[]} Array of step objects with animation details
   */
  export function solveNQueensWithSteps(n) {
    const steps = [];
    const board = createEmptyBoard(n);
    let queensPlaced = 0;
  
    function isSafe(row, col) {
      // Check column
      for (let i = 0; i < row; i++) {
        if (board[i][col]) return false;
      }
      
      // Check upper-left diagonal
      for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j]) return false;
      }
      
      // Check upper-right diagonal
      for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
        if (board[i][j]) return false;
      }
      
      return true;
    }
  
    function backtrack(row) {
      if (row === n) {
        steps.push({
          type: 'solution',
          board: board.map(row => [...row]),
          message: `Found a valid solution with ${n} queens!`,
          isComplete: true,
          queensPlaced: n
        });
        return;
      }
      
      for (let col = 0; col < n; col++) {
        if (isSafe(row, col)) {
          // Record placement attempt
          steps.push({
            type: 'try',
            row,
            col,
            board: board.map(row => [...row]),
            message: `Attempting to place queen at (${row}, ${col})`,
            queensPlaced
          });
          
          board[row][col] = 1;
          queensPlaced++;
          
          // Record successful placement
          steps.push({
            type: 'place',
            row,
            col,
            board: board.map(row => [...row]),
            message: `Placed queen at (${row}, ${col}) (${queensPlaced}/${n})`,
            queensPlaced
          });
          
          backtrack(row + 1);
          
          // Record backtracking
          steps.push({
            type: 'remove',
            row,
            col,
            board: board.map(row => [...row]),
            message: `Removing queen from (${row}, ${col}) to backtrack`,
            queensPlaced: queensPlaced - 1
          });
          
          board[row][col] = 0;
          queensPlaced--;
        } else {
          // Record failed placement attempt
          steps.push({
            type: 'conflict',
            row,
            col,
            board: board.map(row => [...row]),
            message: `Conflict at (${row}, ${col}), trying next position`,
            queensPlaced
          });
        }
      }
    }
  
    // Initial message
    steps.push({
      type: 'start',
      board: board.map(row => [...row]),
      message: `Starting ${n}-Queens solver...`,
      queensPlaced: 0
    });
  
    backtrack(0);
    
    // Final message
    if (steps.some(step => step.type === 'solution')) {
      steps.push({
        type: 'end',
        board: board.map(row => [...row]),
        message: 'Finished finding all solutions!',
        queensPlaced: 0
      });
    } else {
      steps.push({
        type: 'end',
        board: board.map(row => [...row]),
        message: 'No solutions found for this configuration',
        queensPlaced: 0
      });
    }
  
    return steps;
  }
  
  /**
   * Returns all solutions without steps (for quick display)
   * @param {number} n - The size of the chessboard (n x n)
   * @returns {number[][][]} Array of solution boards
   */
  export function getAllSolutions(n) {
    const solutions = [];
    const board = createEmptyBoard(n);
    
    function isSafe(row, col) {
      // Check column
      for (let i = 0; i < row; i++) {
        if (board[i][col]) return false;
      }
      
      // Check upper-left diagonal
      for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j]) return false;
      }
      
      // Check upper-right diagonal
      for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
        if (board[i][j]) return false;
      }
      
      return true;
    }
  
    function backtrack(row) {
      if (row === n) {
        solutions.push(board.map(row => [...row]));
        return;
      }
      
      for (let col = 0; col < n; col++) {
        if (isSafe(row, col)) {
          board[row][col] = 1;
          backtrack(row + 1);
          board[row][col] = 0;
        }
      }
    }
  
    backtrack(0);
    return solutions;
  }
  
  /**
   * Simple solver that returns the first solution found
   * @param {number} n - The size of the chessboard (n x n)
   * @returns {number[][]} The first solution board found
   */
  export function solveNQueens(n) {
    const board = createEmptyBoard(n);
    
    function isSafe(row, col) {
      // Check column
      for (let i = 0; i < row; i++) {
        if (board[i][col]) return false;
      }
      
      // Check diagonals
      for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j]) return false;
      }
      for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
        if (board[i][j]) return false;
      }
      
      return true;
    }
  
    function backtrack(row) {
      if (row === n) {
        return board.map(row => [...row]);
      }
      
      for (let col = 0; col < n; col++) {
        if (isSafe(row, col)) {
          board[row][col] = 1;
          const result = backtrack(row + 1);
          if (result) return result;
          board[row][col] = 0;
        }
      }
      
      return null;
    }
  
    return backtrack(0);
  }