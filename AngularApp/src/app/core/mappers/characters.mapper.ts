import { CharacterDTO } from '../DTOs/characters-dto';
import { Character } from '../models/characters';
import { QueryFilterParams } from '../models/query-filter-params';

/**
 * Mapping character data before send or accept
 */
export class CharacterMapper {
  /**
   * Transoform character DTO array to object model array
   */
  public transformArrayResponse(characterData: CharacterDTO[]): Character[] {
    return characterData.map(character => {
      return this.transformResponse(character);
    });
  }

  /**
   * Remove useless data from characterDTO
   */
  public transformResponse(character: CharacterDTO): Character {
    return {
      birthYear: character.fields.birth_year,
      created: new Date(character.fields.created),
      edited: new Date(character.fields.edited),
      eyeColor: character.fields.eye_color,
      gender: character.fields.gender,
      hairColor: character.fields.hair_color,
      height: character.fields.height,
      homeworld: character.fields.homeworld,
      image: character.fields.image,
      mass: character.fields.mass,
      name: character.fields.name,
      skinColor: character.fields.skin_color,
      pk: String(character.pk),
    };
  }

  /**
   * Transform titles, that used for table sorting, to server format
   */
  public transformTitles(filters: QueryFilterParams): QueryFilterParams {
    return {
      limit: filters.limit,
      pageDirection: filters.pageDirection,
      sortTarget: filters.sortTarget === 'pk' ? 'pk' : `fields.${filters.sortTarget}`,
      searchTarget: `fields.${filters.searchTarget}`,
      sortDirection: filters.sortDirection,
      searchValues: filters.searchValues,
      collectionName: filters.collectionName,
    };
  }
}
