import { useState } from "react";

type CounterProps = {
  label: string;
};

function Counter({ label }: CounterProps) {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <h2>{label}: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Day 1: React + TS Fundamentals</h1>
      <Counter label="Click Count" />
    </div>
  );
}