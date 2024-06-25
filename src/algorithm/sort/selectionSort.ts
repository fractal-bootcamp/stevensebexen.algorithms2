import { maxDepth } from '~/constants';
import { isSorted, withSwapped } from '../functions';

function getIndexMin(arr: number[], offset: number): number {
  const indices = Array(arr.length - offset).fill(0).map((_, i) => i + offset);
  const indexMin = indices.reduce((prev, curr) => arr[curr] < arr[prev] ? curr : prev);
  return indexMin;
}

function _selectionSort(input: WithHistory<number[]>, depth: number): WithHistory<number[]> {
  if (depth >= maxDepth) throw new Error('Maximum recursion depth reached.');
  if (isSorted(input.value)) return ({value: input.value, history: input.history});

  const indexMin = getIndexMin(input.value, depth);
  const value = withSwapped(input.value, depth, indexMin);
  const history = [...input.history, value];

  return _selectionSort({value, history}, depth + 1);
}

export function selectionSort(src: number[], depth: number = 0): WithHistory<number[]> {
  return _selectionSort({value: src, history: []}, depth);
}