/** Character model */
export interface Character {
  /** Id of character */
  readonly id: string;

  /** Personal key of character */
  readonly pk: string;

  /** Charater birth year */
  readonly birthYear: string;

  /** When note was created */
  readonly created: Date;

  /** Charater eye color */
  readonly eyeColor: string;

  /** Charater gender */
  readonly gender: string;

  /** Charater hair color */
  readonly hairColor: string;

  /** Charater height */
  readonly height: string;

  /** Link to charater image */
  readonly image: string;

  /** Charater mass */
  readonly mass: string;

  /** Charater name */
  readonly name: string;

  /** Charater skin color */
  readonly skinColor: string;

  /** Charater homeworld Related data. PK of planet */
  readonly homeworld: number;
}
