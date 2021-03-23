/* No-param-reassign was disabled, because redux-toolkit use immer and don't mutate state */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Character } from '../../models/Character';
import { RequestOptions } from '../../models/RequestOptions';
import {
  pushCharactersInStore,
  removeCharactersFromStore,
  setCharactersInStore,
  setIsHaveMoreCharacters,
  setLastCharacterId,
} from './charactersThunks/storeThunks';
import {
  getCharacterById,
  getCharacterByName,
  getAllCharacters,
  getCharactersByPk,
} from './charactersThunks/combinedThunks';

interface CharactersState {
  /** List of all loaded characters */
  characterList: Character[];
  /** Current character */
  currentCharacter: {
    /** Check, if failed to get character */
    isRejected: boolean;
    /** Information about character */
    characterInfo: Character | null;
  };
  /** Id of last loaded character */
  lastDocId: string;
  /** Option for server request */
  requestOptions: RequestOptions;
  /** Is db have more data to load */
  isHaveMoreData: boolean;
  /** Msg, that will display, when user hit the bottom of data */
}

const initialState: CharactersState = {
  characterList: [],
  currentCharacter: {
    isRejected: false,
    characterInfo: null,
  },
  requestOptions: {
    chunkSize: 20,
    sortTarget: 'Default',
  },
  lastDocId: '',
  isHaveMoreData: true,
};

/**
 * Contain all data about characters
 * And methods to work with that data
 */
const charactersSlise = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    /** Clear loaded characters */
    clearCharactersList(state) {
      state.characterList = [];
    },
    /** Set sort target */
    setCharactersSortTarget(state, action) {
      state.requestOptions.sortTarget = action.payload;
    },
  },
  /** Extra reducers for proccesing thunks results */
  extraReducers: (builder) => {
    builder
      .addCase(pushCharactersInStore.fulfilled, (state, action) => {
        state.characterList = state.characterList.concat(action.payload);
      })
      .addCase(getCharacterById.fulfilled, (state, action) => {
        state.currentCharacter.characterInfo = action.payload;
        state.currentCharacter.isRejected = false;
      })
      .addCase(getCharacterByName.fulfilled, (state, action) => {
        state.isHaveMoreData = false;
        state.characterList = [action.payload];
      })
      .addCase(getAllCharacters.fulfilled, (state, action) => {
        state.characterList = action.payload;
      })
      .addCase(setLastCharacterId.fulfilled, (state, action) => {
        state.lastDocId = action.payload;
      })
      .addCase(setCharactersInStore.fulfilled, (state, action) => {
        action.payload.forEach((editedCharacter) => {
          for (let i = 0; i < state.characterList.length; i++) {
            if (state.characterList[i].id === editedCharacter.id) {
              state.characterList[i] = editedCharacter;
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
      })
      .addCase(getCharactersByPk.fulfilled, (state, action) => {
        state.characterList = action.payload;
      })
      .addCase(getCharacterByName.rejected, (state) => {
        state.characterList = [];
        state.isHaveMoreData = false;
      })
      .addCase(getCharacterById.rejected, (state) => {
        state.currentCharacter.isRejected = true;
      });
  },
});

export const { setCharactersSortTarget, clearCharactersList } = charactersSlise.actions;

export const charactersReducer = charactersSlise.reducer;
