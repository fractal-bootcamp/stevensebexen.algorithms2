'use client'

import { numberArrayParser } from "~/algorithm/functions";
import { bubbleSort } from "~/algorithm/sort/bubbleSort";
import { insertionSort } from "~/algorithm/sort/insertionSort";
import { mergeSort } from "~/algorithm/sort/mergeSort";
import { quickSort } from "~/algorithm/sort/quickSort";
import { selectionSort } from "~/algorithm/sort/selectionSort";
import SortAlgorithmBlock from "~/components/SortAlgorithmBlock";


const algorithms: SortAlgorithm[] = [
  {
    name: 'Bubble',
    fn: bubbleSort,
    description: 'Bubble sort compares every item in the array with the element to its right. If the one to the right is smaller, it will swap them. It does this for every index in the array, repeating this process until the array is sorted.'
  },
  {
    name: 'Selection',
    fn: selectionSort,
    description: 'Selection sort iterates over every position in the array, starting at the left. It selects the element with the smallest value from the entire array (ignoring the ones to the left), and swaps it into that position, building a sorted array one element at a time.'
  },
  {
    name: 'Insertion',
    fn: insertionSort,
    description: 'Insertion sort iterates over every position in the array, starting at the left. For each element, it searches for the position in the sorted list (everything to its left) that element ought to go and inserts it there, shifting the others to the right. My implementation uses a simple linear search for that search.'
  },
  {
    name: 'Merge',
    fn: mergeSort,
    description: 'Merge sort first splits an array in half recursively until every subarray contains exactly one element. It then merges the split subarrays with their neighbor, iterating over each pair of values (one value from each neighbor) and appending the minimum from among them to the resultant subarray, which is in turn merged with its neighbor in the same way until only one array remains.'
  },
  {
    name: 'Quicksort',
    fn: quickSort,
    description: 'Quicksort chooses a "pivot" (an arbitrary value from an array) and breaks the array into two parts - one part contains all elements with lesser value than the pivot, and the other contains all elements with greater value. (The pivot itself can go in either array, as long as it is on the correct end.) Any subarrays created this way which aren\'t sorted are recursively split until they are sorted. Finally, all subarrays are concatenated end-to-end. My implementation here always chooses the first element of the array as the pivot.'
  }
]

export default function Sort() {
  return (
    <SortAlgorithmBlock algorithms={algorithms} />
  )
}