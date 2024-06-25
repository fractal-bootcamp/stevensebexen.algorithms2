import { useState } from "react";

function colorInterpolateLinear(color0: Color, color1: Color, fac: number): Color {
  const [red, green, blue] = Array(3).fill(0).map((_, i) => color0[i] * (1 - fac) + color1[i] * fac);
  return [red, green, blue];
}

interface StepProps<T> {
  value: T;
  normalizedValues: NormalizedValues | undefined;
}
function Step<T>(props: StepProps<T>) {
  const color0: Color = [117, 3, 3];
  const color1: Color = [246, 137, 149];
  const colorDefault: Color = [0, 0, 0];

  function getColorByValue(value: number): Color {
    const fac = props.normalizedValues?.find(x => x[0] === value)?.[1];
    return fac !== undefined ? colorInterpolateLinear(color0, color1, fac) : colorDefault;
  }

  if (props.value instanceof Array) {
    return (
    <div className='flex gap-1'>
      {
        props.value.map((ele, i) => <div
          key={`${i}${ele}`}
          className='basis-20 text-center'
          style={{backgroundColor: `rgb(${getColorByValue(ele).join()})`}}
        >
          {String(ele)}
        </div>)
      }
    </div>
    )
  } else {
    return <p>{String(props.value)}</p>
  }
}

// Associate values with evenly-distributed numbers [0.0, 1.0] for use in colorizing.
function normalizedValues(_values: number[]): NormalizedValues {
  const values = Array.from(new Set(_values));
  const coeff = 1 / values.length;
  const normalized: NormalizedValues = values.map((x, i) => [x, coeff * i]);
  return normalized;
}

interface AlgorithmResultViewerProps<T> {
  result: WithHistory<T>
}
export default function AlgorithmResultViewer<T>(props: AlgorithmResultViewerProps<T>) {
  const [historyVisible, setHistoryVisible] = useState<boolean>(false);

  const normalized: NormalizedValues | undefined = props.result.value instanceof Array && props.result.value.every(x => typeof x === 'number')
    ? normalizedValues(props.result.value)
    : undefined;

  return (
    <>
      {<Step value={props.result.value} normalizedValues={normalized} />}
      <p className='select-none' onClick={() => setHistoryVisible(!historyVisible)}>{historyVisible ? 'v Hide steps' : '> Show steps'}</p>
      {historyVisible &&
        <div className='flex flex-col gap-2'>
          {props.result.history.map((step, i) => <Step key={i} value={step} normalizedValues={normalized} />)}
        </div>
      }
    </>
  )
}