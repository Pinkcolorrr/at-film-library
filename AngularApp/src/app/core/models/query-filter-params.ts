/**
 * Filter to control query on db
 */
export class QueryFilterParams {
  constructor(
    /**
     * Target of filtering
     */
    public target: 'films' | 'planets' | 'people',
    /**
     * Defite how many items will be load
     */
    public limit: number = 10,

    /**
     * The field to be used for searching
     */
    public searchTarget: string = 'fields',

    /**
     * The value by which the search will be performed
     */
    public searchValues: string = null,
    /**
     * Define which page will be load
     */
    public pageDirection: 'next' | 'previous' | 'initial' = 'initial',

    /**
     * The field to be used for sorting
     */
    public sortTarget: string = 'pk',

    /**
     * Sort direction
     * asc - from smallest to largest
     * desc = from largest to smallest
     */
    public sortDirection: 'asc' | 'desc' = 'asc',
  ) {}
}
