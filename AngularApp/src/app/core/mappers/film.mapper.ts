import { FilmDTO } from '../DTOs/film-dto';
import { Film } from '../models/film';
import { QueryFilterParams } from '../models/query-filter-params';

/**
 * Mapping film data before send or accept
 */
export class FilmMapper {
  /**
   * Transoform film DTO array to object model array
   */
  public transformArrayResponse(filmData: FilmDTO[]): Film[] {
    return filmData.map(film => {
      return this.transformResponse(film);
    });
  }

  /**
   * Remove useless data from filmDTO object
   */
  public transformResponse(film: FilmDTO): Film {
    return {
      pk: film.pk,
      title: film.fields.title,
      episodeId: film.fields.episode_id,
      releaseDate: film.fields.release_date,
      director: film.fields.director,
      producer: film.fields.producer,
      openingCrawl: film.fields.opening_crawl,
      created: new Date(film.fields.created),
      edited: new Date(film.fields.edited),
      planets: film.fields.planets,
      species: film.fields.species,
      starships: film.fields.starships,
      vehicles: film.fields.vehicles,
      characters: film.fields.characters,
    };
  }

  /**
   * Transform titles, that used for table sorting, to server format
   */
  public transformTitles(filters: QueryFilterParams): QueryFilterParams {
    return {
      limit: filters.limit,
      pageDirection: filters.pageDirection,
      get sortTarget(): string {
        let title = 'fields.';

        switch (filters.sortTarget) {
          case 'fields.episodeId': {
            title += 'episode_id';
            break;
          }
          case 'fields.releaseDate': {
            title += 'release_date';
            break;
          }
          case 'fields.title': {
            title += 'title';
            break;
          }
          case 'pk':
          default: {
            title = 'pk';
            break;
          }
        }

        return title;
      },
      sortDirection: filters.sortDirection,
      searchValues: filters.searchValues,
      target: filters.target,
      searchTarget: filters.searchTarget,
    };
  }
}
