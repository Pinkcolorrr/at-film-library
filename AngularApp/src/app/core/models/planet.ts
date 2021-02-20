/**
 * Interface for planet DOM
 */
export interface Planet {
  /**
   * Personal key of planet
   */
  readonly pk: number | string;
  /**
   * Planet climate
   */
  readonly climate: string;
  /**
   * Planet diameter
   */
  readonly diameter: string;
  /**
   * When note was created
   */
  readonly created: Date;
  /**
   * When note was edited last time
   */
  readonly edited: Date;
  /**
   * Planet gravity
   */
  readonly gravity: string;
  /**
   * Planet name
   */
  readonly title: string;
  /**
   * Planet orbital period
   */
  readonly orbitalPeriod: string;
  /**
   * Planet population
   */
  readonly population: string;
  /**
   * Planet rotation period
   */
  readonly rotationPeriod: string;
  /**
   * Planet surface water
   */
  readonly surfaceWater: string;
  /**
   * Planet terrain
   */
  readonly terrain: string;
}
