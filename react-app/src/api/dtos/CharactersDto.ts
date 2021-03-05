import { FirebaseDTO } from './FirebaseDto';

/**
 * Interface for character DTO
 */
export interface CharacterDTO extends FirebaseDTO {
  /**
   * Main object fields
   */
  readonly fields: {
    /**
     * Charater birth year
     */
    readonly birth_year: string;
    /**
     * When note was created
     */
    readonly created: string;
    /**
     * When note was edited last time
     */
    readonly edited: string;
    /**
     * Charater eye color
     */
    readonly eye_color: string;
    /**
     * Charater gender
     */
    readonly gender: string;
    /**
     * Charater hair color
     */
    readonly hair_color: string;
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
    readonly skin_color: string;
    /**
     * Charater homeworld
     * Related data. Personal key of planet
     */
    readonly homeworld: number;
  };
}
