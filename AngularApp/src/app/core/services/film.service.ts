import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FilmDTO } from '../DTOs/film-dto';
import { FilmMapper } from '../mappers/film.mapper';
import { Film } from '../models/film';

/**
 * Service for work with films
 */
@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private filmMapper = new FilmMapper();
  constructor(private angularFire: AngularFirestore) {}

  /**
   * Getting data about films from db
   */
  public getFilms(): Observable<Film[]> {
    return this.angularFire
      .collection<FilmDTO>('films')
      .valueChanges()
      .pipe(
        map(films => {
          return this.filmMapper.transformArrayResponse(films);
        })
      );
  }
}
