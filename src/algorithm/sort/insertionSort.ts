import { maxDepth } from '~/constants';

function getIndexMin(arr: number[]): number {
  const indices = Array(arr.length).fill(0).map((_, i) => i);
  const indexMin = indices.reduce((prev, curr) => arr[curr] < arr[prev] ? curr : prev);
  return indexMin;
}

function _insertionSort(input: WithHistory<number[]>, src: number[], depth: number): WithHistory<number[]> {
  if (depth >= maxDepth) throw new Error('Maximum recursion depth reached.');
  if (src.length === 0) return ({value: input.value, history: input.history});

  const indexMin = getIndexMin(src);
  const value = [...input.value, src[indexMin]];
  const src0 = [...src.slice(0, indexMin), ...src.slice(indexMin + 1)];
  const history = [...input.history, value];

  return _insertionSort({value, history}, src0, depth + 1);
}

export function insertionSort(src: number[], depth: number = 0): WithHistory<number[]> {
  return _insertionSort({value: [], history: []}, src, depth);
}