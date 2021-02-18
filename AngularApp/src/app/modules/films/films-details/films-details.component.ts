import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { FilmProcessingService } from 'src/app/core/services/film-details.service';

/**
 * Detail information about each film
 */
@Component({
  selector: 'app-films-details',
  templateUrl: './films-details.component.html',
  styleUrls: ['./films-details.component.css'],
})
export class FilmsDetailsComponent implements OnDestroy {
  /**
   * Object with film data
   */
  public filmData: Film;

  /**
   * Get film id from url params
   */
  private filmID = Number(this.activatedRoute.snapshot.params['id']);

  private subscription: Subscription;

  constructor(private readonly filmProcessingService: FilmProcessingService, private readonly activatedRoute: ActivatedRoute) {
    this.subscription = this.filmProcessingService.getFilm(this.filmID).subscribe(film => {
      this.filmData = film;
    });
  }

  /**
   * Unsubscribe after component destroy
   */
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
