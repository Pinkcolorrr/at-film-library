import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { IFilmDOM } from 'src/app/core/interfaces/DOMs/film-dom.interface';
import { FirebaseFilmService } from 'src/app/core/services/firebase-film.service';

/**
 * Displaying table of films
 */
@Component({
  selector: 'app-fimls',
  templateUrl: './fimls.component.html',
  styleUrls: ['./fimls.component.css'],
  providers: [FirebaseFilmService],
})
export class FimlsComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * Observer film data array
   */
  public readonly filmData = new MatTableDataSource<IFilmDOM>();
  /**
   * Coluns in table header
   */
  public readonly displayedColumns: Array<string> = ['episodeId', 'title', 'releaseDate', 'director', 'producer'];
  private subscriber: Subscription;

  /**
   * Init sort object for table
   */
  @ViewChild(MatSort) public readonly sort: MatSort;
  /**
   * Init paginator object for table
   */
  @ViewChild(MatPaginator) public readonly paginator: MatPaginator;

  constructor(private readonly serviceAPI: FirebaseFilmService) {}

  /**
   * Subscribe to observe films data
   * Override filter method for table
   */
  public ngOnInit(): void {
    this.subscriber = this.serviceAPI.getData$().subscribe((films: Array<IFilmDOM>) => {
      this.filmData.data = films;
    });

    this.filmData.filterPredicate = (data: IFilmDOM, filter: string): boolean => {
      return data.title.trim().toLowerCase().includes(filter.trim().toLowerCase());
    };
  }

  /**
   * Assign sort object for table
   * Assign paginator object for table
   */
  public ngAfterViewInit(): void {
    this.filmData.sort = this.sort;
    this.filmData.paginator = this.paginator;
  }

  /**
   * Unsubscribe to observe films data
   */
  public ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  /**
   * Filter table by title
   */
  public titleFilter(event: Event): void {
    this.filmData.filter = (event.target as HTMLTextAreaElement).value;
  }
}
