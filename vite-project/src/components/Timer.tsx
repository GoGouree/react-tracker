// src/components/Timer.tsx
import { useState, useEffect } from 'react';

export default function Timer() {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return <h2>Timer: {seconds} seconds</h2>;
}