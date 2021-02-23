import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Film } from 'src/app/core/models/film';
import { QueryFilterParams } from 'src/app/core/models/query-filter-params';
import { FilmService } from 'src/app/core/services/film.service';

/**
 * Films list table displaying
 */
@Component({
  selector: 'app-fimls-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css'],
})
export class FimlsListComponent {
  private queryFilters = new QueryFilterParams('films', 2, 'title');

  /**
   * Form for searching films
   */
  public searchForm: FormGroup = new FormGroup({
    searchValue: new FormControl(null),
  });

  /**
   * Observable film data array
   */
  public readonly filmsData$: Observable<Film[]>;

  /**
   * Toggle loading spinner and matNoDataRow
   */
  public readonly isLoading$ = new BehaviorSubject(true);

  /**
   * Observable for toggle next button
   */
  public readonly isNextPageAvailable$ = this.filmService.isNextPageAvailable$;

  /**
   * Observable for toggle prev button
   */
  public readonly isPrevPageAvailable$ = this.filmService.isPrevPageAvailable$;

  /**
   * Colums in table header
   */
  public readonly displayedColumns: string[] = ['episodeId', 'title', 'releaseDate', 'director', 'producer', 'filmLink'];

  constructor(private readonly filmService: FilmService) {
    this.filmsData$ = this.filmService.filmsSourceInit(this.queryFilters).pipe(
      tap(() => {
        if (this.isLoading$.value) {
          this.isLoading$.next(false);
        }
      }),
    );
  }

  private turnOffPageBtns(): void {
    this.isPrevPageAvailable$.next(false);
    this.isNextPageAvailable$.next(false);
  }

  /**
   * Add information about, how films have to be sorted, in queryFilter.
   * Send request for sorting films.
   */
  public matSort(event: Sort): void {
    if (event.direction) {
      this.queryFilters.sortTarget = event.active;
      this.queryFilters.sortDirection = event.direction as 'asc' | 'desc';
    } else {
      this.queryFilters.sortTarget = 'pk';
      this.queryFilters.sortDirection = 'asc';
    }

    this.queryFilters.pageDirection = 'initial';
    this.filmService.setFilter(this.queryFilters);
  }

  /**
   * Switch table to next page
   */
  public nextPage(): void {
    this.queryFilters.pageDirection = 'next';
    this.turnOffPageBtns();

    this.filmService.setFilter(this.queryFilters);
  }

  /**
   * Switch table to previous page
   */
  public previousPage(): void {
    this.queryFilters.pageDirection = 'previous';
    this.turnOffPageBtns();

    this.filmService.setFilter(this.queryFilters);
  }

  /**
   * Filtering data by film title
   */
  public filterByTitle(): void {
    this.queryFilters.searchValues = this.searchForm.value.searchValue.trim();
    this.queryFilters.pageDirection = 'initial';
    this.filmService.setFilter(this.queryFilters);
  }
}
