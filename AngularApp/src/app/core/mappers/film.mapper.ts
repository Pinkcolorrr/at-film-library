import { FilmDTO } from '../DTOs/film-dto';
import { Film } from '../models/film';

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
}
