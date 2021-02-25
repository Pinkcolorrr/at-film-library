import { Injectable } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';

import { FilmDTO } from '../DTOs/film-dto';
import { FilmMapper } from '../mappers/film.mapper';
import { Film } from '../models/film';
import { QueryFilterParams } from '../models/query-filter-params';

import { PaginationControl } from './../../shared/utils';
import { ApiService } from './api.service';

/**
 * Service for work with films
 */
@Injectable({
  providedIn: 'root',
})
export class FilmService {
  /**
   * Mapper to convert films data from DTO
   */
  private readonly filmMapper = new FilmMapper();

  /**
   * Utils to control pagination states
   * As first and last film on page
   * The first and last element on the page.These docs are used in request on database
   */
  private readonly paginationControl = new PaginationControl<FilmDTO>();

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
    this.filters$.next(this.filmMapper.transformTitles(filters));
  }

  /**
   * Switch filter$ source from parameters object to source with applied filters
   * Using mapper for convert DTO
   */
  public filmsSourceInit(queryFilters: QueryFilterParams): Observable<Film[]> {
    this.filters$.next(queryFilters);

    return this.filters$.pipe(
      switchMap(filters => {
        return this.applyFilters(filters);
      }),
      map(films => {
        return films.map(item => {
          return this.filmMapper.transformResponse(item.payload.doc.data(), item.payload.doc.id);
        });
      }),
    );
  }

  /**
   * Apply filters, that was defined in object inside filter$
   */
  private applyFilters(filters: QueryFilterParams): Observable<DocumentChangeAction<FilmDTO>[]> {
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
  private getNextPage(filters: QueryFilterParams): Observable<DocumentChangeAction<FilmDTO>[]> {
    return this.apiService.nextPageRequest<FilmDTO>(filters, this.paginationControl.lastDocOnPage).pipe(
      tap(films => {
        this.isPrevPageAvailable$.next(true);

        if (!films.length) {
          this.isNextPageAvailable$.next(false);
          console.error('no more data available');
          this.paginationControl.firstDocsOnAllPages.push(this.paginationControl.firstDocOnPage);
          return;
        }
        this.isNextPageAvailable$.next(!(films.length < filters.limit));
        this.paginationControl.firstDocsOnAllPages.push(this.paginationControl.firstDocOnPage);
        this.paginationControl.setFirstAndLast(films);
      }),
    );
  }

  /**
   * Get previous page from db
   */
  private getPrevPage(filters: QueryFilterParams): Observable<DocumentChangeAction<FilmDTO>[]> {
    return this.apiService.prevPageRequest<FilmDTO>(filters, this.paginationControl.prevPageStartAt).pipe(
      tap(films => {
        this.isNextPageAvailable$.next(true);
        this.paginationControl.firstDocsOnAllPages.pop();
        this.isPrevPageAvailable$.next(!!this.paginationControl.firstDocsOnAllPages.length);
        this.paginationControl.setFirstAndLast(films);
      }),
    );
  }

  /**
   * Get first page from db
   */
  private getInitialPage(filters: QueryFilterParams): Observable<DocumentChangeAction<FilmDTO>[]> {
    return this.apiService.initialPageRequest<FilmDTO>(filters).pipe(
      tap(films => {
        if (!films.length) {
          return;
        }
        this.isNextPageAvailable$.next(!(films.length < filters.limit));
        this.isPrevPageAvailable$.next(false);
        this.paginationControl.firstDocsOnAllPages = [];
        this.paginationControl.setFirstAndLast(films);
      }),
    );
  }
}
