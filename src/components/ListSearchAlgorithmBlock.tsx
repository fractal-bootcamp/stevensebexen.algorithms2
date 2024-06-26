import { useState, ChangeEvent } from "react";
import { listSearchParser } from "~/algorithm/functions";
import AlgorithmInfo from './AlgorithmInfo';
import AlgorithmRunner from "./AlgorithmRunner";
import AlgorithmSelector from "./AlgorithmSelector";
import NavBar from "./NavBar";
import ListSearchAlgorithmResultViewer from "./ListSearchAlgorithmResultViewer";

interface ListSearchAlgorithmBlockProps {
  algorithms: ListSearchAlgorithm[];
}
export default function ListSearchAlgorithmBlock(props: ListSearchAlgorithmBlockProps) {
  const [currentAlgorithm, setCurrentAlgorithm] = useState<ListSearchAlgorithm>(props.algorithms[0]);
  const [result, setResult] = useState<WithHistory<number> | null>(null);
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [params, setParams] = useState<ListSearchParams | null>(null);

  function onAlgorithmSelected(algorithm: ListSearchAlgorithm) {
    setCurrentAlgorithm(algorithm);
  }

  function runAlgorithm(): void {
    const algorithm = props.algorithms.find(a => a.name === currentAlgorithm.name)
    if (!algorithm) return;
    try {
      const parsedInput = listSearchParser(input);
      setParams(parsedInput);
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
        placeholder="item1, item2, item3; searchTarget"
        onRun={runAlgorithm}
        onInputChanged={onInputChanged}
        value={input}
      />
      <AlgorithmInfo algorithm={currentAlgorithm} />
      {result && params && <ListSearchAlgorithmResultViewer result={result} params={params} />}
      {error && <p className='text-[#e96060]'>Invalid input.</p>}
    </div>
  )
}