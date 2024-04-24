import Counter from "./components/Counter";

// Store:
// Will be made up of multiple slices of the state each repsponsible for a certain doman in the application.

// Actions:
// type (required): Specifies the type of action
// payload (optional): Pass the value we want to update our state by

// Reducers: Take in an action & current state => Use the type of the action and payload value to make the specific updates it needs to do.
// Will never directly update the Redux store, because the store is immutable.
// Reducers instead make a copy of the state, and update the copy of the state, then replace the store with the copy of our state.

const App = () => {
  return (
    <div>
      <h2>Redux Complete Tutorial</h2>
      <Counter />
    </div>
  );
};

export default App;
