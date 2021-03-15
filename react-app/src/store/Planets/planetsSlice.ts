/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Maybe } from 'yup/lib/types';
import { Planet } from '../../models/Planet';
import { RequestOptions } from '../../models/RequestOptions';
import { RootState } from '../rootReducer';
import {
  pushPlanetsInStore,
  getPlanetById,
  clearPlanetsList,
  setPlanetsInStore,
  removePlanetsFromStore,
  getPlanetByName,
  setIsHaveMoreData,
} from './planetsThunks';

export type planets = {
  planetList: Planet[];
  currentPlanet: {
    planetInfo: Maybe<Planet>;
  };
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
  isHaveMoreData: true,
  endDataMsg: 'You hit the bottom',
};

const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {
    clearSelectedPlanet(state) {
      state.currentPlanet.planetInfo = null;
    },
    setSortTarget(state, action) {
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
      .addCase(getPlanetByName.rejected, (state) => {
        state.planetList = [];
        state.isHaveMoreData = false;
        state.endDataMsg = 'Not found';
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
      .addCase(clearPlanetsList.fulfilled, (state) => {
        state.planetList = [];
      })
      .addCase(setIsHaveMoreData.fulfilled, (state, action) => {
        state.isHaveMoreData = action.payload;
      });
  },
});

export const { clearSelectedPlanet, setSortTarget } = planetsSlice.actions;

export const selectCurrentPlanet = (state: RootState): Maybe<Planet> => state.planets.currentPlanet.planetInfo;

export const selectPlanets = (state: RootState): Planet[] => state.planets.planetList;

export const selectIsHaveMoreData = (state: RootState): boolean => state.planets.isHaveMoreData;

export const selectEndDataMsg = (state: RootState): string => state.planets.endDataMsg;

export const selectRequestOptions = (state: RootState): RequestOptions => state.planets.requestOptions;

export const planetsReducer = planetsSlice.reducer;
