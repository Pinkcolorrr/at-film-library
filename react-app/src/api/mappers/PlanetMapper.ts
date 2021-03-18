import { Planet } from '../../models/Planet';
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
      diameter: Number.isNaN(planet.fields.diameter) ? undefined : Number(planet.fields.diameter),
      orbitalPeriod: Number.isNaN(planet.fields.orbital_period) ? undefined : Number(planet.fields.orbital_period),
      population: Number.isNaN(planet.fields.population) ? undefined : Number(planet.fields.population),
      rotationPeriod: Number.isNaN(planet.fields.rotation_period) ? undefined : Number(planet.fields.rotation_period),
    };
  },
};
