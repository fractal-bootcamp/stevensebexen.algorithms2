interface AlgorithmSelectorProps<T> {
  algorithms: string[];
  currentAlgorithm: string;
  onAlgorithmSelected: (algorithm: string) => void;
}
export default function AlgorithmSelector<T>(props: AlgorithmSelectorProps<T>) {
  return (
    <div className='flex gap-2'>
      {props.algorithms.map((algorithm) =>
        <button
          key={algorithm}
          type='button'
          className='basis-24 px-2'
          onClick={() => props.onAlgorithmSelected(algorithm)}
          style={{border: props.currentAlgorithm === algorithm ? 'solid white 1px' : 'none'}}
        >
          {algorithm}
        </button>
      )}
    </div>
  )
}