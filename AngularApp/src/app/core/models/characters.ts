/**
 * Interface for character DOM
 */
export interface Character {
  /**
   * Personal key of character
   */
  readonly pk: string;
  /**
   * Charater birth year
   */
  readonly birthYear: string;
  /**
   * When note was created
   */
  readonly created: Date;
  /**
   * When note was edited last time
   */
  readonly edited: Date;
  /**
   * Charater eye color
   */
  readonly eyeColor: string;
  /**
   * Charater gender
   */
  readonly gender: string;
  /**
   * Charater hair color
   */
  readonly hairColor: string;
  /**
   *Charater height
   */
  readonly height: string;
  /**
   * Link to charater image
   */
  readonly image: string;
  /**
   * Charater mass
   */
  readonly mass: string;
  /**
   * Charater name
   */
  readonly name: string;
  /**
   * Charater skin color
   */
  readonly skinColor: string;
  /**
   * Charater homeworld
   * Related data. Personal key of planet
   */
  readonly homeworld: number;
}
