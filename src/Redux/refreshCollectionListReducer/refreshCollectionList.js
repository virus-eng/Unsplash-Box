import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const refreshCollectionListReducer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   "refreshCollectionList" : (state) => {
        if(state.value == 0) state.value = 1;
        else state.value = 0;
   }
  },
});

// Export the generated actions
export const { refreshCollectionList } = refreshCollectionListReducer.actions;

// Export the reducer to use in the store configuration
export default refreshCollectionListReducer.reducer;
