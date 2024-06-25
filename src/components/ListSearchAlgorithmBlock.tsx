import { useState, ChangeEvent } from "react";
import { listSearchParser } from "~/algorithm/functions";
import AlgorithmRunner from "./AlgorithmRunner";
import AlgorithmSelector from "./AlgorithmSelector";
import NavBar from "./NavBar";
import ListSearchAlgorithmResultViewer from "./ListSearchAlgorithmResultViewer";

interface SortAlgorithmBlockProps {
  algorithms: Record<string, (input: ListSearchParams) => WithHistory<number>>;
}
export default function SortAlgorithmBlock(props: SortAlgorithmBlockProps) {
  const [currentAlgorithm, setCurrentAlgorithm] = useState<string>(Object.keys(props.algorithms)[0]);
  const [result, setResult] = useState<WithHistory<number> | null>(null);
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<ListSearchParams | null>(null);

  function onAlgorithmSelected(algorithm: string) {
    setCurrentAlgorithm(algorithm);
  }

  function runAlgorithm(): void {
    const algorithm = Object.entries(props.algorithms).find(algorithm => algorithm[0] === currentAlgorithm);
    if (!algorithm) return;
    const algorithmFn = algorithm[1];
    try {
      const parsedInput = listSearchParser(input);
      setParams(parsedInput);
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
        placeholder="item1, item2, item3; searchTarget"
        onRun={runAlgorithm}
        onInputChanged={onInputChanged}
        value={input}
      />
      {result && params && <ListSearchAlgorithmResultViewer result={result} params={params} />}
      {error && <p className='text-[#e96060]'>Invalid input.</p>}
    </div>
  )
}