/* No-param-reassign was disabled, because redux-toolkit use immer and don't mutate state */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Planet } from '../../models/Planet';
import { RequestOptions } from '../../models/RequestOptions';
import {
  pushPlanetsInStore,
  setPlanetsInStore,
  removePlanetsFromStore,
  setIsHaveMorePlanets,
  setLastPlanetId,
} from './planetsThunks/storeThunks';
import { getAllPlanets, getPlanetById, getPlanetByName, getPlanetsByPk } from './planetsThunks/combinedThunks';

interface PlanetsState {
  /** List of all loaded planets */
  planetList: Planet[];
  /** Current planet */
  currentPlanet: {
    /** Msg if failed to get planet */
    isRejected: boolean;
    /** Information about planet */
    planetInfo: Planet | null;
  };
  /** Id of last loaded planet */
  lastDocId: string;
  /** Option for server request */
  requestOptions: RequestOptions;
  /** Is db have more data to load */
  isHaveMoreData: boolean;
}

const initialState: PlanetsState = {
  planetList: [],
  currentPlanet: {
    isRejected: false,
    planetInfo: null,
  },
  requestOptions: {
    chunkSize: 20,
    sortTarget: 'Default',
  },
  lastDocId: '',
  isHaveMoreData: true,
};

/**
 * Contain all data about planets
 * And methods to work with that data
 */
const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {
    /** Clear loaded characters */
    clearPlanetsList(state) {
      state.planetList = [];
    },
    /** Set sort target */
    setPlanetsSortTarget(state, action) {
      state.requestOptions.sortTarget = action.payload;
    },
  },
  /** Extra reducers for proccesing thunks results */
  extraReducers: (builder) => {
    builder
      .addCase(pushPlanetsInStore.fulfilled, (state, action) => {
        state.planetList = state.planetList.concat(action.payload);
      })
      .addCase(getPlanetById.fulfilled, (state, action) => {
        state.currentPlanet.planetInfo = action.payload;
        state.currentPlanet.isRejected = false;
      })
      .addCase(getPlanetByName.fulfilled, (state, action) => {
        state.isHaveMoreData = false;
        state.planetList = [action.payload];
      })
      .addCase(setLastPlanetId.fulfilled, (state, action) => {
        state.lastDocId = action.payload;
      })
      .addCase(setPlanetsInStore.fulfilled, (state, action) => {
        action.payload.forEach((editedPlanet) => {
          for (let i = 0; i < state.planetList.length; i++) {
            if (state.planetList[i].id === editedPlanet.id) {
              state.planetList[i] = editedPlanet;
              break;
            }
          }
        });
      })
      .addCase(removePlanetsFromStore.fulfilled, (state, action) => {
        action.payload.forEach((removedPlanet) => {
          for (let i = 0; i < state.planetList.length; i++) {
            if (state.planetList[i].id === removedPlanet.id) {
              state.planetList.splice(i, 1);
              break;
            }
          }
        });
      })
      .addCase(setIsHaveMorePlanets.fulfilled, (state, action) => {
        state.isHaveMoreData = action.payload;
      })
      .addCase(getAllPlanets.fulfilled, (state, action) => {
        state.planetList = action.payload;
      })
      .addCase(getPlanetsByPk.fulfilled, (state, action) => {
        state.planetList = action.payload;
      })
      .addCase(getPlanetById.rejected, (state) => {
        state.currentPlanet.isRejected = true;
      })
      .addCase(getPlanetByName.rejected, (state) => {
        state.planetList = [];
        state.isHaveMoreData = false;
      });
  },
});

export const { setPlanetsSortTarget, clearPlanetsList } = planetsSlice.actions;

export const planetsReducer = planetsSlice.reducer;
