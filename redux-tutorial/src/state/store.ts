// import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./counter/counterSlice";

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// Allows us to configure our store
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";

// The object will take a single 'reducer' key
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// Using typescript, we need to export 2 types
// 1. Return type of Root state that allows us to define the type of this selector that allows to access our state variables.
export type RootState = ReturnType<typeof store.getState>;
// 2. Allows us to sepcify the type when using the useDispatch hook
export type AppDispatch = typeof store.dispatch;
