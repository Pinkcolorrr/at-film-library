import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CharacterDTO } from '../DTOs/characters-dto';
import { CharacterMapper } from '../mappers/characters.mapper';
import { Character } from '../models/characters';

/**
 * Service for work with characters
 */
@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private characterMapper = new CharacterMapper();
  constructor(private angularFire: AngularFirestore) {}

  /**
   * Getting data about character from db
   */
  public getCharacter(): Observable<Character[]> {
    return this.angularFire
      .collection<CharacterDTO>('people')
      .valueChanges()
      .pipe(
        map(character => {
          return this.characterMapper.transformArrayResponse(character);
        })
      );
  }
}
