import { maxDepth } from "~/constants";
import { isSorted, withDropped } from "../functions";
import { root } from "postcss";

interface QuickNode {
  value: number[];
  first: QuickNode | undefined;
  second: QuickNode | undefined;
  src: number[];
}

function getMaxDepth(node: QuickNode | undefined, max: number = 0): number {
  if (node === undefined) return max;
  return Math.max(getMaxDepth(node.first, max + 1), getMaxDepth(node.second, max + 1));
}

function renderQuickTree(node: QuickNode, depth: number): number[] {
  if (depth <= 0) return node.src;
  const first = node.first ? renderQuickTree(node.first, depth - 1) : node.src;
  const second = node.second ? renderQuickTree(node.second, depth - 1) : [];
  return [...first, ...second];
}

function generateHistory(rootNode: QuickNode): number[][] {
  const maxDepth = getMaxDepth(rootNode);
  const history = Array(maxDepth).fill(0).map((_, i) => renderQuickTree(rootNode, i));
  return history;
}

function createQuickNode(arr: number[], depth: number = 0): QuickNode {
  if (depth >= maxDepth) throw new Error('Maximum recursion depth exceeded');
  if (isSorted(arr)) return ({value: arr, first: undefined, second: undefined, src: arr});

  const pivot = arr[0];
  const src = withDropped(arr, 0);
  const srcFirst = [...src.filter(x => x <= pivot), pivot];
  const srcSecond = [...src.filter(x => x > pivot)];
  const first = createQuickNode(srcFirst, depth + 1);
  const second = createQuickNode(srcSecond, depth + 1);
  const value = [...first.value, ...second.value];

  return {value, first, second, src: arr};
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