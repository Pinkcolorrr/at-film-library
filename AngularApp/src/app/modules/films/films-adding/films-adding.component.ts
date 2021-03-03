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
import { ContentProcessingService } from 'src/app/core/services/content-processing.service';
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
  public readonly allPlanets$: Observable<Planet[]>;

  /**
   * Observable with list of all characters
   */
  public readonly allCharacters$: Observable<Character[]>;

  /**
   * Array with characters objects
   */
  public relatedCharactersList: Character[] = [];

  /**
   * Array with planets objects
   */
  public relatedPlanetsList: Planet[] = [];

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
    private readonly filmProcessingService: ContentProcessingService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
  ) {
    this.allPlanets$ = this.filmProcessingService.getAllPlanets();
    this.allCharacters$ = this.filmProcessingService.getAllCharacters();
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
    const hasNotEmptyRelatedArrays = Boolean(this.relatedCharactersList.length) || Boolean(this.relatedPlanetsList.length);

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
      charactersID: this.relatedCharactersList.map(character => character.pk),
      planetsID: this.relatedPlanetsList.map(planet => planet.pk),
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
   * Track characters
   */
  public trackByCharactersPk(index: number, item: Character): String {
    return item.pk;
  }

  /**
   * Track planets
   */
  public trackByPlanetsPk(index: number, item: Planet): String {
    return item.pk;
  }

  /**
   * Set charaters, that was marked in array
   */
  public updateCharactersList(options: MatListOption[]): void {
    this.relatedCharactersList = options.map(item => {
      return item.value;
    });
  }

  /**
   * Set planets, that was marked in array
   */
  public updatePlanetsList(options: MatListOption[]): void {
    this.relatedPlanetsList = options.map(item => {
      return item.value;
    });
  }
}
