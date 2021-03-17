import { Character } from '../../models/Characters';
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
      birthYear: character.fields.birth_year,
      created: new Date(character.fields.created),
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
      id: characterId,
    };
  },
};
