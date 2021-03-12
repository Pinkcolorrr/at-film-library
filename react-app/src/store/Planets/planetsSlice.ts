import { createSlice } from '@reduxjs/toolkit';
import { Maybe } from 'yup/lib/types';
import { Planet } from '../../models/Planet';
import { RootState } from '../rootReducer';
import {
  pushPlanetsInStore,
  getPlanetById,
  clearPlanetsList,
  setPlanetsInStore,
  removePlanetsFromStore,
} from './planetsThunks';

export type planets = {
  planetList: Planet[];
  currentPlanet: {
    planetInfo: Maybe<Planet>;
  };
};

const initialState: planets = {
  planetList: [],
  currentPlanet: {
    planetInfo: null,
  },
};

const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {
    clearSelectedPlanet(state) {
      state.currentPlanet.planetInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(pushPlanetsInStore.fulfilled, (state, action) => {
        state.planetList = state.planetList.concat(action.payload);
      })
      .addCase(getPlanetById.fulfilled, (state, action) => {
        state.currentPlanet.planetInfo = action.payload;
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
        console.log(action.payload);
        console.log(state.planetList);

        action.payload.forEach((removedPlanet) => {
          for (let i = 0; i < state.planetList.length; i++) {
            if (state.planetList[i].id === removedPlanet.id) {
              console.log('test2');
              state.planetList.splice(i, 1);
              break;
            }
          }
        });
      })
      .addCase(clearPlanetsList.fulfilled, (state) => {
        state.planetList = [];
      });
  },
});

export const { clearSelectedPlanet } = planetsSlice.actions;

export const selectCurrentPlanet = (state: RootState): Maybe<Planet> => state.planets.currentPlanet.planetInfo;

export const selectPlanets = (state: RootState): Planet[] => state.planets.planetList;

export const planetsReducer = planetsSlice.reducer;
