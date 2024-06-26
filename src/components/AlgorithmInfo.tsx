interface AlgorithmInfoProps<S, T> {
  algorithm: MyAlgorithm<S, T>;
}
export default function AlgorithmInfo<S, T>(props: AlgorithmInfoProps<S, T>) {
  return (
    <>
      <p>{props.algorithm.description}</p>
    </>
  )
}