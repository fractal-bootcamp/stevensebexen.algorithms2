export function isSorted(arr: number[]) {
  const elementIsSorted = arr.map((x, i) => {
    if (arr[i + 1] === undefined) return true;
    return arr[i] <= arr[i + 1];
  });
  const result = elementIsSorted.every(x => x === true);
  return result;
}