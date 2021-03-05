/**
 * Interface for firebase DTO
 */
export interface FirebaseDTO {
  /**
   * Main object fields
   */
  readonly fields: object;
  /**
   * Type of object
   */
  readonly model: string;
  /**
   * Personal key
   */
  readonly pk: number | string;

  readonly id?: string;
}
