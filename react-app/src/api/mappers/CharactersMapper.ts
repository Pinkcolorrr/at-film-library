import { Character } from '../../models/Character';
import { getNumberFromString } from '../../utils/utils';
import { CharacterDTO } from '../dtos/CharactersDto';

/** Mapping character data before send or accept */
export const CharacterMapper = {
  /** Transoform character DTO array to object model array */
  transformArrayResponse(characterData: CharacterDTO[], id: string[]): Character[] {
    return characterData.map((character, index) => this.transformResponse(character, id[index]));
  },

  /** Remove useless data from characterDTO */
  transformResponse(character: CharacterDTO, characterId: string): Character {
    return {
      created: new Date(character.fields.created),
      pk: String(character.pk),
      id: characterId,
      birthYear: character.fields.birth_year,
      eyeColor: character.fields.eye_color,
      name: character.fields.name,
      gender: character.fields.gender,
      hairColor: character.fields.hair_color,
      height: getNumberFromString(character.fields.height),
      mass: getNumberFromString(character.fields.mass),
      homeworld: character.fields.homeworld,
      image: character.fields.image,
      skinColor: character.fields.skin_color,
    };
  },
};
