import { maxDepth } from "~/constants";

export function linearSearch(input: ListSearchParams, history: number[] = [], depth: number = 0): WithHistory<number> {
  if (depth >= maxDepth) throw new Error('Maximum recursion depth exceeded.');
  if (depth >= input.arr.length) return {value: -1, history};
  if (input.arr[depth] === input.searchTarget) return {value: depth, history: [...history, depth]};
  return linearSearch(input, [...history, depth], depth + 1);
}