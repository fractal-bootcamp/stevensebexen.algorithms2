import { useState, ChangeEvent } from "react";
import { numberArrayParser } from "~/algorithm/functions";
import SortAlgorithmResultViewer from "./SortAlgorithmResultViewer";
import AlgorithmInfo from "./AlgorithmInfo";
import AlgorithmRunner from "./AlgorithmRunner";
import AlgorithmSelector from "./AlgorithmSelector";
import NavBar from "./NavBar";

interface SortAlgorithmBlockProps {
  algorithms: SortAlgorithm[];
}
export default function SortAlgorithmBlock(props: SortAlgorithmBlockProps) {
  const [currentAlgorithm, setCurrentAlgorithm] = useState<SortAlgorithm>(props.algorithms[0]);
  const [result, setResult] = useState<WithHistory<number[]> | null>(null);
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  function onAlgorithmSelected(algorithm: SortAlgorithm) {
    setCurrentAlgorithm(algorithm);
  }

  function runAlgorithm(): void {
    const algorithm = props.algorithms.find(a => a.name === currentAlgorithm.name)
    if (!algorithm) return;
    try {
      const parsedInput = numberArrayParser(input);
      const result = algorithm.fn(parsedInput);
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
        algorithms={props.algorithms} currentAlgorithm={currentAlgorithm} onAlgorithmSelected={onAlgorithmSelected} />
      <AlgorithmRunner
        placeholder="Enter a comma-separated list of numbers"
        onRun={runAlgorithm}
        onInputChanged={onInputChanged}
        value={input}
      />
      <AlgorithmInfo algorithm={currentAlgorithm} />
      {result && <SortAlgorithmResultViewer result={result} />}
      {error && <p className='text-[#e96060]'>Invalid input.</p>}
    </div>
  )
}