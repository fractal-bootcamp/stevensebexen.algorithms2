import { maxDepth } from "~/constants";
import { isSorted, withDropped, withInserted } from "../functions";

function _insertionSort(input: WithHistory<number[]>, depth: number): WithHistory<number[]> {
  if (depth >= maxDepth) throw new Error('Maximum recursion depth reached.');
  if (isSorted(input.value)) return ({value: input.value, history: input.history});

  const i = depth; // Current element to insert
  const j0 = input.value.findIndex(x => x > input.value[i]);
  const j1 = j0 === -1 ? depth : j0;
  const j = j1 > depth ? depth : j1; // Position to insert at

  const arr0 = withDropped(input.value, i);
  const value = withInserted(arr0, j, input.value[i]);
  const history = [...input.history, value];

  return _insertionSort({value, history}, depth + 1);
}

export function insertionSort(src: number[], depth: number = 0): WithHistory<number[]> {
  return _insertionSort({value: src, history: []}, depth);
}