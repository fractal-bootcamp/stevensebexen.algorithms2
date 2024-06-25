import { maxDepth } from "~/constants";
import { isSorted, withDropped, withInserted } from "../functions";

function _insertionSort(input: WithHistory<number[]>, depth: number): WithHistory<number[]> {
  if (depth >= maxDepth) throw new Error('Maximum recursion depth reached.');
  if (isSorted(input.value)) return ({value: input.value, history: input.history});

  console.log(input.value);

  const i0 = depth;
  const i1 = input.value.findIndex(x => x > input.value[i0]);

  const arr0 = withDropped(input.value, i0);
  const value = i1 !== -1 ? withInserted(arr0, i1, input.value[i0]) : [...arr0, input.value[i0]];
  const history = input.history;

  return _insertionSort({value, history}, depth + 1);
}

export function insertionSort(src: number[], depth: number = 0): WithHistory<number[]> {
  return _insertionSort({value: src, history: []}, depth);
}