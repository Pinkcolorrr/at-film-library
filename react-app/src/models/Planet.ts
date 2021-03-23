/** Planet model. */
export interface Planet {
  /**
   * Planet id.
   * Used for get/edit/add planet.
   */
  readonly id: string;

  /**
   * Personal key of planet.
   * Used for assign related data.
   */
  readonly pk: string;

  /** When note was created. */
  readonly created: Date;

  /** Planet name. */
  readonly name: string;

  /** Planet climate. */
  readonly climate: string;

  /** Planet surface water. */
  readonly surfaceWater: string;

  /** Planet terrain. */
  readonly terrain: string;

  /**
   * Planet gravity.
   * Measured in relation to standard gravity.
   * Standard gravity is equivalent of 9.82 m/s^2.
   */
  readonly gravity: string;

  /** Planet population. */
  readonly population: number;

  /**
   * Planet diameter
   * Measured in kilometers.
   */
  readonly diameter: number;

  /**
   * Planet orbital period.
   * Measured in standard days.
   * 1 standard day is equivalent to 1 earth day.
   */
  readonly orbitalPeriod: number;

  /**
   * Planet rotation period.
   * Measured in standard hours.
   * 1 standard hour is equivalent to 1 earth hour.
   */
  readonly rotationPeriod: number;
}
