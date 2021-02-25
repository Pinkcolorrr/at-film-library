import { Injectable } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { CharacterDTO } from '../DTOs/characters-dto';
import { CharacterMapper } from '../mappers/characters.mapper';
import { Character } from '../models/characters';
import { QueryFilterParams } from '../models/query-filter-params';

import { PaginationControl } from './../../shared/utils';
import { ApiService } from './api.service';

/**
 * Service for work with characters
 */
@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  /**
   * Mapper to convert characters data from DTO
   */
  private readonly characterMapper = new CharacterMapper();

  /**
   * Utils to control pagination states
   * As first and last film on page
   * The first and last element on the page.
   * These docs are used in request on database
   */
  private readonly paginationControl = new PaginationControl<CharacterDTO>();

  /**
   * Filters, that define query params
   */
  private filters$ = new BehaviorSubject<QueryFilterParams>(null);

  /**
   * Observable for toggle next page button
   */
  public readonly isNextPageAvailable$ = new BehaviorSubject(true);

  /**
   * Observable for toggle previous page button
   */
  public readonly isPrevPageAvailable$ = new BehaviorSubject(false);

  constructor(
    /**
     * Service for connecting to API
     */
    private readonly apiService: ApiService,
  ) {}

  /**
   * Add new object in filter$ source, that trigger new server request
   */
  public setFilter(filters: QueryFilterParams): void {
    this.filters$.next(this.characterMapper.transformTitles(filters));
  }

  /**
   * Switch filter$ source from parameters object to source with applied filters
   * Using mapper for convert DTO
   */
  public charactersSourceInit(queryFilters: QueryFilterParams): Observable<Character[]> {
    this.filters$.next(queryFilters);

    return this.filters$.pipe(
      switchMap(filters => {
        return this.applyFilters(filters);
      }),
      map(characters => {
        return characters.map(item => {
          return this.characterMapper.transformResponse(item.payload.doc.data());
        });
      }),
    );
  }

  /**
   * Apply filters, that was defined in object inside filter$
   */
  private applyFilters(filters: QueryFilterParams): Observable<DocumentChangeAction<CharacterDTO>[]> {
    switch (filters.pageDirection) {
      case 'next': {
        return this.getNextPage(filters);
      }
      case 'previous': {
        return this.getPrevPage(filters);
      }
      case 'initial':
      default: {
        return this.getInitialPage(filters);
      }
    }
  }

  /**
   * Get next page from db
   */
  private getNextPage(filters: QueryFilterParams): Observable<DocumentChangeAction<CharacterDTO>[]> {
    return this.apiService.nextPageRequest<CharacterDTO>(filters, this.paginationControl.lastDocOnPage).pipe(
      tap(characters => {
        this.isPrevPageAvailable$.next(true);

        if (!characters.length) {
          this.isNextPageAvailable$.next(false);
          console.error('no more data available');
          this.paginationControl.firstDocsOnAllPages.push(this.paginationControl.firstDocOnPage);
          return;
        }
        this.isNextPageAvailable$.next(!(characters.length < filters.limit));
        this.paginationControl.firstDocsOnAllPages.push(this.paginationControl.firstDocOnPage);
        this.paginationControl.setFirstAndLast(characters);
      }),
    );
  }

  /**
   * Get previous page from db
   */
  private getPrevPage(filters: QueryFilterParams): Observable<DocumentChangeAction<CharacterDTO>[]> {
    return this.apiService.prevPageRequest<CharacterDTO>(filters, this.paginationControl.prevPageStartAt).pipe(
      tap(characters => {
        this.isNextPageAvailable$.next(true);
        this.paginationControl.firstDocsOnAllPages.pop();
        this.isPrevPageAvailable$.next(!!this.paginationControl.firstDocsOnAllPages.length);
        this.paginationControl.setFirstAndLast(characters);
      }),
    );
  }

  /**
   * Get first page from db
   */
  private getInitialPage(filters: QueryFilterParams): Observable<DocumentChangeAction<CharacterDTO>[]> {
    return this.apiService.initialPageRequest<CharacterDTO>(filters).pipe(
      tap(characters => {
        if (!characters.length) {
          return;
        }
        this.isNextPageAvailable$.next(!(characters.length < filters.limit));
        this.isPrevPageAvailable$.next(false);
        this.paginationControl.firstDocsOnAllPages = [];
        this.paginationControl.setFirstAndLast(characters);
      }),
    );
  }
}
