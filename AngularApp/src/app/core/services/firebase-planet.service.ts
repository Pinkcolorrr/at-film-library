import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPlanetDOM } from '../interfaces/DOMs/planet-dom.interface';
import { IPlanetDTO } from '../interfaces/DTOs/planet-dto.interface';
import { PlanetMapper } from '../mappers/planet.mapper';

/**
 * Connect planet doc from db
 */
@Injectable({
  providedIn: 'root',
})
export class FirebasePlanetService {
  constructor(private angularFire: AngularFirestore) {}

  /**
   * Getting data about planets from db
   */
  public getData$(): Observable<Array<IPlanetDOM>> {
    return this.angularFire
      .collection<IPlanetDTO>('planets')
      .valueChanges()
      .pipe(
        map(planet => {
          return new PlanetMapper().transformResponse(planet);
        })
      );
  }
}
