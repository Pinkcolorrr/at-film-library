/** Character model */
export interface Character {
  /**
   * Id of character
   * Used for get/edit/add character.
   */
  readonly id: string;

  /**
   * Personal key of character.
   * Used for assign related data.
   */
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

  /**
   * Charater gender.
   * Type string uses here because we can't predict all genders from star wars.
   */
  readonly gender: string;

  /** Charater hair color */
  readonly hairColor: string;

  /** Link to charater image */
  readonly image: string;

  /** Charater skin color */
  readonly skinColor: string;

  /** Charater homeworld Related data. PK of planet */
  readonly homeworld: string;

  /**
   * Charater height
   * Measured in centimeters.
   */
  readonly height: number;

  /**
   * Charater mass.
   * Measured in kilograms.
   */
  readonly mass: number;
}
