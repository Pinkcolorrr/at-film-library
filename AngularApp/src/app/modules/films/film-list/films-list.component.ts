import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Film } from 'src/app/core/models/film';
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
  /**
   * Observer film data array
   */
  public filmData$: Observable<MatTableDataSource<Film>>;

  /**
   * Toggle loading spinner and matNoDataRow
   */
  public isLoading$ = new BehaviorSubject(true);

  /**
   * Value to filter films
   */
  public filterValue$ = new BehaviorSubject('');

  /**
   * Coluns in table header
   */
  public readonly displayedColumns: string[] = ['episodeId', 'title', 'releaseDate', 'director', 'producer', 'filmLink'];
  /**
   * Init sort object for table
   */
  @ViewChild(MatSort) public readonly sort: MatSort;
  /**
   * Init paginator object for table
   */
  @ViewChild(MatPaginator) public readonly paginator: MatPaginator;

  constructor(private readonly filmService: FilmService) {
    this.filmData$ = this.filmService.getFilms().pipe(
      map(film => {
        return this.initMatTable(film);
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

  private initMatTable(film: Film[]): MatTableDataSource<Film> {
    const matTableDataSource = new MatTableDataSource(film);

    matTableDataSource.filterPredicate = this.filterPredicateFunction;
    matTableDataSource.sort = this.sort;
    matTableDataSource.paginator = this.paginator;

    return matTableDataSource;
  }

  private filterPredicateFunction(data: Film, filter: string): boolean {
    return data.title.trim().toLowerCase().includes(filter.trim().toLowerCase());
  }
}
