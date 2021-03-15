import firebase from 'firebase/app';
import 'firebase/firestore';
import { Character } from '../../models/Characters';
import { firebaseConverter } from '../../utils/FirebaseConverters';
import { getChunkedArray } from '../../utils/utils';
import { CharacterDTO } from '../dtos/CharactersDto';
import { CharacterMapper } from '../mappers/CharactersMapper';

export const CharacterAPI = {
  async getCharactersByPk(pkArray: (number | string)[]): Promise<Character[]> {
    if (pkArray.length > 10) {
      const chunkedArr: (string | number)[][] = getChunkedArray(pkArray, 10);
      const charactersData: Character[][] & Character[] = [];

      for (let i = 0; i < chunkedArr.length; i++) {
        charactersData.push(await this.getCharactersByPk(chunkedArr[i]));
      }

      return charactersData.flat(Infinity);
    }

    return firebase
      .firestore()
      .collection('people')
      .where('pk', 'in', pkArray)
      .withConverter(firebaseConverter<CharacterDTO>())
      .get()
      .then((characters) =>
        characters.docs.map((character) => CharacterMapper.transformResponse(character.data(), character.id)),
      );
  },
};
