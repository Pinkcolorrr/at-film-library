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
  public transformResponse(film: FilmDTO, id?: string): Film {
    return {
      pk: film.pk,
      id: id,
      title: film.fields.title,
      episodeId: film.fields.episode_id,
      releaseDate: film.fields.release_date,
      director: film.fields.director,
      producer: film.fields.producer,
      openingCrawl: film.fields.opening_crawl,
      created: new Date(film.fields.created),
      planetsID: film.fields.planets,
      charactersID: film.fields.characters,
      vehiclesID: film.fields.vehicles,
      starshipsID: film.fields.starships,
      speciesID: film.fields.species,
    };
  }

  /**
   * Transform to DTO before sending on server
   */
  public transformRequset(film: Film): FilmDTO {
    return {
      fields: {
        title: film.title,
        episode_id: film.episodeId,
        release_date: film.releaseDate,
        director: film.director,
        producer: film.producer,
        opening_crawl: film.openingCrawl,
        created: film.created.toISOString(),
        edited: new Date().toISOString(),
        planets: film.planetsID,
        characters: film.charactersID,
        vehicles: film.vehiclesID,
        starships: film.starshipsID,
        species: film.starshipsID,
      },
      pk: film.pk,
      model: 'resources.film',
    };
  }

  /**
   * Transform titles, that used for table sorting, to server format
   */
  public transformTitles(filters: QueryFilterParams): QueryFilterParams {
    let sortTarget: string;

    switch (filters.sortTarget) {
      case 'episodeId': {
        sortTarget = 'fields.episode_id';
        break;
      }
      case 'releaseDate': {
        sortTarget = 'fields.release_date';
        break;
      }
      case 'title': {
        sortTarget = 'fields.title';
        break;
      }
      case 'pk':
      default: {
        sortTarget = 'pk';
        break;
      }
    }

    return {
      limit: filters.limit,
      pageDirection: filters.pageDirection,
      sortTarget: sortTarget,
      searchTarget: `fields.${filters.searchTarget}`,
      sortDirection: filters.sortDirection,
      searchValues: filters.searchValues,
      collectionName: filters.collectionName,
    };
  }
}
