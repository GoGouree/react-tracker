import { useState, useEffect } from "react";
import Counter from "./components/Counter";
import Timer from "./components/Timer";
import LoginForm from "./components/LoginForm";
import UserCardList from "./components/UserCardList";

function App() {
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
      <h1>Day 4 Practice</h1>

      <Counter />

      <Timer />

      <hr />

      <h2>Login</h2>
      <LoginForm />

      <hr />
      <UserCardList />
    </div>
  );
}

export default App;