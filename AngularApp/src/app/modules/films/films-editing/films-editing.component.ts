import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Character } from 'src/app/core/models/characters';
import { Film } from 'src/app/core/models/film';
import { Planet } from 'src/app/core/models/planet';
import { FilmProcessingService } from 'src/app/core/services/film-processing.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

/**
 * Control of editing film form
 */
@Component({
  selector: 'app-films-editing',
  templateUrl: './films-editing.component.html',
  styleUrls: ['./films-editing.component.css'],
})
export class FilmsEditingComponent implements OnDestroy {
  /**
   * Object, that contain initial film data
   */
  public filmData: Film;

  /**
   * Observable with list of all planets
   */
  public readonly planets$: Observable<Planet[]>;

  /**
   * Observable with list of all characters
   */
  public readonly characters$: Observable<Character[]>;

  /**
   * If true, mat-selection-list of planets is opened, where user can select new related data
   * else simple mat-list is opened, where user can see alredy related data
   */
  public readonly isPlanetsChanging$ = new BehaviorSubject(false);

  /**
   * If true, mat-selection-list of characters is opened, where user can select new related data
   * else simple mat-list is opened, where user can see alredy related data
   */
  public readonly isCharactersChanging$ = new BehaviorSubject(false);

  /**
   * Show table after loading data
   */
  public readonly isLoading$ = new BehaviorSubject(true);

  /**
   * Show error, if failed to get the film
   */
  public readonly hasError$ = new BehaviorSubject(false);

  /**
   * Object for control film form
   */
  public readonly filmInfoForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    episodeId: new FormControl('', Validators.required),
    releaseDate: new FormControl('', Validators.required),
    director: new FormControl(''),
    producer: new FormControl(''),
    openingCrawl: new FormControl(''),
  });

  /**
   * Film personal key
   * Get from url and use in server request
   */
  private readonly filmPk = Number(this.activatedRoute.snapshot.params['pk']) || this.activatedRoute.snapshot.params['pk'];

  /**
   * Subscription on getting data from server
   */
  private readonly subscriptionFilmData: Subscription;

  /**
   * Check if arrays with related data was touch
   */
  private readonly canDeactivate$ = new BehaviorSubject(true);

  constructor(
    private readonly filmProcessingService: FilmProcessingService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly dialog: MatDialog,
  ) {
    this.subscriptionFilmData = this.filmProcessingService.getFilm(this.filmPk).subscribe({
      next: (film: Film): void => {
        this.filmData = film;

        this.filmInfoForm.setValue({
          title: this.filmData.title,
          episodeId: this.filmData.episodeId,
          releaseDate: this.filmData.releaseDate,
          director: this.filmData.director,
          producer: this.filmData.producer,
          openingCrawl: this.filmData.openingCrawl,
        });

        this.isLoading$.next(false);
      },
      error: (err: Error): void => {
        console.error(err);
        this.hasError$.next(true);
        this.isLoading$.next(false);
      },
    });

    this.planets$ = this.filmProcessingService.getAllPlanets().pipe(take(1));
    this.characters$ = this.filmProcessingService.getAllCharacters().pipe(take(1));
  }

  /**
   * Open dialog, to confirm leaving from page
   */
  private openExitDialog(): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm action',
        message: 'Are you sure you want to leave?',
        cancelBtnText: 'Cancel',
        confirmBtnText: 'Exit',
      },
    });

    return dialogRef.afterClosed().pipe(result => {
      return result;
    });
  }

  /**
   * Confirm of removing film
   */
  private openRemoveDialog(): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Remove film',
        message: 'Are you sure you want to remove this film?',
        cancelBtnText: 'Cancel',
        confirmBtnText: 'Remove',
      },
    });

    return dialogRef.afterClosed().pipe(result => {
      return result;
    });
  }

  /**
   * Unsubscribe after destroy component
   */
  public ngOnDestroy(): void {
    this.subscriptionFilmData.unsubscribe();
  }

  /**
   * If form has unsaved data open dialog
   * Else can redirect
   */
  public canDeactivate(): boolean | Observable<boolean> {
    return this.canDeactivate$.value || this.openExitDialog();
  }

  /**
   * Check if form have unsaved data
   */
  public checkUnsavedData(): void {
    if (this.filmInfoForm.dirty) {
      this.canDeactivate$.next(false);
    }
  }

  /**
   * Add or edit film
   */
  public editFilm(): void {
    this.canDeactivate$.next(true);
    this.isPlanetsChanging$.next(false);
    this.isCharactersChanging$.next(false);

    this.filmData = {
      title: this.filmInfoForm.value.title,
      episodeId: this.filmInfoForm.value.episodeId,
      releaseDate: this.filmInfoForm.value.releaseDate,
      director: this.filmInfoForm.value.director,
      producer: this.filmInfoForm.value.producer,
      openingCrawl: this.filmInfoForm.value.openingCrawl,
      charactersID: this.filmData.charactersList.map(character => character.pk),
      planetsID: this.filmData.planetsList.map(planet => planet.pk),
      speciesID: this.filmData.speciesID,
      vehiclesID: this.filmData.vehiclesID,
      starshipsID: this.filmData.starshipsID,
      created: new Date(),
      pk: this.filmData.pk,
      id: this.filmData.id,
    };

    this.filmProcessingService.editFilm(this.filmData).then(() => {
      this.router.navigateByUrl('/films/list');
    });
  }

  /**
   * Remove film
   */
  public removeFilm(): void {
    this.openRemoveDialog()
      .toPromise()
      .then(response => {
        if (response) {
          this.canDeactivate$.next(true);
          this.filmProcessingService.removeFilm(this.filmData).then(() => {
            this.router.navigateByUrl('/films/list');
          });
        }
      });
  }

  /**
   * Set charaters, that was marked in array
   */
  public updateCharactersList(options: MatListOption[]): void {
    this.canDeactivate$.next(false);
    this.filmData.charactersList = options.map(item => {
      return item.value;
    });
  }

  /**
   * Set planets, that was marked in array
   */
  public updatePlanetsList(options: MatListOption[]): void {
    this.canDeactivate$.next(false);
    this.filmData.planetsList = options.map(item => {
      return item.value;
    });
  }

  /**
   * Toggle isPlanetsChanging$
   */
  public toggleChangeModeForPlanets(): void {
    this.isPlanetsChanging$.next(!this.isPlanetsChanging$.value);
  }

  /**
   * Toggle isCharactersChanging$
   */
  public toggleChangeModeForCharacters(): void {
    this.isCharactersChanging$.next(!this.isCharactersChanging$.value);
  }

  /**
   * Selected realted characters in list of all characters
   */
  public checkPkInCharacters(pk: string | number): boolean {
    return Boolean(
      this.filmData.charactersList.find(item => {
        return item.pk === pk;
      }),
    );
  }

  /**
   * Selected realted planets in list of all planets
   */
  public checkPkInPlanets(pk: string | number): boolean {
    return Boolean(
      this.filmData.planetsList.find(item => {
        return item.pk === pk;
      }),
    );
  }
}
