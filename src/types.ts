type WithHistory<T> = {
  value: T
  history: T[]
}

type AlgorithmWithH<T> = (value: T) => WithHistory<T>;