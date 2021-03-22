import { sortTargetDto } from '../../utils/types';

/** Options for requset list of film/planets/characters */
export interface RequestOptionsDTO {
  /** Number of loaded data */
  chunkSize: number;
  /** How data will be sorted */
  sortTarget: sortTargetDto;
}
