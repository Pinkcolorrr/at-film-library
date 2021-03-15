/* no-param-reassign was disabled, because redux-toolkit use immer and don't mutate state */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Maybe } from 'yup/lib/types';
import { Character } from '../../models/Characters';
import { RequestOptions } from '../../models/RequestOptions';
import { getCharacterById, getCharacterByName } from './charactersThunks/apiThunks';
import {
  pushCharactersInStore,
  removeCharactersFromStore,
  setCharactersInStore,
  setIsHaveMoreCharacters,
  setLastCharacterId,
} from './charactersThunks/storeThunks';

type characters = {
  characterList: Character[];
  currentCharacter: {
    characterInfo: Maybe<Character>;
  };
  lastDocId: string;
  requestOptions: RequestOptions;
  isHaveMoreData: boolean;
  endDataMsg: string;
};

const initialState: characters = {
  characterList: [],
  currentCharacter: {
    characterInfo: null,
  },
  requestOptions: {
    chunkSize: 20,
    sortTarget: 'Default',
  },
  lastDocId: '',
  isHaveMoreData: true,
  endDataMsg: 'You hit the bottom',
};

const charactersSlise = createSlice({
  name: 'planets',
  initialState,
  reducers: {
    clearCharactersList(state) {
      state.characterList = [];
    },
    setCharactersSortTarget(state, action) {
      state.requestOptions.sortTarget = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(pushCharactersInStore.fulfilled, (state, action) => {
        state.endDataMsg = 'You hit the bottom';
        state.characterList = state.characterList.concat(action.payload);
      })
      .addCase(getCharacterById.fulfilled, (state, action) => {
        state.currentCharacter.characterInfo = action.payload;
      })
      .addCase(getCharacterByName.fulfilled, (state, action) => {
        state.isHaveMoreData = false;
        state.endDataMsg = 'All results loaded';
        state.characterList = [action.payload];
      })
      .addCase(getCharacterByName.rejected, (state) => {
        state.characterList = [];
        state.isHaveMoreData = false;
        state.endDataMsg = 'Not found';
      })
      .addCase(setLastCharacterId.fulfilled, (state, action) => {
        state.lastDocId = action.payload;
      })
      .addCase(setCharactersInStore.fulfilled, (state, action) => {
        action.payload.forEach((editedPlanet) => {
          for (let i = 0; i < state.characterList.length; i++) {
            if (state.characterList[i].id === editedPlanet.id) {
              state.characterList[i] = editedPlanet;
              break;
            }
          }
        });
      })
      .addCase(removeCharactersFromStore.fulfilled, (state, action) => {
        action.payload.forEach((removedPlanet) => {
          for (let i = 0; i < state.characterList.length; i++) {
            if (state.characterList[i].id === removedPlanet.id) {
              state.characterList.splice(i, 1);
              break;
            }
          }
        });
      })
      .addCase(setIsHaveMoreCharacters.fulfilled, (state, action) => {
        state.isHaveMoreData = action.payload;
      });
  },
});

export const { setCharactersSortTarget, clearCharactersList } = charactersSlise.actions;

export const charactersReducer = charactersSlise.reducer;
