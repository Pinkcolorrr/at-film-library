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
      title: planet.fields.name,
      orbitalPeriod: planet.fields.orbital_period,
      population: planet.fields.population,
      rotationPeriod: planet.fields.rotation_period,
      surfaceWater: planet.fields.surface_water,
      terrain: planet.fields.terrain,
    };
  }

  /**
   * Transform titles, that used for table sorting, to server format
   */
  public transformTitles(filter: QueryFilterParams): QueryFilterParams {
    return {
      limit: filter.limit,
      pageDirection: filter.pageDirection,
      get sortTarget(): string {
        switch (filter.sortTarget) {
          case 'population': {
            return 'fields.population';
          }
          case 'terrain': {
            return 'fields.terrain';
          }
          case 'title': {
            return 'fields.name';
          }
          case 'pk':
          default: {
            return 'pk';
          }
        }
      },
      get searchTarget(): string {
        return `fields.${filter.searchTarget}`;
      },
      sortDirection: filter.sortDirection,
      searchValues: filter.searchValues,
      target: filter.target,
    };
  }
}
