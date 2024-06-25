import { describe, expect, test } from "vitest";
import { isOutOfBounds, isSorted, numberArrayParser, withDropped, withInserted, withSwapped } from "./functions";

describe('isSorted', () => {
  test('Sorted array', () => {
    const input = [-9, -5, 0, 0, 2, 9];
    const expected = true;
    const result = isSorted(input);

    expect(result).toBe(expected);
  });

  test('Unsorted array', () => {
    const input = [0, 9, -2, 5, -3];
    const expected = false;
    const result = isSorted(input);

    expect(result).toBe(expected);
  });

  test('Empty array', () => {
    const input: number[] = [];
    const expected = true;
    const result = isSorted(input);

    expect(result).toBe(expected);
  });

  test('Single element array', () => {
    const input = [5];
    const expected = true;
    const result = isSorted(input);

    expect(result).toBe(expected);
  });

  test('Array with only duplicate values', () => {
    const input = [3, 3, 3, 3, 3];
    const expected = true;
    const result = isSorted(input);

    expect(result).toBe(expected);
  });
});

describe('isOutOfBounds', () => {
  test('In bounds', () => {
    const arr = [1, 2, 3];
    const i = 1;
    const expected = false;
    const result = isOutOfBounds(arr, i);

    expect(result).toBe(expected);
  });

  test('i = 0', () => {
    const arr = [1, 2, 3];
    const i = 0;
    const expected = false;
    const result = isOutOfBounds(arr, i);

    expect(result).toBe(expected);
  });

  test('i = arr.length - 1', () => {
    const arr = [1, 2, 3];
    const i = arr.length - 1;
    const expected = false;
    const result = isOutOfBounds(arr, i);

    expect(result).toBe(expected);
  });

  test('Empty array', () => {
    const arr: number[] = [];
    const i = 0;
    const expected = true;
    const result = isOutOfBounds(arr, i)

    expect(result).toBe(expected);
  });

  test ('Out of bounds (low)', () => {
    const arr = [1, 2, 3];
    const i = -1;
    const expected = true;
    const result=  isOutOfBounds(arr, i);

    expect(result).toBe(expected);
  });

  test ('Out of bounds (high)', () => {
    const arr = [1, 2, 3];
    const i = arr.length;
    const expected = true;
    const result=  isOutOfBounds(arr, i);

    expect(result).toBe(expected);
  });
});

describe('withSwapped', () => {
  test('Basic case', () => {
    const arr = [1, 2, 3, 4, 5];
    const [i0, i1] = [1, 3];
    const expected = [1, 4, 3, 2, 5];
    const result = withSwapped(arr, i0, i1);

    expect(result).toEqual(expected);
  });

  test('Swap with self', () => {
    const arr = [1, 2, 3, 4, 5];
    const [i0, i1] = [1, 1];
    const expected = [1, 2, 3, 4, 5];
    const result = withSwapped(arr, i0, i1);

    expect(result).toEqual(expected);
  });

  test('Out of bounds swap', () => {
    const arr = [1, 2, 3, 4, 5];
    const [i0, i1] = [1, 6];
    const throws = () => withSwapped(arr, i0, i1);

    expect(throws).toThrowError();
  });
});

describe('numberArrayParser', () => {
  test('Basic case', () => {
    const input = '1,2,3,4,5';
    const expected = [1, 2, 3, 4, 5];
    const result = numberArrayParser(input);

    expect(result).toEqual(expected);
  });

  test('One number', () => {
    const input = '-5.3';
    const expected = [-5.3];
    const result = numberArrayParser(input);

    expect(result).toEqual(expected);
  });

  test('Whitespace', () => {
    const input = '   1   , -2  , 0.5';
    const expected = [1, -2, 0.5];
    const result = numberArrayParser(input);

    expect(result).toEqual(expected);
  });

  test('Empty', () => {
    const input = '';
    const throws = () => numberArrayParser(input);

    expect(throws).toThrowError();
  });

  test('Empty with commas', () => {
    const input = ', ,    , ,';
    const throws = () => numberArrayParser(input);

    expect(throws).toThrowError();
  });

  test('Empty with one number', () => {
    const input = ', ,  1, ';
    const throws = () => numberArrayParser(input);

    expect(throws).toThrowError();
  });

  test('Not numbers', () => {
    const input = 'I like dragons.';
    const throws = () => numberArrayParser(input);

    expect(throws).toThrowError();
  });
});

describe('withDropped', () => {
  test('Basic case'), () => {
    const arr = [1, 2, 3];
    const i = 1;
    const expected = [1, 3];
    const result = withDropped(arr, i);

    expect(result).toEqual(expected);
  }

  test('One element'), () => {
    const arr = [1];
    const i = 0;
    const expected: number[] = [];
    const result = withDropped(arr, i);

    expect(result).toEqual(expected);
  }

  test('Out of bounds'), () => {
    const arr = [1, 2, 3];
    const i = 4;
    const throws = () => withDropped(arr, i);

    expect(throws).toThrowError();
  }
});

describe('withInserted', () => {
  test('Basic case', () => {
    const arr = [1, 2, 3];
    const i = 1;
    const value = 4;
    const expected = [1, 4, 2, 3];
    const result = withInserted(arr, i, value);

    expect(result).toEqual(expected);
  });

  test('Empty array', () => {
    const arr: number[] = [];
    const i = 0;
    const value = 4;
    const throws = () => withInserted(arr, i, value);

    expect(throws).toThrowError();
  });

  test('Out of bounds', () => {
    const arr = [1, 2, 3];
    const i = 4;
    const value = 4;
    const throws = () => withInserted(arr, i, value);

    expect(throws).toThrowError();
  });

  test('i = 0', () => {
    const arr = [1, 2, 3];
    const i = 0;
    const value = 4;
    const expected = [4, 1, 2, 3];
    const result = withInserted(arr, i, value);

    expect(result).toEqual(expected);
  });

  test('i = arr.length - 1', () => {
    const arr = [1, 2, 3];
    const i = arr.length - 1;
    const value = 4;
    const expected = [1, 2, 4, 3];
    const result = withInserted(arr, i, value);

    expect(result).toEqual(expected);
  });
});