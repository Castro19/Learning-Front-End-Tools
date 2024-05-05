# Learn how Refs are used in React

## Introduction

- In this repo, I will follow this [tutorial](https://www.youtube.com/watch?v=42BkpGe8oxg&ab_channel=CosdenSolutions)

- I will learn how to use `useRef` in React in-depth and later apply this in my react projects.

- **Background**: I have used this hook in the past for referencing DOM objects in my application. I have a good understanding of its purpose, but I want to dive deeper into all of its features.

## Hook: useRef

- A powerful react hook that is used to reference a value not needed for re-rendering.

- Think of refs as state that do not re-render the component when its value changes.

- Unlike state, it is mutable.

  - However, don't mutate the ref if it holds and object that is used for rendering.

## Refs vs State

```
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  const handleIncrement = () => {
    setCount(count + 1);
    countRef.current++;

    console.log("State:", count);
    console.log("Ref:", countRef.current);
  };
```

- In this example, we will increment the count of a value for a state count and a ref count

- When we doe `setCount`, we are triggering the component to re-render and display the incremented value for the next rendered component.

- When we do `countRef.current++;`, we are incrementing the value directly without needing to wait for the component to re-render to see its updated value.

- **\*The Console Logs**: The state variable for count will always be one behind the actual count. This is because the component has not re-rendered yet.

```
  const countRef = useRef(0);

  const handleIncrement = () => {
    countRef.current++;
    console.log("Ref:", countRef.current);
  };
  return (
    <div className="tutorial">
      Count: {countRef.current}
      <button onClick={handleIncrement}>Increment</button>
    </div>
  )
```

- In this example, we will increment our Ref, but the component will not display the updated the value.

- **The reason**: Since Refs `do NOT trigger a re-render`, then the component does not know to display its new value

  - Only when the component does a re-render, then it will display the ref's current value.

- **Key TakeAway**: Never use a `Ref` in the return function of a React component, unless it is used within the `ref={}`

  - Never use `ref.current` in the return function

## Using Refs for HTML Elements

### 1. Define the Ref and its type

```
  const inputRef = useRef<HTMLInputElement | null>(null);

```

### 2. Mount the Ref to the HTML Element

```
 return (
     <div className="tutorial">
     <input ref={inputRef} type="text" placeholder="Type something..." />
     </div>
 );
```

- React will handle setting the `inputRef.current` to the input of the HTML element as long as the element is mounted.

- This allows us to access the function from the input

### 3. Access the Functions in the Refs

```
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
```

- In this useEffect, we are accessing the `.focus()` to allow the input element to be focused on mount.

- **Key Takeaway**: Very useful for accessing DOM HTML elements directly and call functions on those DOM elements.

- In this example, we created a `Ref` that was mounted to an input element. On mount, we call the `focus()` function to the `inputRef` that will then focus on the `input` field.

```
export function Demo2({}: DemoProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="tutorial">
      <input ref={inputRef} type="text" placeholder="Type something..." />
    </div>
  );
}
```
