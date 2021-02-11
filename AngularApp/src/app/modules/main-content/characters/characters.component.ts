import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Character } from 'src/app/core/models/characters';
import { CharacterService } from 'src/app/core/services/character.service';

/**
 * Displaying table of characters
 */
@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./../main-content.css'],
})
export class CharactersComponent {
  /**
   * Observer character data array
   */
  public characterData$: Observable<MatTableDataSource<Character>>;

  /**
   * Toggle loading spinner and matNoDataRow
   */
  public isLoading$ = new BehaviorSubject(true);

  /**
   * Value to filter characters
   */
  public filterValue$ = new BehaviorSubject('');

  /**
   * Columns in table header
   */
  public readonly displayedColumns: string[] = ['name', 'gender', 'height', 'mass', 'skinColor'];

  /**
   * Init sort object for table
   */
  @ViewChild(MatSort) public readonly sort: MatSort;

  /**
   * Init paginator object for table
   */
  @ViewChild(MatPaginator) public readonly paginator: MatPaginator;

  constructor(private readonly characterService: CharacterService) {
    this.characterData$ = this.characterService.getCharacter().pipe(
      map(character => {
        return this.initMatTable(character);
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

  private initMatTable(character: Character[]): MatTableDataSource<Character> {
    const matTableDataSource = new MatTableDataSource(character);

    matTableDataSource.filterPredicate = this.filterPredicateFunction;
    matTableDataSource.sort = this.sort;
    matTableDataSource.paginator = this.paginator;

    return matTableDataSource;
  }

  private filterPredicateFunction(data: Character, filter: string): boolean {
    return data.name.trim().toLowerCase().includes(filter.trim().toLowerCase());
  }
}
