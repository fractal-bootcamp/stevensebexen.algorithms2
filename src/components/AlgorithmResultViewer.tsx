import { useState } from "react";

interface AlgorithmResultViewerProps<T> {
  result: WithHistory<T>
}
export default function AlgorithmResultViewer<T>(props: AlgorithmResultViewerProps<T>) {
  const [historyVisible, setHistoryVisible] = useState<boolean>(false);

  function Step(props: {value: T}) {
    if (props.value instanceof Array) {
      return (
      <div className='flex gap-1'>
        {
          props.value.map((ele, i) => <div key={`${i}${ele}`} className='basis-20 border border-[#aaaaaa] text-center'>{String(ele)}</div>)
        }
      </div>
      )
    } else {
      return <p>{String(props.value)}</p>
    }
  }

  return (
    <>
      {<Step value={props.result.value} />}
      <p className='select-none' onClick={() => setHistoryVisible(!historyVisible)}>{historyVisible ? 'v Hide steps' : '> Show steps'}</p>
      {historyVisible &&
        <div className='flex flex-col gap-2'>
          {props.result.history.map((step, i) => <Step key={i} value={step} />)}
        </div>
      }
    </>
  )
}