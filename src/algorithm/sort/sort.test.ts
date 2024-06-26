import { describe, test, expect } from 'vitest';
import { bubbleSort } from './bubbleSort';
import { selectionSort } from './selectionSort';
import { insertionSort } from './insertionSort';
import { mergeSort } from './mergeSort';
import { quickSort } from './quickSort';

const algorithms: Record<string, AlgorithmWithH<number[]>>  = {
  'Bubble': bubbleSort,
  'Selection': selectionSort,
  'Insertion': insertionSort,
  'Merge': mergeSort,
  'Quicksort': quickSort
};

function testAlgorithms(name: string, input: number[], expected: number[]) {
  describe(name, () => {
    Object.entries(algorithms).map(algorithm => {
      test(algorithm[0], () => { 
        expect(algorithm[1](input).value).toEqual(expected);
      });
    });
  });
}

testAlgorithms('Empty array', [], []);
testAlgorithms('Weird case that came up', [9, 2, -7, 4, -3], [-7, -3, 2, 4, 9]);
testAlgorithms('Sorted array', [-3, 1, 2, 3, 6, 7, 8], [-3, 1, 2, 3, 6, 7, 8]);
testAlgorithms('Unsorted array', [5, -3, 0, -2, 1, 7, 9, -5], [-5, -3, -2, 0, 1, 5, 7, 9]);
testAlgorithms('Array with dupes', [0, 0, 2, 2, 0, -2, -2, 0, 2, 1, -1, 0], [-2, -2, -1, 0, 0, 0, 0, 0, 1, 2, 2, 2]);
testAlgorithms('Single element array', [0], [0]);