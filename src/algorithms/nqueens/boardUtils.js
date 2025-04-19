export function createEmptyBoard(size) {
    return Array(size).fill().map(() => Array(size).fill(0));
  }
  
  export function getNextSolution(solutions, currentIndex) {
    return solutions[(currentIndex + 1) % solutions.length];
  }
  