/** Planet model */
export interface Planet {
  /** Planet id */
  readonly id: string;

  /** Personal key of planet */
  readonly pk: string;

  /** When note was created */
  readonly created: Date;

  /** Planet name */
  readonly name: string;

  /** Planet climate */
  readonly climate: string;

  /** Planet surface water */
  readonly surfaceWater: string;

  /** Planet terrain */
  readonly terrain: string;

  /** Planet gravity */
  readonly gravity: string;

  /** Planet diameter */
  readonly diameter?: number;

  /** Planet orbital period */
  readonly orbitalPeriod?: number;

  /** Planet population */
  readonly population?: number;

  /** Planet rotation period */
  readonly rotationPeriod?: number;
}
