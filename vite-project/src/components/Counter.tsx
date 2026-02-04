// src/components/Counter.tsx
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  return (
    <button onClick={() => setCount(c => c + 1)} aria-label="increment counter">
      Count: {count}
    </button>
  );
}