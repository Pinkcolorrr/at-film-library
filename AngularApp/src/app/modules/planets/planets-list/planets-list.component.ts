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
  private queryFilter = new QueryFilterParams('planets', 10, 'name');

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
    this.planetsData$ = this.planetService.planetsSource$.pipe(
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
      this.queryFilter.sortTarget = event.active;
      this.queryFilter.sortDirection = event.direction as 'asc' | 'desc';
    } else {
      this.queryFilter.sortTarget = 'pk';
      this.queryFilter.sortDirection = 'asc';
    }

    this.queryFilter.pageDirection = 'initial';
    this.planetService.setFilter(this.queryFilter);
  }

  /**
   * Switch table to next page
   */
  public nextPage(): void {
    this.queryFilter.pageDirection = 'next';
    this.turnOffPageBtns();

    this.planetService.setFilter(this.queryFilter);
  }

  /**
   * Switch table to previous page
   */
  public previousPage(): void {
    this.queryFilter.pageDirection = 'previous';
    this.turnOffPageBtns();

    this.planetService.setFilter(this.queryFilter);
  }

  /**
   * Filtering data by planet title
   */
  public filterByTitle(): void {
    this.queryFilter.searchValues = this.searchForm.value.searchValue.trim();
    this.queryFilter.pageDirection = 'initial';
    this.planetService.setFilter(this.queryFilter);
  }
}
