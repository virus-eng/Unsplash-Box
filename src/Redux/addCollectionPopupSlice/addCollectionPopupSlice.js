import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const addCollectionPopupSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   "setter" : (state, action) => {
        state.value = action.payload;
   }
  },
});

// Export the generated actions
export const { setter } = addCollectionPopupSlice.actions;

// Export the reducer to use in the store configuration
export default addCollectionPopupSlice.reducer;
