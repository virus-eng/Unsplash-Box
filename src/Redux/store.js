import { configureStore } from '@reduxjs/toolkit';
import addCollectionPopupReducer from '@/Redux/addCollectionPopupSlice/addCollectionPopupSlice.js';
import refreshCollectionListReducer  from '@/Redux/refreshCollectionListReducer/refreshCollectionList.js';
import refreshImagePageCollectionListReducer from './refreshImagePageCollectionListReducer/reducer';

export const store = configureStore({
  reducer: {
    addCollectionPopup: addCollectionPopupReducer,
    refreshCollectionList : refreshCollectionListReducer,
    refreshImagePageCollectionList : refreshImagePageCollectionListReducer
  },
});
