export const bubbleSortSteps = (arr) => {
    const steps = [];
    let n = arr.length;
  
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          array: [...arr],
          message: `Comparing ${arr[j]} and ${arr[j + 1]}`,
          swappingIndices: [j, j + 1],
        });
  
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          steps.push({
            array: [...arr],
            message: `Swapped ${arr[j + 1]} and ${arr[j]}`,
            swappingIndices: [j, j + 1],
          });
        }
      }
    }
  
    steps.push({
      array: [...arr],
      message: "Array is now sorted!",
    });
  
    return steps;
  };