import { Planet } from '../../models/Planet';
import { getNumberFromString } from '../../utils/utils';
import { PlanetDTO } from '../dtos/PlanetDto';

/**  Mapping planet data before send or accept */
export const PlanetMapper = {
  /** Transoform planet DTO array to object model array */
  transformArrayResponse(planetData: PlanetDTO[], id: string[]): Planet[] {
    return planetData.map((planet, index) => this.transformResponse(planet, id[index]));
  },

  /** Remove useless data from planetDTO object */
  transformResponse(planet: PlanetDTO, planetId: string): Planet {
    return {
      pk: String(planet.pk),
      id: planetId,
      name: planet.fields.name,
      surfaceWater: planet.fields.surface_water,
      terrain: planet.fields.terrain,
      climate: planet.fields.climate,
      created: new Date(planet.fields.created),
      gravity: planet.fields.gravity,
      diameter: getNumberFromString(planet.fields.diameter),
      orbitalPeriod: getNumberFromString(planet.fields.orbital_period),
      population: getNumberFromString(planet.fields.population),
      rotationPeriod: getNumberFromString(planet.fields.rotation_period),
    };
  },
};
