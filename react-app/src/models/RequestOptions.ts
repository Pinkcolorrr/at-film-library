/** Options for requset list of film/planets/characters */
export interface RequestOptions {
  /** Number of loaded data */
  chunkSize: number;
  /** How data will be sorted */
  sortTarget: string;
}
