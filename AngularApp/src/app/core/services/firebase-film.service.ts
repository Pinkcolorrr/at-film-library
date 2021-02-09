import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IFilmDOM } from '../interfaces/DOMs/film-dom.interface';
import { IFilmDTO } from '../interfaces/DTOs/film-dto.interface';
import { FilmMapper } from '../mappers/film.mapper';

/**
 * Connect film doc from db
 */
@Injectable({
  providedIn: 'root',
})
export class FirebaseFilmService {
  constructor(private angularFire: AngularFirestore) {}

  /**
   * Getting data about films from db
   */
  public getData$(): Observable<Array<IFilmDOM>> {
    return this.angularFire
      .collection<IFilmDTO>('films')
      .valueChanges()
      .pipe(
        map(films => {
          return new FilmMapper().transformResponse(films);
        })
      );
  }
}
