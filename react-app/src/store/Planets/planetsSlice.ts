/* no-param-reassign was disabled, because redux-toolkit use immer and don't mutate state */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Maybe } from 'yup/lib/types';
import { Planet } from '../../models/Planet';
import { RequestOptions } from '../../models/RequestOptions';
import { getAllPlanets, getPlanetById, getPlanetByName } from './planetsThunks/apiThunks';
import {
  pushPlanetsInStore,
  setPlanetsInStore,
  removePlanetsFromStore,
  setIsHaveMorePlanets,
  setLastPlanetId,
} from './planetsThunks/storeThunks';

type planets = {
  planetList: Planet[];
  currentPlanet: {
    planetInfo: Maybe<Planet>;
  };
  lastDocId: string;
  requestOptions: RequestOptions;
  isHaveMoreData: boolean;
  endDataMsg: string;
};

const initialState: planets = {
  planetList: [],
  currentPlanet: {
    planetInfo: null,
  },
  requestOptions: {
    chunkSize: 20,
    sortTarget: 'Default',
  },
  lastDocId: '',
  isHaveMoreData: true,
  endDataMsg: 'You hit the bottom',
};

const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {
    clearPlanetsList(state) {
      state.planetList = [];
    },
    setPlanetsSortTarget(state, action) {
      state.requestOptions.sortTarget = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(pushPlanetsInStore.fulfilled, (state, action) => {
        state.endDataMsg = 'You hit the bottom';
        state.planetList = state.planetList.concat(action.payload);
      })
      .addCase(getPlanetById.fulfilled, (state, action) => {
        state.currentPlanet.planetInfo = action.payload;
      })
      .addCase(getPlanetByName.fulfilled, (state, action) => {
        state.isHaveMoreData = false;
        state.endDataMsg = 'All results loaded';
        state.planetList = [action.payload];
      })
      .addCase(getAllPlanets.fulfilled, (state, action) => {
        state.planetList = action.payload;
      })
      .addCase(getPlanetByName.rejected, (state) => {
        state.planetList = [];
        state.isHaveMoreData = false;
        state.endDataMsg = 'Not found';
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
      });
  },
});

export const { setPlanetsSortTarget, clearPlanetsList } = planetsSlice.actions;

export const planetsReducer = planetsSlice.reducer;
