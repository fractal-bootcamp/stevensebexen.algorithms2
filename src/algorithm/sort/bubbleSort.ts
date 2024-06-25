import { maxDepth } from '~/constants';
import { isSorted, withSwapped } from '../functions';

function bubble(arr: number[], depth: number): number[] {
  if (depth >= arr.length - 1) return arr;
  if (arr[depth+1] < arr[depth]) {
    const result = withSwapped(arr, depth, depth+1);
    return result;
  }
  return bubble(arr, depth + 1);
}

function _bubbleSort(input: WithHistory<number[]>, depth: number = 0): WithHistory<number[]> {
  if (depth >= maxDepth) throw new Error('Maximum depth reached.');
  if (isSorted(input.value)) return ({value: input.value, history: input.history});

  const value = bubble(input.value, 0);
  const history = [...input.history, value];

  return _bubbleSort({value, history}, depth + 1);
}

export function bubbleSort(src: number[]): WithHistory<number[]> {
  return _bubbleSort({value: src, history: []});
}