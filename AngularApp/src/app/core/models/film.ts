import { Observable } from 'rxjs';
import { Character } from './characters';

import { Planet } from './planet';

/**
 * Interface for film DOM
 */
export interface Film {
  /**
   * Personal key
   */
  readonly pk: number;
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
   * When note was last time edited
   */
  readonly edited: Date;
  /**
   * Array of related data about characters
   */
  readonly characters: number[];
  /**
   * Array of related data about planets
   */
  readonly planets: number[];

  /**
   * Field to keep Observable on related data about planets
   */
  planets$?: Observable<Planet[]>;

  /**
   * Field to keep Observable on related data about characters
   */
  characters$?: Observable<Character[]>;
}
