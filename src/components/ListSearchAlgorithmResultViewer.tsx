import { useState } from "react";

interface StepProps {
  value: number;
  searchIndex: number;
}
function Step(props: StepProps) {
  return (
    <div className='basis-16 text-center' style={{backgroundColor: props.searchIndex === props.value ? 'rgb(246, 137, 149)' : 'rgb(117, 3, 3)'}}>{props.value}</div>
  );
}

interface ListSearchAlgorithmResultViewerProps<T> {
  params: ListSearchParams
  result: WithHistory<number>;
}
export default function ListSearchAlgorithmResultViewer<T>(props: ListSearchAlgorithmResultViewerProps<T>) {
  return (
    <div className='flex flex-col gap-2'>
      <p>Input list: {props.params.arr?.join(', ')}</p>
      <p>Searching for: {props.params.searchTarget}</p>
      <p>{props.result.value === -1 ? 'Not found.' : `Found at index ${props.result.value}`}</p>
      <div className='flex gap-2'>
        {props.result.history.map((step, i) => <Step key={`${i}${step}`} value={step} searchIndex={props.result.value} />)}
      </div>
    </div>
  )
}