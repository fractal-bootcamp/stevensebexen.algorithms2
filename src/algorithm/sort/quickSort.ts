import { maxDepth } from "~/constants";
import { isSorted, withDropped } from "../functions";

interface QuickNode {
  value: number[];
  first: QuickNode | undefined;
  second: QuickNode | undefined;
  srcFirst: number[];
  srcSecond: number[];
}

function generateHistory(rootNode: QuickNode | undefined, history: number[][] = []): number[][] {
  return [];
}

function createQuickNode(arr: number[], depth: number = 0): QuickNode {
  if (depth >= maxDepth) throw new Error('Maximum recursion depth exceeded');
  if (isSorted(arr)) return ({value: arr, first: undefined, second: undefined, srcFirst: arr, srcSecond: []});

  const pivot = arr[0];
  const src = withDropped(arr, 0);
  const srcFirst = [...src.filter(x => x <= pivot), pivot];
  const srcSecond = [...src.filter(x => x > pivot)];
  const first = createQuickNode(srcFirst, depth + 1);
  const second = createQuickNode(srcSecond, depth + 1);
  const value = [...first.value, ...second.value];

  return {value, first, second, srcFirst, srcSecond};
}

function _quickSort(input: WithHistory<number[]>): WithHistory<number[]> {
  const rootNode = createQuickNode(input.value);
  console.log(rootNode);

  const value = rootNode.value;
  const history = generateHistory(rootNode);

  return {value, history};
}

export function quickSort(src: number[]): WithHistory<number[]> {
  return _quickSort({value: src, history: []});
}