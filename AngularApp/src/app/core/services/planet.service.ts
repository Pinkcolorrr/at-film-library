import { Injectable } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { PlanetDTO } from '../DTOs/planet-dto';
import { PlanetMapper } from '../mappers/planet.mapper';
import { Planet } from '../models/planet';
import { QueryFilterParams } from '../models/query-filter-params';

import { ApiService } from './api.service';
import { PaginationControlService } from './pagination-control.service';

/**
 * Service for work with planets
 */
@Injectable({
  providedIn: 'root',
})
export class PlanetService {
  /**
   * Mapper to convert planets data from DTO
   */
  private readonly planetMapper = new PlanetMapper();

  /**
   * Filters, that define query params
   */
  private filters$: BehaviorSubject<QueryFilterParams>;

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
     * Service to control pagination states
     * As first and last planet on page
     * The first and last element on the page.These docs are used in request on database
     */
    private readonly paginationControl: PaginationControlService<PlanetDTO>,

    /**
     * Service for connecting to API
     */
    private readonly apiService: ApiService,
  ) {}

  /**
   * Add new object in filter$ source, that trigger new server request
   */
  public setFilter(filters: QueryFilterParams): void {
    this.filters$.next(this.planetMapper.transformTitles(filters));
  }

  /**
   * Switch filter$ source from parameters object to source with applied filters
   * Using mapper for convert DTO
   */
  public planetsSourceInit(queryFilters: QueryFilterParams): Observable<Planet[]> {
    this.filters$ = new BehaviorSubject(queryFilters);

    return this.filters$.pipe(
      switchMap(filters => {
        return this.applyFilters(filters);
      }),
      map(planets => {
        return planets.map(item => {
          return this.planetMapper.transformResponse(item.payload.doc.data());
        });
      }),
    );
  }

  /**
   * Apply filters, that was defined in object inside filter$
   */
  private applyFilters(filters: QueryFilterParams): Observable<DocumentChangeAction<PlanetDTO>[]> {
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
  private getNextPage(filters: QueryFilterParams): Observable<DocumentChangeAction<PlanetDTO>[]> {
    return this.apiService.nextPageRequest<PlanetDTO>(filters, this.paginationControl.lastDocOnPage).pipe(
      tap(planets => {
        this.isPrevPageAvailable$.next(true);

        if (!planets.length) {
          this.isNextPageAvailable$.next(false);
          console.error('no more data available');
          this.paginationControl.firstDocsOnAllPages.push(this.paginationControl.firstDocOnPage);
          return;
        }
        this.isNextPageAvailable$.next(!(planets.length < filters.limit));
        this.paginationControl.firstDocsOnAllPages.push(this.paginationControl.firstDocOnPage);
        this.paginationControl.setFirstAndLast(planets);
      }),
    );
  }

  /**
   * Get previous page from db
   */
  private getPrevPage(filters: QueryFilterParams): Observable<DocumentChangeAction<PlanetDTO>[]> {
    return this.apiService.prevPageRequest<PlanetDTO>(filters, this.paginationControl.prevPageStartAt).pipe(
      tap(planets => {
        this.isNextPageAvailable$.next(true);
        this.paginationControl.firstDocsOnAllPages.pop();
        this.isPrevPageAvailable$.next(!!this.paginationControl.firstDocsOnAllPages.length);
        this.paginationControl.setFirstAndLast(planets);
      }),
    );
  }

  /**
   * Get first page from db
   */
  private getInitialPage(filters: QueryFilterParams): Observable<DocumentChangeAction<PlanetDTO>[]> {
    return this.apiService.initialPageRequest<PlanetDTO>(filters).pipe(
      tap(planets => {
        if (!planets.length) {
          return;
        }
        this.isNextPageAvailable$.next(!(planets.length < filters.limit));
        this.isPrevPageAvailable$.next(false);
        this.paginationControl.firstDocsOnAllPages = [];
        this.paginationControl.setFirstAndLast(planets);
      }),
    );
  }
}
