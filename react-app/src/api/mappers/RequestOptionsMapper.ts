import { RequestOptions } from '../../models/RequestOptions';

/**  Mapping options, that shape request to API */
export class RequestOptionsMapper {
  public transofrmRequest(options: RequestOptions): RequestOptions {
    return {
      chunkSize: options.chunkSize,
      sortTarget: options.sortTarget?.toLowerCase() === 'default' ? 'pk' : `fields.${options.sortTarget}`.toLowerCase(),
    };
  }
}
