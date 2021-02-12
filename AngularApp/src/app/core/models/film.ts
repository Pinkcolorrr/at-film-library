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
   * Array of related data about species
   */
  readonly species: number[];
  /**
   * Array of related data about starships
   */
  readonly starships: number[];
  /**
   * Array of related data about vehicles
   */
  readonly vehicles: number[];
}
