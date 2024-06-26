type WithHistory<T> = {
  value: T
  history: T[]
}

type AlgorithmWithH<T> = (value: T) => WithHistory<T>;
type Color = [number, number, number];
type NormalizedValues = Array<[number, number]>;
type ListSearchParams = {arr: string[], searchTarget: string};