import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CharacterDTO } from '../DTOs/characters-dto';
import { FilmDTO } from '../DTOs/film-dto';
import { PlanetDTO } from '../DTOs/planet-dto';
import { CharacterMapper } from '../mappers/characters.mapper';
import { FilmMapper } from '../mappers/film.mapper';
import { PlanetMapper } from '../mappers/planet.mapper';
import { Film } from '../models/film';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class FilmProcessingService {
  private readonly filmMapper = new FilmMapper();
  private readonly planetMapper = new PlanetMapper();
  private readonly characterMapper = new CharacterMapper();

  constructor(private readonly apiService: ApiService) {}

  /**
   * getFilm
   */
  public getFilm(id: number): Observable<Film> {
    return this.apiService.getItemsByKey<FilmDTO>('films', id).pipe(
      map(film => {
        const filmModel = this.filmMapper.transformResponse(film[0]);

        filmModel.planets$ = this.getRealtedData<PlanetDTO>('planets', filmModel.planets).pipe(
          map(planet => {
            return this.planetMapper.transformArrayResponse(planet);
          }),
        );

        filmModel.characters$ = this.getRealtedData<CharacterDTO>('people', filmModel.characters).pipe(
          map(character => {
            return this.characterMapper.transformArrayResponse(character);
          }),
        );

        return filmModel;
      }),
    );
  }

  /**
   * getFilm
   */
  public getRealtedData<T>(requestTarget: string, idArray: number[]): Observable<T[]> {
    return this.apiService.getItemsByKey<T>(requestTarget, idArray);
  }
}
