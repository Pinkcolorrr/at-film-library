import { Injectable } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { CharacterDTO } from '../DTOs/characters-dto';
import { FilmDTO } from '../DTOs/film-dto';
import { PlanetDTO } from '../DTOs/planet-dto';
import { CharacterMapper } from '../mappers/characters.mapper';
import { FilmMapper } from '../mappers/film.mapper';
import { PlanetMapper } from '../mappers/planet.mapper';
import { Character } from '../models/characters';
import { Film } from '../models/film';
import { Planet } from '../models/planet';

import { ApiService } from './api.service';

/**
 * Processing changing films data
 */
@Injectable({
  providedIn: 'root',
})
export class FilmProcessingService {
  private readonly filmMapper = new FilmMapper();
  private readonly planetMapper = new PlanetMapper();
  private readonly characterMapper = new CharacterMapper();

  constructor(private readonly apiService: ApiService) {}

  /**
   * Remove film from db
   */
  public removeFilm(film: Film): Promise<void> {
    return this.apiService.removeItem('films', film.id);
  }

  /**
   * Add new film in database
   */
  public addNewFilm(film: Film): Promise<DocumentReference<unknown>> {
    return this.apiService.addNewItem<FilmDTO>('films', this.filmMapper.transformRequset(film));
  }

  /**
   * Add new film in database
   */
  public editFilm(film: Film): Promise<void> {
    return this.apiService.editItem('films', this.filmMapper.transformRequset(film), film.id);
  }

  /**
   * Get all available films from db
   */
  public getAllCharacters(): Observable<Character[]> {
    return this.apiService.getAllData<CharacterDTO>('people').pipe(
      take(1),
      map(characters => {
        return this.characterMapper.transformArrayResponse(characters);
      }),
    );
  }

  /**
   * Get all available films from db
   */
  public getAllPlanets(): Observable<Planet[]> {
    return this.apiService.getAllData<PlanetDTO>('planets').pipe(
      take(1),
      map(planets => {
        return this.planetMapper.transformArrayResponse(planets);
      }),
    );
  }

  /**
   * Get film by personal key
   */
  public getFilm(pk: number | string): Observable<any> {
    return this.apiService.getItemsByKey<FilmDTO>('films', pk).pipe(
      map(film => {
        return this.filmMapper.transformResponse(film[0].payload.doc.data(), film[0].payload.doc.id);
      }),
      switchMap(film => {
        return this.addPlanetData(film);
      }),
      switchMap(film => {
        return this.addCharactersData(film);
      }),
    );
  }

  /**
   * Add planets related data to film
   */
  private addPlanetData(film: Film): Observable<Film> {
    return this.apiService.getItemsByKey<PlanetDTO>('planets', film.planetsID).pipe(
      take(1),
      map(planet => {
        film.planetsList = this.planetMapper.transformArrayResponse(planet.map(pl => pl.payload.doc.data()));
        return film;
      }),
    );
  }

  /**
   * Add characters related data to film
   */
  private addCharactersData(film: Film): Observable<Film> {
    return this.apiService.getItemsByKey<CharacterDTO>('people', film.charactersID).pipe(
      take(1),
      map(character => {
        film.charactersList = this.characterMapper.transformArrayResponse(character.map(ch => ch.payload.doc.data()));
        return film;
      }),
    );
  }
}
