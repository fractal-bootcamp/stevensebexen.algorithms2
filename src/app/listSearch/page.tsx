'use client'

import { listSearchParser } from "~/algorithm/functions"
import { binarySearch } from "~/algorithm/listSearch/binarySearch"
import { linearSearch } from "~/algorithm/listSearch/linearSearch"
import ListSearchAlgorithmBlock from "~/components/ListSearchAlgorithmBlock"

const algorithms: ListSearchAlgorithm[] = [
  {
    name: 'Linear',
    fn: linearSearch,
    description: 'Linear search is an incredibly simple search algorithm: It merely iterates over the array from left to right until a matching item is found.'
  },
  {
    name: 'Binary',
    fn: binarySearch,
    description: 'Binary search traverses a *sorted* array via midpoints. Starting in the middle of the array, it compares the value of the element at that midpoint with the search value. If the search value is greater, binary search adjusts its left-side bound to be one to the right of the current midpoint, then searches at the new midpoint. Vice versa if the search value is less than the current midpoint.'
  }
]

export default function Search() {
  return (
    <>
      <ListSearchAlgorithmBlock algorithms={algorithms} />
    </>
  )
}