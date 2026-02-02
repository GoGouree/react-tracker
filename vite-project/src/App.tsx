import { useState, useEffect } from "react";

function App() {
  // Counter state
  const [count, setCount] = useState(0);

  // Timer state
  const [seconds, setSeconds] = useState(0);

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup when App unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Day 2 Practice</h1>

      {/* Counter */}
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>

      {/* Timer */}
      <h2>Timer: {seconds} seconds</h2>
    </div>
  );
}

export default App;