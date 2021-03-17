/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

type rootContent = 'films list' | 'add film' | 'edit film' | 'planets list' | 'characters list' | '';

type currentContent = {
  rootContent: rootContent;
  additionalContent: string;
};

const initialState: currentContent = {
  rootContent: '',
  additionalContent: '',
};

const currentContentSlice = createSlice({
  name: 'currentContent',
  initialState,
  reducers: {
    setRootContent(
      state,
      action: {
        payload: rootContent;
        type: string;
      },
    ) {
      state.rootContent = action.payload;
    },
    clearRootContent(state) {
      state.rootContent = '';
    },
    setAdditionalContent(
      state,
      action: {
        payload: string;
        type: string;
      },
    ) {
      state.additionalContent = action.payload;
    },
    clearAdditionalContent(state) {
      state.additionalContent = '';
    },
  },
});

export const {
  setRootContent,
  clearRootContent,
  setAdditionalContent,
  clearAdditionalContent,
} = currentContentSlice.actions;

export const currentContentReducer = currentContentSlice.reducer;
