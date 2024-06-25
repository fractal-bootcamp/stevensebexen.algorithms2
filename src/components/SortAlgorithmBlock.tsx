import { useState, ChangeEvent } from "react";
import { numberArrayParser } from "~/algorithm/functions";
import SortAlgorithmResultViewer from "./SortAlgorithmResultViewer";
import AlgorithmRunner from "./AlgorithmRunner";
import AlgorithmSelector from "./AlgorithmSelector";
import NavBar from "./NavBar";

interface SortAlgorithmBlockProps {
  algorithms: Record<string, AlgorithmWithH<number[]>>;
}
export default function SortAlgorithmBlock(props: SortAlgorithmBlockProps) {
  const [currentAlgorithm, setCurrentAlgorithm] = useState<string>(Object.keys(props.algorithms)[0]);
  const [result, setResult] = useState<WithHistory<number[]> | null>(null);
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  function onAlgorithmSelected(algorithm: string) {
    setCurrentAlgorithm(algorithm);
  }

  function runAlgorithm(): void {
    const algorithm = Object.entries(props.algorithms).find(algorithm => algorithm[0] === currentAlgorithm);
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
        algorithms={Object.entries(props.algorithms).map(algorithm => algorithm[0])} currentAlgorithm={currentAlgorithm} onAlgorithmSelected={onAlgorithmSelected} />
      <AlgorithmRunner
        placeholder="Enter a comma-separated list of numbers"
        onRun={runAlgorithm}
        onInputChanged={onInputChanged}
        value={input}
      />
      {result && <SortAlgorithmResultViewer result={result} />}
      {error && <p className='text-[#e96060]'>Invalid input.</p>}
    </div>
  )
}