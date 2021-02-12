import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Planet } from 'src/app/core/models/planet';
import { PlanetService } from 'src/app/core/services/planet.service';

/**
 * Displaying table of planets
 */
@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['planets-list.component.css'],
})
export class PlanetsListComponent {
  /**
   * Observer planets data array
   */
  public planetData$: Observable<MatTableDataSource<Planet>>;

  /**
   * Toggle loading spinner and matNoDataRow
   */
  public isLoading$ = new BehaviorSubject(true);

  /**
   * Value to filter planets
   */
  public filterValue$ = new BehaviorSubject('');

  /**
   * Coluns in table header
   */
  public readonly displayedColumns: string[] = ['title', 'population', 'terrain'];
  /**
   * Init sort object for table
   */
  @ViewChild(MatSort) public readonly sort: MatSort;
  /**
   * Init paginator object for table
   */
  @ViewChild(MatPaginator) public readonly paginator: MatPaginator;

  constructor(private readonly planetService: PlanetService) {
    this.planetData$ = this.planetService.getPlanets().pipe(
      map(planet => {
        return this.initMatTable(planet);
      }),
      tap(() => {
        return this.isLoading$.next(false);
      })
    );
  }

  /**
   * Filter table by title
   */
  public filterData(event: Event): void {
    this.filterValue$.next((event.target as HTMLTextAreaElement).value);
  }

  private initMatTable(planet: Planet[]): MatTableDataSource<Planet> {
    const matTableDataSource = new MatTableDataSource(planet);

    matTableDataSource.filterPredicate = this.filterPredicateFunction;
    matTableDataSource.sort = this.sort;
    matTableDataSource.paginator = this.paginator;

    return matTableDataSource;
  }

  private filterPredicateFunction(data: Planet, filter: string): boolean {
    return data.title.trim().toLowerCase().includes(filter.trim().toLowerCase());
  }
}
