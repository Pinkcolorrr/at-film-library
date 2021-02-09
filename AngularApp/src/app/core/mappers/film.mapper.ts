import { IFilmDOM } from '../interfaces/DOMs/film-dom.interface';
import { IFilmDTO } from '../interfaces/DTOs/film-dto.interface';

/**
 * Mapping film data before send or accept
 */
export class FilmMapper {
  /**
   * Remove useless data from filmDTO
   */
  public transformResponse(filmData: Array<IFilmDTO>): Array<IFilmDOM> {
    return filmData.map(film => {
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
    });
  }
}
