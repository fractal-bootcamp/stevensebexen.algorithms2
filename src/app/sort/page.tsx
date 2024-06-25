'use client'

import { numberArrayParser } from "~/algorithm/functions";
import { bubbleSort } from "~/algorithm/sort/bubbleSort";
import { insertionSort } from "~/algorithm/sort/insertionSort";
import { mergeSort } from "~/algorithm/sort/mergeSort";
import { quickSort } from "~/algorithm/sort/quickSort";
import { selectionSort } from "~/algorithm/sort/selectionSort";
import SortAlgorithmBlock from "~/components/SortAlgorithmBlock";

const algorithms: Record<string, AlgorithmWithH<number[]>> = {
  'Bubble': bubbleSort,
  'Selection': selectionSort,
  'Insertion': insertionSort,
  'Merge': mergeSort,
  'Quicksort': quickSort
}

export default function Sort() {
  return (
    <SortAlgorithmBlock algorithms={algorithms} />
  )
}