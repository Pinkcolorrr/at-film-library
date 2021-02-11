import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PlanetDTO } from '../DTOs/planet-dto';
import { PlanetMapper } from '../mappers/planet.mapper';
import { Planet } from '../models/planet';

/**
 * Service for work with planets
 */
@Injectable({
  providedIn: 'root',
})
export class PlanetService {
  private planetMapper = new PlanetMapper();
  constructor(private angularFire: AngularFirestore) {}

  /**
   * Getting data about planets from db
   */
  public getPlanets(): Observable<Planet[]> {
    return this.angularFire
      .collection<PlanetDTO>('planets')
      .valueChanges()
      .pipe(
        map(planet => {
          return this.planetMapper.transformArrayResponse(planet);
        })
      );
  }
}
