import { Character } from '../../models/Character';
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
      height: Number.isNaN(character.fields.height) ? undefined : Number(character.fields.height),
      mass: Number.isNaN(character.fields.mass) ? undefined : Number(character.fields.mass),
      homeworld: character.fields.homeworld,
      image: character.fields.image,
      skinColor: character.fields.skin_color,
    };
  },
};
