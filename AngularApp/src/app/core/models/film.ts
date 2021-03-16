import { Observable } from 'rxjs';

import { Character } from './characters';
import { Planet } from './planet';

/**
 * Interface for film DOM
 */
export interface Film {
  /**
   * Film id
   */
  readonly id?: string;

  /**
   * Personal key
   */
  readonly pk: string;

  /**
   * Film title
   */
  readonly title: string;

  /**
   * Film director
   */
  readonly director: string;

  /**
   * Film release date
   */
  readonly releaseDate: Date;

  /**
   * Film episode Id
   */
  readonly episodeId: number;

  /**
   * Film producer
   */
  readonly producer: string;

  /**
   * Film opening crawl
   */
  readonly openingCrawl: string;

  /**
   * When note about film was created
   */
  readonly created: Date;

  /**
   * Array of IDs related characters
   */
  readonly charactersID: string[];

  /**
   * Array of IDs related planets
   */
  readonly planetsID: string[];

  /**
   * Array of IDs related species
   */
  readonly speciesID: string[];

  /**
   * Array of IDs related starships
   */
  readonly starshipsID: string[];

  /**
   * Array of IDs related vehicles
   */
  readonly vehiclesID: string[];

  /**
   * Field to keep array with related planets
   */
  planetsList?: Planet[];

  /**
   * Field to keep array with related characters
   */
  charactersList?: Character[];
}
