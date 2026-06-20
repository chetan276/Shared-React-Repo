# Day 02 - Character Counter

## Goal

Build a Character Counter application while learning:

* Controlled Components
* State Updates
* Event Handling in React
* TypeScript Event Types
* Derived State
* String Manipulation

This project introduces one of the most important concepts in React: **controlled inputs**.

---

# What We Are Building

A text analyzer that updates in real-time as the user types.

Example:

```text
---------------------------------
|                               |
| Type something here...        |
|                               |
---------------------------------

Characters: 25
Words: 5
```

Whenever the user types:

* Character count updates automatically
* Word count updates automatically

No page refresh is required.

---

# Understanding Controlled Components

Before React, forms were usually handled directly through the DOM.

Example:

```html
<textarea></textarea>
```

To get the value:

```javascript
const value = textarea.value;
```

The DOM owns the data.

---

## React Approach

React prefers the component state to own the data.

Example:

```tsx
const [text, setText] = useState("");
```

```tsx
<textarea
  value={text}
  onChange={handleChange}
/>
```

Now the data lives inside React state.

Flow:

```text
User Types
     ↓
onChange Event
     ↓
setText()
     ↓
State Updates
     ↓
Component Re-renders
     ↓
UI Updates
```

This pattern is called a **Controlled Component**.

---

# Creating State

Import useState:

```tsx
import { useState } from "react";
```

Create state:

```tsx
const [text, setText] = useState("");
```

---

## Understanding useState

```tsx
const [text, setText] = useState("");
```

React returns two values.

### text

The current state value.

Initially:

```tsx
text === ""
```

---

### setText

Function used to update the state.

Example:

```tsx
setText("Hello");
```

React then:

1. Updates state
2. Re-renders component
3. Updates UI

---

# TypeScript and useState

Because the initial value is a string:

```tsx
useState("")
```

TypeScript automatically infers:

```tsx
text: string
```

The explicit version is:

```tsx
const [text, setText] = useState<string>("");
```

Both are valid.

---

# Rendering a Textarea

Create a textarea:

```tsx
<textarea
  value={text}
  onChange={handleChange}
/>
```

Important:

```tsx
value={text}
```

connects state to the textarea.

React now controls what appears inside the textarea.

---

# Handling User Input

When users type, React triggers an event.

Example:

```tsx
const handleChange = (
  event: React.ChangeEvent<HTMLTextAreaElement>
) => {
  setText(event.target.value);
};
```

---

# Understanding Event Types

The type:

```tsx
React.ChangeEvent<HTMLTextAreaElement>
```

means:

```text
This event originated from a textarea.
```

Because of this, TypeScript knows:

```tsx
event.target.value
```

is a string.

Benefits:

* Better autocomplete
* Type safety
* Fewer runtime errors

---

# Understanding State Updates

Suppose the user types:

```text
Hello
```

The following happens:

```text
User Types
     ↓
onChange Fires
     ↓
handleChange Executes
     ↓
setText("Hello")
     ↓
State Updates
     ↓
Component Re-renders
```

The UI automatically reflects the new state.

---

# Character Count

JavaScript strings provide a built-in property:

```tsx
text.length
```

Example:

```tsx
"Hello".length
```

Result:

```text
5
```

---

Display it:

```tsx
<p>Characters: {text.length}</p>
```

Whenever text changes, the character count updates automatically.

---

# Word Count

Characters are simple.

Words require processing.

Example:

```text
Hello world
```

Expected:

```text
2 words
```

---

## Splitting Text

JavaScript provides:

```tsx
text.split(" ")
```

Example:

```tsx
"Hello world".split(" ")
```

Result:

```tsx
["Hello", "world"]
```

Length:

```tsx
2
```

---

## The Problem

Users may enter:

```text
Hello     world
```

Using:

```tsx
split(" ")
```

produces:

```tsx
["Hello", "", "", "", "", "world"]
```

This gives an incorrect count.

---

# Better Solution

Use:

```tsx
text.trim().split(/\s+/)
```

---

## Understanding trim()

Removes whitespace at the beginning and end.

Example:

```tsx
"  Hello  "
```

becomes:

```tsx
"Hello"
```

---

## Understanding /\s+/

This is a Regular Expression.

Meaning:

```text
One or more whitespace characters.
```

Matches:

* Space
* Tab
* Newline

Example:

```tsx
"Hello     world"
```

becomes:

```tsx
["Hello", "world"]
```

which is exactly what we want.

---

# Handling Empty Input

Consider:

```tsx
text = ""
```

Using:

```tsx
text.trim().split(/\s+/)
```

returns:

```tsx
[""]
```

Length:

```tsx
1
```

This is incorrect.

The word count should be:

```text
0
```

---

# Correct Word Count Logic

```tsx
const wordCount =
  text.trim() === ""
    ? 0
    : text.trim().split(/\s+/).length;
```

Explanation:

If the textarea is empty:

```tsx
0
```

Otherwise:

```tsx
Count words normally
```

---

# Derived State

Notice that we only store:

```tsx
text
```

inside state.

We do NOT store:

```tsx
characterCount
```

or

```tsx
wordCount
```

inside state.

Instead:

```tsx
characterCount = text.length
```

and

```tsx
wordCount = calculation based on text
```

These values are derived from existing state.

This concept is called:

## Derived State

---

# Why Derived State Is Important

Bad approach:

```tsx
const [text, setText] = useState("");
const [wordCount, setWordCount] = useState(0);
```

Now two pieces of state must stay synchronized.

This creates opportunities for bugs.

---

Better approach:

```tsx
const [text, setText] = useState("");
```

Everything else is calculated.

Benefits:

* Less state
* Less code
* Fewer bugs
* Easier maintenance

---

# Complete Application

```tsx
import React, { useState } from "react";

function App() {
  const [text, setText] = useState<string>("");

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setText(event.target.value);
  };

  const wordCount =
    text.trim() === ""
      ? 0
      : text.trim().split(/\s+/).length;

  return (
    <div>
      <h1>Character Counter</h1>

      <textarea
        value={text}
        onChange={handleChange}
        rows={8}
        cols={50}
        placeholder="Type something..."
      />

      <p>Characters: {text.length}</p>
      <p>Words: {wordCount}</p>
    </div>
  );
}

export default App;
```

---

# React Concepts Learned

By completing this project you have learned:

## Controlled Components

React controls form values through state.

---

## State Management

Updating state causes React to re-render.

---

## Event Handling

Using:

```tsx
onChange
```

to react to user input.

---

## Derived State

Calculating values from existing state instead of storing duplicate state.

---

# TypeScript Concepts Learned

## State Typing

```tsx
useState<string>("")
```

---

## Event Typing

```tsx
React.ChangeEvent<HTMLTextAreaElement>
```

---

## Type Inference

TypeScript automatically infers many types from initial values.

---

# Key Takeaways

After Day 02 you should understand:

* How controlled inputs work
* How React manages form data
* How state updates trigger re-renders
* How to type React events using TypeScript
* How to calculate derived values
* Why derived state is preferred over duplicated state
* How to manipulate strings in JavaScript and TypeScript

These concepts form the foundation for forms, validation, search boxes, filters, and API-driven user interfaces that you will build in later React projects.
