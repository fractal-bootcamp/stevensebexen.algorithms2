type WithHistory<T> = {
  value: T
  history: T[]
}

type Color = [number, number, number];
type NormalizedValues = Array<[number, number]>;
type ListSearchParams = {arr: string[], searchTarget: string};

type MyAlgorithm<S, T> = {
  name: string;
  fn: (input: S) => WithHistory<T>;
  description?: string;
}

type ListSearchAlgorithm = MyAlgorithm<ListSearchParams, number>
type SortAlgorithm = MyAlgorithm<number[], number[]>