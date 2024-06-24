export function numberArrayParser(input: string): number[] {
  const parsedInput: number[] = input.split(',').map(parseFloat);
  if (parsedInput.some(x => isNaN(x))) throw new Error('Failed to parse.');
  return parsedInput;
}