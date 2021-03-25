import { RequestOptions } from '../../models/RequestOptions';
import { SortTargetDto } from '../../utils/types';
import { RequestOptionsDTO } from '../dtos/RequestOptionsDto';

/**  Mapping options, that shape request to API */
export const RequestOptionsMapper = {
  transofrmRequest(options: RequestOptions): RequestOptionsDTO {
    let sortTarget: SortTargetDto;

    switch (options.sortTarget) {
      case 'Name': {
        sortTarget = 'fields.name';
        break;
      }
      default: {
        sortTarget = 'pk';
        break;
      }
    }

    return {
      chunkSize: options.chunkSize,
      sortTarget,
    };
  },
};
