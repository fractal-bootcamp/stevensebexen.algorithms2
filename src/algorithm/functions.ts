export function isOutOfBounds(arr: any[], i: number): boolean {
  if (arr.length === 0) return true;
  else if (i < 0 || i >= arr.length) return true;
  else return false;
}

export function isSorted(arr: number[]): boolean {
  if (arr.length === 0) return true;
  const elementIsSorted = arr.map((x, i) => {
    if (arr[i + 1] === undefined) return true;
    return arr[i] <= arr[i + 1];
  });
  const result = elementIsSorted.every(x => x === true);
  return result;
}

export function withDropped(arr: number[], i0: number): number[] {
  if (isOutOfBounds(arr, i0)) throw new Error('Out of bounds');
  return [...arr.slice(0, i0), ...arr.slice(i0 + 1)];
}

// Returns an array sunch that val has been inserted before i.
export function withInserted(arr: number[], i: number, value: number): number[] {
  if (isOutOfBounds(arr, i)) throw new Error('Out of bounds');
  return [...arr.slice(0, i), value, ...arr.slice(i)];
}

export function withSwapped(arr: number[], i0: number, i1: number): number[] {
  if (isOutOfBounds(arr, i0) || isOutOfBounds(arr, i1)) throw new Error('Out of bounds');
  return arr.with(i0, arr[i1]).with(i1, arr[i0]);
}

export function numberArrayParser(input: string): number[] {
  const parsedInput: number[] = input.split(',').map(parseFloat);
  if (parsedInput.some(x => isNaN(x))) throw new Error('Failed to parse.');
  return parsedInput;
}
