function _binarySearch(input: ListSearchParams, l: number, r: number, history: number[] = []): WithHistory<number> {
  if (input.arr.length === 0) return ({value: -1, history: []});
  const m = Math.floor((l + r) / 2);
  const ele = input.arr[m];
  if (ele === input.searchTarget) return ({value: m, history: [...history, m]});
  if (l === r) return ({ value: -1, history: [...history, l]});
  const l0 = ele < input.searchTarget ? m + 1 : l;
  const r0 = ele > input.searchTarget ? m - 1 : r;
  return _binarySearch(input, l0, r0, [...history, m]);
}

export function binarySearch(input: ListSearchParams): WithHistory<number> {
  return _binarySearch(input, 0, input.arr.length - 1);
}