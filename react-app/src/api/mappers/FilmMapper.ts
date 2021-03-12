import { Film } from '../../models/Film';
import { FilmDTO } from '../dtos/FilmDto';

/**
 * Mapping film data before send or accept
 */
export class FilmMapper {
  /**
   * Transoform film DTO array to object model array
   */
  public transformArrayResponse(filmData: FilmDTO[], id: string[]): Film[] {
    return filmData.map((film, index) => {
      return this.transformResponse(film, id[index]);
    });
  }

  /**
   * Remove useless data from filmDTO object
   */
  public transformResponse(film: FilmDTO, filmID: string): Film {
    return {
      title: film.fields.title || 'Unknown',
      episodeId: film.fields.episode_id || NaN,
      releaseDate: film.fields.release_date || 'Unknown',
      director: film.fields.director || 'Unknown',
      producer: film.fields.producer || 'Unknown',
      openingCrawl: film.fields.opening_crawl || 'Unknown',
      created: new Date(film.fields.created),
      planetsPk: film.fields.planets.map((item) => String(item)),
      charactersPk: film.fields.characters.map((item) => String(item)),
      speciesPk: film.fields.species.map((item) => String(item)),
      starshipsPk: film.fields.starships.map((item) => String(item)),
      vehiclesPk: film.fields.vehicles.map((item) => String(item)),
      pk: String(film.pk),
      id: filmID,
    };
  }
}
