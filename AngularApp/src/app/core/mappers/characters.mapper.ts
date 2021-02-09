import { ICharacterDOM } from '../interfaces/DOMs/characters-dom.interface';
import { ICharacterDTO } from '../interfaces/DTOs/characters-dto.interface';

/**
 * Mapping character data before send or accept
 */
export class CharacterMapper {
  /**
   * Remove useless data from characterDTO
   */
  public transformResponse(characterData: Array<ICharacterDTO>): Array<ICharacterDOM> {
    return characterData.map(character => {
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
      };
    });
  }
}
