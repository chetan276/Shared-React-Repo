# Day 03 - Toggle Theme

## Goal

Build a simple Theme Toggle application while learning:

* Conditional Rendering
* Conditional Styling
* State Management
* Dynamic Class/Style Updates
* TypeScript Union Types
* Type-safe React State

This project demonstrates one of React's core principles:

> **The UI is a function of the application's state.**

---

# What We Are Building

A simple application that allows the user to switch between Light Mode and Dark Mode.

Initial UI:

```text
Current Theme: Light

[ Toggle Theme ]
```

After clicking the button:

```text
Current Theme: Dark

[ Toggle Theme ]
```

The page background and text color should update automatically whenever the theme changes.

---

# Why Theme Switching Matters

Most modern applications support multiple themes.

Examples include:

* GitHub
* YouTube
* LinkedIn
* VS Code
* ChatGPT

Although the UI looks different, the underlying idea is simple:

```text
Current State
      ↓
React Re-renders
      ↓
Updated UI
```

Instead of manually changing styles throughout the application, React updates the UI whenever the state changes.

---

# Creating Theme State

Our application only has two possible themes:

```text
light
dark
```

Create state:

```tsx
const [theme, setTheme] =
  useState<"light" | "dark">("light");
```

Initially:

```text
theme = "light"
```

---

# Understanding useState

The following line:

```tsx
const [theme, setTheme] =
  useState<"light" | "dark">("light");
```

returns two values.

## theme

Stores the current theme.

Initially:

```text
light
```

Later it may become:

```text
dark
```

---

## setTheme

A function used to update the state.

Example:

```tsx
setTheme("dark");
```

Whenever this function is called:

1. React updates the state.
2. The component renders again.
3. The UI reflects the latest state.

---

# Understanding Union Types

This project introduces a useful TypeScript feature.

```tsx
"light" | "dark"
```

This is called a **Union Type**.

It means:

```text
theme can ONLY be:

• "light"
• "dark"
```

Valid:

```tsx
setTheme("light");
```

```tsx
setTheme("dark");
```

Invalid:

```tsx
setTheme("blue");
```

TypeScript immediately reports an error because `"blue"` is not part of the allowed values.

---

# Why Not Use string?

You could write:

```tsx
const [theme, setTheme] =
  useState<string>("light");
```

However, now every string becomes valid.

For example:

```tsx
setTheme("banana");
```

TypeScript would allow it.

Using a union type prevents invalid values and makes your code safer.

---

# Creating a Toggle Function

We need to switch between two values.

Desired behavior:

```text
light → dark

dark → light
```

Implementation:

```tsx
const toggleTheme = () => {
  setTheme(
    theme === "light"
      ? "dark"
      : "light"
  );
};
```

Whenever the button is clicked, the current theme changes to the opposite value.

---

# Understanding the Ternary Operator

The toggle function uses a ternary operator.

Syntax:

```tsx
condition
  ? valueIfTrue
  : valueIfFalse
```

Example:

```tsx
const message =
  age >= 18
    ? "Adult"
    : "Minor";
```

Equivalent using an if statement:

```tsx
let message;

if (age >= 18) {
  message = "Adult";
} else {
  message = "Minor";
}
```

The ternary operator is simply a shorter way to write conditional expressions.

---

# Applying the Ternary to Theme Switching

Current state:

```text
theme = "light"
```

React evaluates:

```tsx
theme === "light"
```

Result:

```tsx
setTheme("dark");
```

If the current theme is already dark:

```text
theme = "dark"
```

React executes:

```tsx
setTheme("light");
```

This allows a single function to switch back and forth indefinitely.

---

# Displaying the Current Theme

The state can be displayed directly inside JSX.

```tsx
<h1>
  Current Theme: {theme}
</h1>
```

If the state changes:

```text
light
```

to

```text
dark
```

the displayed text automatically updates.

---

# Event Handling

Create a button:

```tsx
<button onClick={toggleTheme}>
  Toggle Theme
</button>
```

Flow:

```text
User Clicks Button
        ↓
toggleTheme()
        ↓
setTheme(...)
        ↓
State Updates
        ↓
React Re-renders
        ↓
Updated UI
```

---

# First Working Version

```tsx
import { useState } from "react";

function App() {
  const [theme, setTheme] =
    useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme(
      theme === "light"
        ? "dark"
        : "light"
    );
  };

  return (
    <div>
      <h1>Current Theme: {theme}</h1>

      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
}

export default App;
```

At this stage, only the displayed text changes.

The page appearance remains the same.

---

# Conditional Styling

One of React's strengths is applying styles based on state.

Example:

```tsx
const backgroundColor =
  theme === "light"
    ? "#ffffff"
    : "#1f1f1f";
```

The value changes automatically whenever the theme changes.

---

# Creating a Style Object

React accepts JavaScript objects for inline styles.

Example:

```tsx
const pageStyle = {
  backgroundColor:
    theme === "light"
      ? "#ffffff"
      : "#1f1f1f",

  color:
    theme === "light"
      ? "#000000"
      : "#ffffff",

  minHeight: "100vh",
  padding: "20px"
};
```

This object contains all the styles for the page.

---

# Understanding React Inline Styles

HTML:

```html
<div style="color:red">
```

React:

```tsx
<div style={{ color: "red" }}>
```

Notice:

Outer braces:

```tsx
{}
```

tell JSX that JavaScript is being used.

Inner braces:

```tsx
{
  color: "red"
}
```

represent a JavaScript object.

Unlike CSS, property names use camelCase.

Examples:

```css
background-color
```

becomes

```tsx
backgroundColor
```

---

# Applying the Style

Attach the object:

```tsx
<div style={pageStyle}>
```

Whenever the theme changes, React recalculates the object and updates only the necessary DOM styles.

---

# Complete Application

```tsx
import { useState } from "react";

type Theme = "light" | "dark";

function App() {
  const [theme, setTheme] =
    useState<Theme>("light");

  const toggleTheme = () => {
    setTheme(
      theme === "light"
        ? "dark"
        : "light"
    );
  };

  const pageStyle = {
    backgroundColor:
      theme === "light"
        ? "#ffffff"
        : "#1f1f1f",

    color:
      theme === "light"
        ? "#000000"
        : "#ffffff",

    minHeight: "100vh",
    padding: "20px"
  };

  return (
    <div style={pageStyle}>
      <h1>Current Theme: {theme}</h1>

      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
}

export default App;
```

---

# Creating a Custom Type

Instead of repeatedly writing:

```tsx
"light" | "dark"
```

create a reusable type.

```tsx
type Theme =
  | "light"
  | "dark";
```

Now the state becomes:

```tsx
const [theme, setTheme] =
  useState<Theme>("light");
```

Benefits:

* Cleaner code
* Easier to reuse
* Easier to extend later

---

# Derived Values

Notice that only one value is stored in state:

```text
theme
```

Everything else is calculated from it.

Examples:

```text
Background Color

Text Color

Displayed Theme Name
```

These values are **derived** from the current theme.

React encourages storing the **minimum amount of state** and computing everything else when rendering.

---

# React Rendering Flow

The complete lifecycle for this application is:

```text
User Clicks Button
        ↓
toggleTheme()
        ↓
setTheme()
        ↓
State Changes
        ↓
Component Re-renders
        ↓
Styles Recalculate
        ↓
Updated UI Appears
```

Notice that we never directly manipulate the DOM.

Instead, we update the state, and React takes care of updating the interface.

---

# React Concepts Learned

## State Management

Application data is stored in React state.

---

## Event Handling

User interactions trigger functions through event handlers.

---

## Conditional Rendering

The UI changes depending on the current state.

---

## Conditional Styling

Styles are calculated based on state rather than hardcoded.

---

## State-Driven UI

Instead of manually updating the page, React automatically updates the UI whenever the state changes.

---

# TypeScript Concepts Learned

## Union Types

Restrict variables to a fixed set of values.

---

## Custom Types

Create reusable type definitions for better readability.

---

## Type-safe State

Prevent invalid state values during development.

---

# Key Takeaways

After completing Day 03 you should understand:

* How React uses state to control the appearance of the UI.
* How to toggle between multiple state values.
* How conditional rendering works.
* How conditional styling works.
* Why union types improve type safety.
* How React inline styles differ from regular CSS.
* Why React applications store the minimum possible state and derive everything else from it.

These concepts are used extensively in production applications for theme switching, feature flags, user permissions, responsive layouts, and dynamic interfaces.
