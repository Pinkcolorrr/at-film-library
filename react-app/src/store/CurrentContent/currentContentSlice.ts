import { createSlice } from '@reduxjs/toolkit';
import { Maybe } from 'yup/lib/types';
import { RootState } from '../rootReducer';

type currentContent = {
  rootContent: Maybe<string>;
  additionalContent: Maybe<string>;
};

const initialState: currentContent = {
  rootContent: null,
  additionalContent: null,
};

const currentContentSlice = createSlice({
  name: 'currentContent',
  initialState,
  reducers: {
    setRootContent(state, action) {
      state.rootContent = action.payload;
    },
    clearRootContent(state) {
      state.rootContent = null;
    },
    setAdditionalContent(state, action) {
      state.additionalContent = action.payload;
    },
    clearAdditionalContent(state) {
      state.additionalContent = null;
    },
  },
});

export const {
  setRootContent,
  clearRootContent,
  setAdditionalContent,
  clearAdditionalContent,
} = currentContentSlice.actions;

export const selectRootContent = (state: RootState): Maybe<string> => state.currentContent.rootContent;
export const selectAdditionalContent = (state: RootState): Maybe<string> => state.currentContent.additionalContent;

export const currentContentReducer = currentContentSlice.reducer;
