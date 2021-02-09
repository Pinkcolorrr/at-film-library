import { IPlanetDOM } from '../interfaces/DOMs/planet-dom.interface';
import { IPlanetDTO } from '../interfaces/DTOs/planet-dto.interface';

/**
 * Mapping planet data before send or accept
 */
export class PlanetMapper {
  /**
   * Remove useless data from planetDTO
   */
  public transformResponse(planetData: Array<IPlanetDTO>): Array<IPlanetDOM> {
    return planetData.map(planet => {
      return {
        climate: planet.fields.climate,
        created: new Date(planet.fields.created),
        diameter: planet.fields.diameter,
        edited: new Date(planet.fields.edited),
        gravity: planet.fields.gravity,
        title: planet.fields.name,
        orbitalPeriod: planet.fields.orbital_period,
        population: planet.fields.population,
        rotationPeriod: planet.fields.rotation_period,
        surfaceWater: planet.fields.surface_water,
        terrain: planet.fields.terrain,
      };
    });
  }
}
