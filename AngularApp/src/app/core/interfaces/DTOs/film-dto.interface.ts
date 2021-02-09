import { FirebaseDTO } from './firebase-dto.interface';

/**
 * Interface for film DTO
 */
export interface IFilmDTO extends FirebaseDTO {
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
    readonly planets: Array<number>;
    /**
     * Array of related data about species
     */
    readonly species: Array<number>;
    /**
     * Array of related data about starships
     */
    readonly starships: Array<number>;
    /**
     * Array of related data about characters
     */
    readonly characters: Array<number>;
    /**
     * Array of related data about vehicles
     */
    readonly vehicles: Array<number>;
  };
}
