/** Planet model */
export interface Planet {
  /** Planet id */
  readonly id: string;

  /** Personal key of planet */
  readonly pk: string;

  /** Planet climate */
  readonly climate: string;

  /** Planet diameter */
  readonly diameter: string;

  /** When note was created */
  readonly created: Date;

  /** Planet gravity */
  readonly gravity: string;

  /** Planet name */
  readonly name: string;

  /** Planet orbital period */
  readonly orbitalPeriod: string;

  /** Planet population */
  readonly population: string;

  /** Planet rotation period */
  readonly rotationPeriod: string;

  /** Planet surface water */
  readonly surfaceWater: string;

  /** Planet terrain */
  readonly terrain: string;
}
