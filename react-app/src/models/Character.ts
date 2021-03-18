/** Character model */
export interface Character {
  /** Id of character */
  readonly id: string;

  /** Personal key of character */
  readonly pk: string;

  /** When note was created */
  readonly created: Date;

  /** Charater name */
  readonly name: string;
  /**
   * Charater birth year
   * Type "string" was chosen for birthYear, because it's custom value
   *
   * For example value of this field could be like 19BBY
   */
  readonly birthYear: string;

  /** Charater eye color */
  readonly eyeColor: string;

  /** Charater gender */
  readonly gender: string;

  /** Charater hair color */
  readonly hairColor: string;

  /** Link to charater image */
  readonly image: string;

  /** Charater skin color */
  readonly skinColor: string;

  /** Charater homeworld Related data. PK of planet */
  readonly homeworld: string;

  /** Charater height */
  readonly height?: number;

  /** Charater mass */
  readonly mass?: number;
}
