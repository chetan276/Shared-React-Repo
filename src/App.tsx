import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  function updateCounterValue(newCount: number, action: "increment" | "decrement" | "reset") {
    switch (action) {
      case "increment":
        setCount(newCount + 1);
        break;
      case "decrement":
        if (newCount > 0) {
          setCount(newCount - 1);
        }
        break;
      case "reset":
        setCount(0);
        break;
    }
  }

  return (
    <div>
      <h1>Count: {count}</h1>

      <button onClick={() => updateCounterValue(count, "increment")}>
        Increment
      </button>

      <button onClick={() => updateCounterValue(count, "decrement")}>
        Decrement
      </button>

      <button onClick={() => updateCounterValue(count, "reset")}>
        Reset
      </button>
    </div>
  );
}

export default App;