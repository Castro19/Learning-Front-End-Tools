// 0. Import functions from redux toolkit
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// 1. Define our types for our state variables (only for typescript)
interface CounterState {
  value: number;
}

// 2. Create our initial state
const initialState: CounterState = {
  // Every time the state is initialized, its value will always be set to zero
  value: 0,
};

// 3. Create the slice: {name, initialState, reducers, extraReducers}
const counterSlice = createSlice({
  //
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, () => {
        console.log("incrementAsync.pending");
      })
      .addCase(
        incrementAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.value += action.payload;
        }
      );
  },
});

// 4.) Export Reducer: We can now use the counterSlice reducer in other components.
export default counterSlice.reducer;

export const incrementAsync = createAsyncThunk(
  "counter/incrementAsync",
  async (amount: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return amount;
  }
);

// 4.)
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
