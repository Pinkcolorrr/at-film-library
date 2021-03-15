import { Planet } from '../../models/Planet';
import { PlanetDTO } from '../dtos/PlanetDto';

/**  Mapping planet data before send or accept */
export class PlanetMapper {
  /** Transoform planet DTO array to object model array */

  public transformArrayResponse(planetData: PlanetDTO[], id: string[]): Planet[] {
    return planetData.map((planet, index) => {
      return this.transformResponse(planet, id[index]);
    });
  }

  /** Remove useless data from planetDTO object */
  public transformResponse(planet: PlanetDTO, planetId: string): Planet {
    return {
      climate: planet.fields.climate || 'Unknown',
      created: new Date(planet.fields.created),
      diameter: planet.fields.diameter || 'Unknown',
      gravity: planet.fields.gravity || 'Unknown',
      name: planet.fields.name || 'Unknown',
      orbitalPeriod: planet.fields.orbital_period || 'Unknown',
      population: planet.fields.population || 'Unknown',
      rotationPeriod: planet.fields.rotation_period || 'Unknown',
      surfaceWater: planet.fields.surface_water || 'Unknown',
      terrain: planet.fields.terrain || 'Unknown',
      pk: String(planet.pk),
      id: planetId,
    };
  }
}
