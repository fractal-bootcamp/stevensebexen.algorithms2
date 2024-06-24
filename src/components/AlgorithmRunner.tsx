import { ChangeEvent, ChangeEventHandler, MouseEvent, useState } from "react";

interface AlgorithmRunnerProps<T> {
  placeholder: string;
  onRun: () => void;
  onInputChanged: ChangeEventHandler<HTMLInputElement>;
  value: string;
}
export default function AlgorithmRunner<T>(props: AlgorithmRunnerProps<T>) {
  return (
    <div className='flex gap-2'>
      <input className='basis-[24rem]' placeholder={props.placeholder} value={props.value} onChange={props.onInputChanged} />
      <button type='button' onClick={props.onRun}>Run</button>
    </div>
  )
}