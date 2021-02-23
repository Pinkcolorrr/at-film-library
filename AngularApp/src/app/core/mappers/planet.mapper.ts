import { PlanetDTO } from '../DTOs/planet-dto';
import { Planet } from '../models/planet';
import { QueryFilterParams } from '../models/query-filter-params';

/**
 * Mapping planet data before send or accept
 */
export class PlanetMapper {
  /**
   * Transoform planet DTO array to object model array
   */
  public transformArrayResponse(planetData: PlanetDTO[]): Planet[] {
    return planetData.map(planet => {
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
      edited: new Date(planet.fields.edited),
      gravity: planet.fields.gravity,
      name: planet.fields.name,
      orbitalPeriod: planet.fields.orbital_period,
      population: planet.fields.population,
      rotationPeriod: planet.fields.rotation_period,
      surfaceWater: planet.fields.surface_water,
      terrain: planet.fields.terrain,
      pk: planet.pk,
    };
  }

  /**
   * Transform titles, that used for table sorting, to server format
   */
  public transformTitles(filters: QueryFilterParams): QueryFilterParams {
    return {
      limit: filters.limit,
      pageDirection: filters.pageDirection,
      sortTarget: filters.sortTarget === 'pk' ? 'pk' : `fields.${filters.sortTarget}`,
      searchTarget: `fields.${filters.searchTarget}`,
      sortDirection: filters.sortDirection,
      searchValues: filters.searchValues,
      collectionName: filters.collectionName,
    };
  }
}
