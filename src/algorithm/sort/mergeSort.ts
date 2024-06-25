import { maxDepth } from "~/constants";
import { isSorted } from "../functions";

interface MergeNode {
  value: number[];
  first: MergeNode | null;
  second: MergeNode | null;
  src: number[];
}

function generateHistory(rootNode: MergeNode): number[][] {
  return [];
}

function merge(a: number[], b: number[], i: number = 0, j: number = 0, accumulator: number[] = []): number[] {
  if (i >= a.length && j >= b.length) return accumulator;

  const x = a[i];
  const y = b[j];

  if (x !== undefined && y === undefined) return merge(a, b, i + 1, j, accumulator.concat(x));
  if (y !== undefined && x === undefined) return merge(a, b, i, j + 1, accumulator.concat(y));
  
  if (x < y) return merge(a, b, i + 1, j, accumulator.concat(x));
  else return merge(a, b, i, j + 1, accumulator.concat(y));
}

function createMergeNode(arr: number[]): MergeNode {
  const src = [...arr];
  const m = Math.floor((arr.length + 1) / 2);
  const firstArr = arr.slice(0, m);
  const secondArr = arr.slice(m);
  const first = firstArr.length === 1 ? null : createMergeNode(firstArr);
  const second = secondArr.length === 1 ? null : createMergeNode(secondArr);
  // Merge either the sorted subarrays, or the single-element subarrays we temporarily created.
  const value = merge(first?.value || firstArr, second?.value || secondArr);

  return {value, first, second, src};
}

function _mergeSort(input: WithHistory<number[]>, depth: number = 0): WithHistory<number[]> {
  if (depth >= maxDepth) throw new Error('Maximum recursion depth exceeded.');
  if (isSorted(input.value)) return ({value: input.value, history: input.history});
  
  const rootNode = createMergeNode(input.value);
  console.log(rootNode);
  const value = rootNode.value;
  const history = generateHistory(rootNode);

  return ({value, history});
}

export function mergeSort(src: number[]) {
  return _mergeSort({value: src, history: []});
}