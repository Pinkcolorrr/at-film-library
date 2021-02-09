import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICharacterDOM } from '../interfaces/DOMs/characters-dom.interface';
import { ICharacterDTO } from '../interfaces/DTOs/characters-dto.interface';
import { CharacterMapper } from '../mappers/characters.mapper';

/**
 * Connect character doc from db
 */
@Injectable({
  providedIn: 'root',
})
export class FirebaseCharacterService {
  constructor(private angularFire: AngularFirestore) {}

  /**
   * Getting data about character from db
   */
  public getData$(): Observable<Array<ICharacterDOM>> {
    return this.angularFire
      .collection<ICharacterDTO>('people')
      .valueChanges()
      .pipe(
        map(character => {
          return new CharacterMapper().transformResponse(character);
        })
      );
  }
}
