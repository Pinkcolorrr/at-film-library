import moment from 'moment';
import { Film } from '../../models/Film';
import { FilmDTO } from '../dtos/FilmDto';

/** Mapping film data before send or accep */
export const FilmMapper = {
  /** Transoform film DTO array to object model array */
  transformArrayResponse(filmData: FilmDTO[], id: string[]): Film[] {
    return filmData.map((film, index) => this.transformResponse(film, id[index]));
  },

  /** Remove useless data from filmDTO object */
  transformResponse(film: FilmDTO, filmID: string): Film {
    return {
      title: film.fields.title,
      episodeId: film.fields.episode_id,
      releaseDate: moment(film.fields.release_date).toDate(),
      director: film.fields.director,
      producer: film.fields.producer,
      openingCrawl: film.fields.opening_crawl,
      created: new Date(film.fields.created),
      planetsPk: film.fields.planets.map((item) => String(item)),
      charactersPk: film.fields.characters.map((item) => String(item)),
      speciesPk: film.fields.species.map((item) => String(item)),
      starshipsPk: film.fields.starships.map((item) => String(item)),
      vehiclesPk: film.fields.vehicles.map((item) => String(item)),
      pk: String(film.pk),
      id: filmID,
    };
  },

  /** Transofrm data to server format */
  transformRequset(film: Film): FilmDTO {
    return {
      fields: {
        title: film.title,
        episode_id: film.episodeId,
        release_date: moment(film.releaseDate).format('YYYY-MM-DD'),
        director: film.director || 'Unknown',
        producer: film.producer || 'Unknown',
        opening_crawl: film.openingCrawl || 'Unknown',
        created: film.created.toISOString(),
        edited: new Date().toISOString(),
        planets: film.planetsPk,
        characters: film.charactersPk,
        species: film.speciesPk,
        starships: film.starshipsPk,
        vehicles: film.vehiclesPk,
      },
      pk: film.pk,
      model: 'resources.film',
    };
  },
};
