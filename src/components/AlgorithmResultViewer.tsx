import { useState } from "react";

interface AlgorithmResultViewerProps<T> {
  result: WithHistory<T>
}
export default function AlgorithmResultViewer<T>(props: AlgorithmResultViewerProps<T>) {
  const [historyVisible, setHistoryVisible] = useState<boolean>(false);

  function renderValue(value: T) {
    if (value instanceof Array) {
      return (
      <div className='flex gap-1'>
        {
          value.map(ele => <div className='basis-20 border border-[#aaaaaa] text-center'>{String(ele)}</div>)
        }
      </div>
      )
    } else {
      return <p>{String(value)}</p>
    }
  }

  return (
    <>
      {renderValue(props.result.value)}
      <p className='select-none' onClick={() => setHistoryVisible(!historyVisible)}>{historyVisible ? 'v Hide steps' : '> Show steps'}</p>
      {historyVisible &&
        <div className='flex flex-col gap-2'>
          {props.result.history.map(renderValue)}
        </div>
      }
    </>
  )
}