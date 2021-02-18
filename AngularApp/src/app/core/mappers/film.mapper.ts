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
      characters: film.fields.characters,
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
          case 'episodeId': {
            return 'fields.episode_id';
          }
          case 'releaseDate': {
            return 'fields.release_date';
          }
          case 'title': {
            return 'fields.title';
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
