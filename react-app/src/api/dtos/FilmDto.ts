/* have to use camel_case here, because DTO */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable camelcase */

import { FirebaseDTO } from './FirebaseDto';

/**
 * Interface for film DTO
 */
export interface FilmDTO extends FirebaseDTO {
  /**
   * Main film data
   */
  readonly fields: {
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
    readonly release_date: Date;
    /**
     * Film episode Id
     */
    readonly episode_id: number;
    /**
     * Film producer
     */
    readonly producer: string;
    /**
     * Film opening crawl
     */
    readonly opening_crawl: string;
    /**
     * When note about film was created
     */
    readonly created: string;
    /**
     * When note was last time edited
     */
    readonly edited: string;
    /**
     * Array of related data about planets
     */
    readonly planets: (number | string)[];
    /**
     * Array of related data about species
     */
    readonly species: (number | string)[];
    /**
     * Array of related data about starships
     */
    readonly starships: (number | string)[];
    /**
     * Array of related data about characters
     */
    readonly characters: (number | string)[];
    /**
     * Array of related data about vehicles
     */
    readonly vehicles: (number | string)[];
  };
}
