import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/core/guards/component-deactivate.guard';
import { Character } from 'src/app/core/models/characters';
import { Film } from 'src/app/core/models/film';
import { Planet } from 'src/app/core/models/planet';
import { FilmProcessingService } from 'src/app/core/services/film-processing.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import * as uuid from 'uuid';
/**
 * Form for add new film
 */
@Component({
  selector: 'app-films-adding',
  templateUrl: './films-adding.component.html',
  styleUrls: ['./films-adding.component.css'],
})
export class FilmsAddingComponent implements CanComponentDeactivate {
  /**
   * Observable with list of all planets
   */
  public readonly planets$: Observable<Planet[]>;

  /**
   * Observable with list of all characters
   */
  public readonly characters$: Observable<Character[]>;

  /**
   * Array with characters objects
   */
  public characters: Character[] = [];

  /**
   * Array with planets objects
   */
  public planets: Planet[] = [];

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

  private readonly canDeactivate$ = new BehaviorSubject(true);

  constructor(
    private readonly filmProcessingService: FilmProcessingService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
  ) {
    this.planets$ = this.filmProcessingService.getAllPlanets();
    this.characters$ = this.filmProcessingService.getAllCharacters();
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
   * If form has unsaved data open dialog
   * Else can redirect
   */
  public canDeactivate(): boolean | Observable<boolean> {
    return this.canDeactivate$.value || this.openExitDialog();
  }

  /**
   * Check, if form have unsaved data
   */
  public checkUnsavedData(): void {
    const hasNotEmptyRelatedArrays = Boolean(this.characters.length) || Boolean(this.planets.length);

    if (this.filmInfoForm.dirty || hasNotEmptyRelatedArrays) {
      this.canDeactivate$.next(false);
    } else {
      this.canDeactivate$.next(true);
    }
  }

  /**
   * Add or edit film
   */
  public addFilm(): void {
    this.canDeactivate$.next(true);
    const film: Film = {
      title: this.filmInfoForm.value.title,
      episodeId: this.filmInfoForm.value.episodeId,
      releaseDate: this.filmInfoForm.value.releaseDate,
      director: this.filmInfoForm.value.director,
      producer: this.filmInfoForm.value.producer,
      openingCrawl: this.filmInfoForm.value.openingCrawl,
      charactersID: this.characters.map(character => character.pk),
      planetsID: this.planets.map(planet => planet.pk),
      speciesID: [],
      vehiclesID: [],
      starshipsID: [],
      created: new Date(),
      pk: uuid.v4(),
    };

    this.filmProcessingService.addNewFilm(film).then(() => {
      this.router.navigateByUrl('/films/list');
    });
  }

  /**
   * Set charaters, that was marked in array
   */
  public updateCharactersList(options: MatListOption[]): void {
    this.characters = options.map(item => {
      return item.value;
    });
  }

  /**
   * Set planets, that was marked in array
   */
  public updatePlanetsList(options: MatListOption[]): void {
    this.planets = options.map(item => {
      return item.value;
    });
  }
}
