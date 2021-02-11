/**
 * Interface for firebase DTO
 */
export interface FirebaseDTO {
  /**
   * Main object fields
   */
  readonly fields: Record<string, string | Date | number | number[]>;
  /**
   * Type of object
   */
  readonly model: string;
  /**
   * Personal key
   */
  readonly pk: number;
}
