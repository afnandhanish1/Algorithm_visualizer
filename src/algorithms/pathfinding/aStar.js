export const aStar = (grid, startNode, finishNode) => {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    startNode.totalDistance = heuristic(startNode, finishNode);
    const openSet = [startNode];
    const closedSet = [];
  
    while (openSet.length > 0) {
      sortNodesByTotalDistance(openSet);
      const currentNode = openSet.shift();
  
      if (currentNode.isWall) continue;
      if (currentNode.distance === Infinity) return visitedNodesInOrder;
  
      currentNode.isVisited = true;
      visitedNodesInOrder.push(currentNode);
  
      if (currentNode === finishNode) return visitedNodesInOrder;
  
      const neighbors = getNeighbors(currentNode, grid);
      for (const neighbor of neighbors) {
        if (closedSet.includes(neighbor)) continue;
  
        const tentativeDistance = currentNode.distance + 1;
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        } else if (tentativeDistance >= neighbor.distance) {
          continue;
        }
  
        neighbor.distance = tentativeDistance;
        neighbor.totalDistance = neighbor.distance + heuristic(neighbor, finishNode);
        neighbor.previousNode = currentNode;
      }
  
      closedSet.push(currentNode);
    }
    return visitedNodesInOrder;
  };
  
  const heuristic = (nodeA, nodeB) => {
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
  };
  
  const sortNodesByTotalDistance = (nodes) => {
    nodes.sort((nodeA, nodeB) => nodeA.totalDistance - nodeB.totalDistance);
  };
  
  const getNeighbors = (node, grid) => {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isWall);
  };