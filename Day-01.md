# Day 01 - Counter App

## Goal

Build a simple Counter App while learning the most important React fundamentals:

- Components
- JSX
- State
- useState Hook
- Event Handling
- Re-rendering
- Functional State Updates

---

# What We Are Building

A simple counter application.

Initial UI:

```text
Counter App

Count: 0

[ Increment ]
[ Decrement ]
[ Reset ]
```

Behavior:

- Increment increases the count by 1
- Decrement decreases the count by 1
- Reset sets the count back to 0

---

# Understanding React Components

Everything in React is built using components.

A component is simply a JavaScript function that returns UI.

Example:

```jsx
function App() {
  return (
    <h1>Hello React</h1>
  );
}

export default App;
```

### What is happening here?

```jsx
function App() {
```

This creates a React Component.

```jsx
return (
  <h1>Hello React</h1>
);
```

The component returns JSX.

React renders whatever JSX is returned.

---

# Understanding JSX

JSX stands for JavaScript XML.

It allows us to write HTML-like syntax inside JavaScript.

Example:

```jsx
const element = <h1>Hello React</h1>;
```

Although it looks like HTML, it is actually JavaScript.

Behind the scenes React converts it into:

```javascript
React.createElement(
  "h1",
  null,
  "Hello React"
);
```

---

# Embedding JavaScript in JSX

Use curly braces.

Example:

```jsx
const name = "Lucifer";

function App() {
  return (
    <h1>Hello {name}</h1>
  );
}
```

Output:

```text
Hello Lucifer
```

Curly braces allow:

- Variables
- Expressions
- Function calls

Example:

```jsx
<h1>{5 + 10}</h1>
```

Output:

```text
15
```

---

# Why Normal Variables Do Not Work

Consider:

```jsx
let count = 0;

function increment() {
  count++;
}
```

React will NOT update the UI.

Why?

Because React only re-renders when state changes.

Normal variables are not tracked by React.

---

# Introducing State

State is data that can change over time.

React provides a Hook called:

```jsx
useState()
```

Import it:

```jsx
import { useState } from "react";
```

Create state:

```jsx
const [count, setCount] = useState(0);
```

---

# Breaking Down useState

```jsx
const [count, setCount] = useState(0);
```

React returns two things.

## count

Current state value.

```jsx
count
```

Initially:

```jsx
0
```

---

## setCount

Function used to update state.

```jsx
setCount()
```

Whenever setCount runs:

1. State updates
2. Component re-renders
3. UI updates

---

# Displaying State

Example:

```jsx
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <h1>Count: {count}</h1>
  );
}

export default App;
```

Output:

```text
Count: 0
```

---

# Event Handling

React uses camelCase event names.

Example:

```jsx
<button onClick={handleClick}>
  Click Me
</button>
```

Notice:

```jsx
onClick
```

NOT

```html
onclick
```

---

# Increment Button

Create a button that updates state.

```jsx
<button
  onClick={() => setCount(count + 1)}
>
  Increment
</button>
```

When clicked:

```jsx
setCount(count + 1)
```

Example:

```jsx
count = 0
```

Becomes:

```jsx
setCount(1)
```

React re-renders.

New UI:

```text
Count: 1
```

---

# Full Increment Example

```jsx
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>

      <button
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
    </div>
  );
}

export default App;
```

---

# Adding Decrement

```jsx
<button
  onClick={() => setCount(count - 1)}
>
  Decrement
</button>
```

Now users can reduce the value.

---

# Adding Reset

```jsx
<button
  onClick={() => setCount(0)}
>
  Reset
</button>
```

No matter the value:

```jsx
count = 57
```

Reset becomes:

```jsx
count = 0
```

---

# Better Practice: Separate Functions

Avoid large inline code.

Instead:

```jsx
function increment() {
  setCount(count + 1);
}

function decrement() {
  setCount(count - 1);
}

function reset() {
  setCount(0);
}
```

Usage:

```jsx
<button onClick={increment}>
  Increment
</button>
```

Benefits:

- Cleaner code
- Easier debugging
- Better readability

---

# Complete Counter App

```jsx
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  function reset() {
    setCount(0);
  }

  return (
    <div>
      <h1>Counter App</h1>

      <h2>Count: {count}</h2>

      <button onClick={increment}>
        Increment
      </button>

      <button onClick={decrement}>
        Decrement
      </button>

      <button onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default App;
```

---

# React Re-Rendering

This is the most important concept today.

When state changes:

```jsx
setCount(5);
```

React:

1. Updates state
2. Runs component again
3. Creates new Virtual DOM
4. Compares old and new Virtual DOM
5. Updates only changed elements

This process is called:

```text
Re-rendering
```

---

# Functional State Updates

Suppose:

```jsx
setCount(count + 1);
setCount(count + 1);
```

Expected:

```text
+2
```

Actual:

```text
+1
```

Why?

React batches updates.

Both statements use the same old value.

---

## Correct Solution

```jsx
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

Now:

```text
+2
```

React executes:

```jsx
prev = 0
```

First update:

```jsx
1
```

Second update:

```jsx
2
```

---

# Prevent Negative Values

Modify decrement:

```jsx
function decrement() {
  if (count > 0) {
    setCount(count - 1);
  }
}
```

Now:

```text
0
```

cannot become:

```text
-1
```

---

# Exercises

## Exercise 1

Add:

```text
+5
```

Button.

Expected:

```jsx
setCount(prev => prev + 5);
```

---

## Exercise 2

Add:

```text
-5
```

Button.

Expected:

```jsx
setCount(prev => prev - 5);
```

---

## Exercise 3

Display Even/Odd

Example:

```jsx
{
  count % 2 === 0
    ? "Even"
    : "Odd";
}
```

Output:

```text
Count is Even
```

or

```text
Count is Odd
```

---

## Exercise 4

Display Color Based on Count

Example:

```jsx
<h2
  style={{
    color:
      count > 10
        ? "green"
        : "black"
  }}
>
  Count: {count}
</h2>
```

---

# Key Takeaways

After completing Day 1 you should understand:

✅ React Components

✅ JSX

✅ useState

✅ State Management

✅ Event Handling

✅ Re-rendering

✅ Functional Updates

These concepts are the foundation of nearly every React application you will build in the future.

---

# Git Commands

Create a branch:

```bash
git checkout -b react-learning/day-01-counter
```

Commit your work:

```bash
git add .
git commit -m "Day 1 - Counter App"
git push origin react-learning/day-01-counter
```