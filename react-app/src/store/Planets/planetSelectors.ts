import { Planet } from '../../models/Planet';
import { RequestOptions } from '../../models/RequestOptions';
import { RootState } from '../rootReducer';

/** Select current planet, saved in store */
export const selectCurrentPlanet = (state: RootState): Planet | null => state.planets.currentPlanet.planetInfo;

/** Select all planets,that has in store */
export const selectAllPlanets = (state: RootState): Planet[] => state.planets.planetList;

/** Select information about is there any data left on the server in store */
export const selectIsHaveMorePlanets = (state: RootState): boolean => state.planets.isHaveMoreData;

/** Select options for request */
export const selectPlanetsRequestOptions = (state: RootState): RequestOptions => state.planets.requestOptions;

/** Select message if failed to get a planet */
export const selectIsPlanetRejected = (state: RootState): boolean => state.planets.currentPlanet.isRejected;
