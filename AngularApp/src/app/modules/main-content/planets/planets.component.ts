import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { IPlanetDOM } from 'src/app/core/interfaces/DOMs/planet-dom.interface';
import { FirebasePlanetService } from 'src/app/core/services/firebase-planet.service';

/**
 * Displaying table of planets
 */
@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css'],
  providers: [FirebasePlanetService],
})
export class PlanetsComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * Observer planet data array
   */
  public readonly planetData = new MatTableDataSource<IPlanetDOM>();

  /**
   * Toggle loading spinner and matNoDataRow
   */
  public isLoading = true;

  /**
   * Coluns in table header
   */
  public readonly displayedColumns: Array<string> = ['title', 'population', 'terrain'];
  private subscriber: Subscription;

  /**
   * Init sort object for table
   */
  @ViewChild(MatSort) public readonly sort: MatSort;
  /**
   * Init paginator object for table
   */
  @ViewChild(MatPaginator) public readonly paginator: MatPaginator;

  constructor(private readonly serviceAPI: FirebasePlanetService) {}

  /**
   * Subscribe to observe films data
   * Override filter method for table
   */
  public ngOnInit(): void {
    this.subscriber = this.serviceAPI.getData$().subscribe((planets: Array<IPlanetDOM>) => {
      this.planetData.data = planets;
      this.isLoading = false;
    });

    this.planetData.filterPredicate = (data: IPlanetDOM, filter: string): boolean => {
      return data.title.trim().toLowerCase().includes(filter.trim().toLowerCase());
    };
  }

  /**
   * Assign sort object for table
   * Assign paginator object for table
   */
  public ngAfterViewInit(): void {
    this.planetData.sort = this.sort;
    this.planetData.paginator = this.paginator;
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
    this.planetData.filter = (event.target as HTMLTextAreaElement).value;
  }
}
