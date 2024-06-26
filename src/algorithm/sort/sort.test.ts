import { describe, test, expect } from 'vitest';
import { bubbleSort } from './bubbleSort';
import { selectionSort } from './selectionSort';
import { insertionSort } from './insertionSort';
import { mergeSort } from './mergeSort';
import { quickSort } from './quickSort';

const algorithms: SortAlgorithm[] = [
  {
    name: 'Bubble',
    fn: bubbleSort
  },
  {
    name: 'Selection',
    fn: selectionSort
  },
  {
    name: 'Insertion',
    fn: insertionSort
  },
  {
    name: 'Merge',
    fn: mergeSort
  },
  {
    name: 'Quicksort',
    fn: quickSort
  }
]

function testAlgorithms(name: string, input: number[], expected: number[]) {
  describe(name, () => {
    algorithms.map(algorithm => {
      test(algorithm.name, () => { 
        expect(algorithm.fn(input).value).toEqual(expected);
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