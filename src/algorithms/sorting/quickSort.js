export const quickSortSteps = (arr) => {
    const steps = [];
  
    const partition = (low, high) => {
      const pivot = arr[high];
      let i = low - 1;
  
      for (let j = low; j < high; j++) {
        steps.push({
          array: [...arr],
          message: `Comparing ${arr[j]} and pivot ${pivot}`,
          swappingIndices: [j, high],
        });
  
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          steps.push({
            array: [...arr],
            message: `Moved ${arr[j]} to position ${i}`,
            swappingIndices: [i, j],
          });
        }
      }
  
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      steps.push({
        array: [...arr],
        message: `Placed pivot ${arr[i + 1]} in correct position`,
        swappingIndices: [i + 1, high],
      });
      return i + 1;
    };
  
    const sort = (low, high) => {
      if (low < high) {
        const pi = partition(low, high);
        sort(low, pi - 1);
        sort(pi + 1, high);
      }
    };
  
    steps.push({
      array: [...arr],
      message: "Starting Quick Sort",
    });
  
    sort(0, arr.length - 1);
  
    steps.push({
      array: [...arr],
      message: "Array is now sorted!",
    });
  
    return steps;
  };