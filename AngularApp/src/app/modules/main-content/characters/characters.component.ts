import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ICharacterDOM } from 'src/app/core/interfaces/DOMs/characters-dom.interface';
import { FirebaseCharacterService } from 'src/app/core/services/firebase-character.service';

/**
 * Displaying table of characters
 */
@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * Observer characters data array
   */
  public readonly characterData = new MatTableDataSource<ICharacterDOM>();

  /**
   * Toggle loading spinner and matNoDataRow
   */
  public isLoading = true;

  /**
   * Coluns in table header
   */
  public readonly displayedColumns: Array<string> = ['name', 'gender', 'height', 'mass', 'skinColor'];
  private subscriber: Subscription;

  /**
   * Init sort object for table
   */
  @ViewChild(MatSort) public readonly sort: MatSort;
  /**
   * Init paginator object for table
   */
  @ViewChild(MatPaginator) public readonly paginator: MatPaginator;

  constructor(private readonly serviceAPI: FirebaseCharacterService) {}

  /**
   * Subscribe to observe characters data
   * Override characters method for table
   */
  public ngOnInit(): void {
    this.subscriber = this.serviceAPI.getData$().subscribe((characters: Array<ICharacterDOM>) => {
      this.characterData.data = characters;
      this.isLoading = false;
    });

    this.characterData.filterPredicate = (data: ICharacterDOM, filter: string): boolean => {
      return data.name.trim().toLowerCase().includes(filter.trim().toLowerCase());
    };
  }

  /**
   * Assign sort object for table
   * Assign paginator object for table
   */
  public ngAfterViewInit(): void {
    this.characterData.sort = this.sort;
    this.characterData.paginator = this.paginator;
  }

  /**
   * Unsubscribe to observe films data
   */
  public ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  /**
   * Filter table by name
   */
  public nameFilter(event: Event): void {
    this.characterData.filter = (event.target as HTMLTextAreaElement).value;
  }
}
