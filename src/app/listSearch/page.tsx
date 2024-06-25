'use client'

import { listSearchParser } from "~/algorithm/functions"
import { binarySearch } from "~/algorithm/listSearch/binarySearch"
import { linearSearch } from "~/algorithm/listSearch/linearSearch"
import ListSearchAlgorithmBlock from "~/components/ListSearchAlgorithmBlock"

const algorithms: Record<string, (input: ListSearchParams) => WithHistory<number>> = {
  'Linear': linearSearch,
  'Binary': binarySearch
}

export default function Search() {
  return (
    <>
      <ListSearchAlgorithmBlock algorithms={algorithms} />
    </>
  )
}