const maxDepth = 100;

function isSorted(arr: number[]) {
  const elementIsSorted = arr.map((x, i) => {
      if (arr[i+1] === undefined) return true;
      return arr[i] <= arr[i+1];
    })
  const result = elementIsSorted.every(x => x === true);
  return result;
}

function bubble(arr: number[], depth: number): number[] {
  if (depth >= arr.length - 1) return arr;
  if (arr[depth+1] < arr[depth]) {
    const result = arr.slice(0, depth)
      .concat([arr[depth+1], arr[depth]])
      .concat(arr.slice(depth + 2));
    return result;
  }
  return bubble(arr, depth + 1);
}

function _bubbleSort(input: WithHistory<number[]>, depth: number = 0): WithHistory<number[]> {
  if (depth >= maxDepth) throw new Error('Maximum depth reached.');

  const value = bubble(input.value, 0);

  if (isSorted(value)) {
    const history = input.history;
    return ({value, history});
  }
  const history = [...input.history, value];

  return _bubbleSort({value, history}, depth + 1);
}

export const bubbleSort: AlgorithmWithH<number[]> = (value: number[]): WithHistory<number[]> => {
  return _bubbleSort({value, history: []});
}