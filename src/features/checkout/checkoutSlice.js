import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './checkoutAPI';

const initialState = {
  value: 0,
  status: 'idle',
};
export const fetchCountAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

export const checkoutSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

export default checkoutSlice.reducer;
