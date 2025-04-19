export const mergeSortSteps = (arr) => {
    const steps = [];
  
    const merge = (left, right, parentArray = []) => {
      let result = [];
      let i = 0, j = 0;
  
      while (i < left.length && j < right.length) {
        steps.push({
          array: [...parentArray, ...left, ...right],
          message: `Comparing ${left[i]} and ${right[j]}`,
          mergingIndices: [i, left.length + j],
        });
  
        if (left[i] < right[j]) {
          result.push(left[i++]);
        } else {
          result.push(right[j++]);
        }
      }
  
      return result.concat(left.slice(i)).concat(right.slice(j));
    };
  
    const sort = (arr, depth = 0, parentArray = []) => {
      if (arr.length <= 1) {
        steps.push({
          array: [...parentArray, ...arr],
          message: `Single element array: [${arr}]`,
        });
        return arr;
      }
  
      const mid = Math.floor(arr.length / 2);
      const left = arr.slice(0, mid);
      const right = arr.slice(mid);
  
      steps.push({
        array: [...parentArray, ...left, ...right],
        message: `Split into left: [${left}] and right: [${right}]`,
        mergingIndices: Array.from({ length: left.length + right.length }, (_, i) => i),
      });
  
      return merge(
        sort(left, depth + 1, [...parentArray, ...right]),
        sort(right, depth + 1, [...parentArray, ...left]),
        parentArray
      );
    };
  
    steps.push({
      array: [...arr],
      message: `Starting Merge Sort on array: [${arr}]`,
    });
  
    sort(arr);
    return steps;
  };