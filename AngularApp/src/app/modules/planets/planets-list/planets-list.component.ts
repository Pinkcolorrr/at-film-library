import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Planet } from 'src/app/core/models/planet';
import { QueryFilterParams } from 'src/app/core/models/query-filter-params';
import { PlanetService } from 'src/app/core/services/planet.service';

/**
 * Wrapper for various planets pagess
 */
@Component({
  selector: 'app-planets',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.css'],
})
export class PlanetsListComponent {
  private queryFilters = new QueryFilterParams('planets', 10, 'name');

  /**
   * Form for searching planets
   */
  public searchForm: FormGroup = new FormGroup({
    searchValue: new FormControl(null),
  });

  /**
   * Observable planet data array
   */
  public readonly planetsData$: Observable<Planet[]>;

  /**
   * Toggle loading spinner and matNoDataRow
   */
  public readonly isLoading$ = new BehaviorSubject(true);

  /**
   * Observable for toggle next button
   */
  public readonly isNextPageAvailable$ = this.planetService.isNextPageAvailable$;

  /**
   * Observable for toggle prev button
   */
  public readonly isPrevPageAvailable$ = this.planetService.isPrevPageAvailable$;

  /**
   * Colums in table header
   */
  public readonly displayedColumns: string[] = ['title', 'population', 'terrain'];

  constructor(private readonly planetService: PlanetService) {
    this.planetsData$ = this.planetService.planetsSourceInit(this.queryFilters).pipe(
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
   * Add information about, how planets have to be sorted, in queryFilter.
   * Send request for sorting planets.
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
    this.planetService.setFilter(this.queryFilters);
  }

  /**
   * Switch table to next page
   */
  public nextPage(): void {
    this.queryFilters.pageDirection = 'next';
    this.turnOffPageBtns();

    this.planetService.setFilter(this.queryFilters);
  }

  /**
   * Switch table to previous page
   */
  public previousPage(): void {
    this.queryFilters.pageDirection = 'previous';
    this.turnOffPageBtns();

    this.planetService.setFilter(this.queryFilters);
  }

  /**
   * Filtering data by planet title
   */
  public filterByTitle(): void {
    this.queryFilters.searchValues = this.searchForm.value.searchValue.trim();
    this.queryFilters.pageDirection = 'initial';
    this.planetService.setFilter(this.queryFilters);
  }
}
