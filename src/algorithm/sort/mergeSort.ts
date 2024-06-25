import { maxDepth } from "~/constants";
import { isSorted } from "../functions";

interface MergeNode {
  value: number[];
  first: MergeNode | undefined;
  second: MergeNode | undefined;
  srcFirst: number[];
  srcSecond: number[];
}

function renderTree(node: MergeNode, depth: number): number[] {
  if (depth <= 0) return node.value;
  const first = node.first ? renderTree(node.first, depth - 1) : node.srcFirst;
  const second = node.second ? renderTree(node.second, depth - 1) : node.srcSecond;
  return [...first, ...second];
}

function generateHistory(rootNode: MergeNode): number[][] {
  const maxDepth = Math.ceil(Math.log2(rootNode.value.length));
  const history = Array(maxDepth)
    .fill(0)
    .map((_, i) => renderTree(rootNode, i))
    .toReversed();
  
    return history;
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
  const m = Math.floor((arr.length + 1) / 2);
  const srcFirst = arr.slice(0, m);
  const srcSecond = arr.slice(m);
  const first = srcFirst.length === 1 ? undefined : createMergeNode(srcFirst);
  const second = srcSecond.length === 1 ? undefined : createMergeNode(srcSecond);
  // Merge either the sorted subarrays, or the single-element subarrays we temporarily created.
  const value = merge(first?.value || srcFirst, second?.value || srcSecond);

  return {value, first, second, srcFirst, srcSecond};
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