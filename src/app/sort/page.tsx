'use client'

import { ChangeEvent, useState } from "react";
import { numberArrayParser } from "~/algorithm/functions";
import { bubbleSort } from "~/algorithm/sort/bubbleSort";
import { selectionSort } from "~/algorithm/sort/selectionSort";
import AlgorithmResultViewer from "~/components/AlgorithmResultViewer";
import AlgorithmRunner from "~/components/AlgorithmRunner";
import AlgorithmSelector from "~/components/AlgorithmSelector";
import NavBar from "~/components/NavBar";

const algorithms: Record<string, AlgorithmWithH<number[]>> = {
  'Bubble': bubbleSort,
  'Selection': selectionSort
}

export default function Sort() {
  const [currentAlgorithm, setCurrentAlgorithm] = useState<string>(Object.keys(algorithms)[0]);
  const [result, setResult] = useState<WithHistory<number[]> | null>(null);
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  function onAlgorithmSelected(algorithm: string) {
    setCurrentAlgorithm(algorithm);
  }

  function runAlgorithm(): void {
    const algorithm = Object.entries(algorithms).find(algorithm => algorithm[0] === currentAlgorithm);
    if (!algorithm) return;
    const algorithmFn = algorithm[1];
    try {
      const parsedInput = numberArrayParser(input);
      const result = algorithmFn(parsedInput);
      setResult(result);
      setError(false);
    } catch (e) {
      setError(true);
    }
  }

  function onInputChanged(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  return (
    <div className='flex flex-col gap-2'>
      <NavBar />
      <AlgorithmSelector
        algorithms={Object.entries(algorithms).map(algorithm => algorithm[0])} currentAlgorithm={currentAlgorithm} onAlgorithmSelected={onAlgorithmSelected} />
      <AlgorithmRunner
        placeholder="Enter a comma-separated list of numbers."
        onRun={runAlgorithm}
        onInputChanged={onInputChanged}
        value={input}
      />
      {result && <AlgorithmResultViewer result={result} />}
    </div>
  )
}