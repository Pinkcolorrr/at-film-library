import { Maybe } from 'yup/lib/types';
import { Planet } from '../../models/Planet';
import { RequestOptions } from '../../models/RequestOptions';
import { RootState } from '../rootReducer';

export const selectCurrentPlanet = (state: RootState): Maybe<Planet> => state.planets.currentPlanet.planetInfo;

export const selectPlanets = (state: RootState): Planet[] => state.planets.planetList;

export const selectIsHaveMoreData = (state: RootState): boolean => state.planets.isHaveMoreData;

export const selectEndDataMsg = (state: RootState): string => state.planets.endDataMsg;

export const selectRequestOptions = (state: RootState): RequestOptions => state.planets.requestOptions;
