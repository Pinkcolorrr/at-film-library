import { Planet } from '../../models/Planet';
import { PlanetDTO } from '../dtos/PlanetDto';

/**
 * Mapping planet data before send or accept
 */
export class PlanetMapper {
  /**
   * Transoform planet DTO array to object model array
   */
  public transformArrayResponse(planetData: PlanetDTO[]): Planet[] {
    return planetData.map((planet) => {
      return this.transformResponse(planet);
    });
  }

  /**
   * Remove useless data from planetDTO object
   */
  public transformResponse(planet: PlanetDTO): Planet {
    return {
      climate: planet.fields.climate,
      created: new Date(planet.fields.created),
      diameter: planet.fields.diameter,
      gravity: planet.fields.gravity,
      name: planet.fields.name,
      orbitalPeriod: planet.fields.orbital_period,
      population: planet.fields.population,
      rotationPeriod: planet.fields.rotation_period,
      surfaceWater: planet.fields.surface_water,
      terrain: planet.fields.terrain,
      pk: String(planet.pk),
    };
  }
}
