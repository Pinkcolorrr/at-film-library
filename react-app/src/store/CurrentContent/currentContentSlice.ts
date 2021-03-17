/* No-param-reassign was disabled, because redux-toolkit use immer and don't mutate state */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

type rootContent = 'films list' | 'add film' | 'edit film' | 'planets list' | 'characters list' | '';

type currentContent = {
  /** Root content type, displaying in app */
  rootContent: rootContent;
  /** Additional content type, displaying in app */
  additionalContent: string;
};

const initialState: currentContent = {
  rootContent: '',
  additionalContent: '',
};

/** Containt information about current displaying content */
const currentContentSlice = createSlice({
  name: 'currentContent',
  initialState,
  reducers: {
    /** Reducer that, set root content */
    setRootContent(
      state,
      action: {
        payload: rootContent;
        type: string;
      },
    ) {
      state.rootContent = action.payload;
    },
    /** Reducer that, clear root content */
    clearRootContent(state) {
      state.rootContent = '';
    },
    /** Reducer that, set additional content */
    setAdditionalContent(
      state,
      action: {
        payload: string;
        type: string;
      },
    ) {
      state.additionalContent = action.payload;
    },
    /** Reducer that, clear additional content */
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
