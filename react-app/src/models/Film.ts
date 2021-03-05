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
   * Array of personal keys related characters
   */
  readonly charactersPk: string[];

  /**
   * Array of personal keys related planets
   */
  readonly planetsPk: string[];

  /**
   * Array of personal keys related species
   */
  readonly speciesPk: string[];

  /**
   * Array of personal keys related starships
   */
  readonly starshipsPk: string[];

  /**
   * Array of personal keys related vehicles
   */
  readonly vehiclesPk: string[];
}
