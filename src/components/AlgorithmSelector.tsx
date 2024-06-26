interface AlgorithmSelectorProps<S, T> {
  algorithms: Array<MyAlgorithm<S, T>>
  currentAlgorithm: MyAlgorithm<S, T>;
  onAlgorithmSelected: (algorithm: MyAlgorithm<S, T>) => void;
}
export default function AlgorithmSelector<S, T>(props: AlgorithmSelectorProps<S, T>) {
  return (
    <div className='flex gap-2'>
      {props.algorithms.map((algorithm) =>
        <button
          key={algorithm.name}
          type='button'
          className='basis-24 px-2'
          onClick={() => props.onAlgorithmSelected(algorithm)}
          style={{border: props.currentAlgorithm.name === algorithm.name ? 'solid white 1px' : 'none'}}
        >
          {algorithm.name}
        </button>
      )}
    </div>
  )
}