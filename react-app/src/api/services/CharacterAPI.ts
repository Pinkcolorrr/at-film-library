import firebase from 'firebase/app';
import 'firebase/firestore';
import { Character } from '../../models/Characters';
import { firebaseConverter } from '../../utils/FirebaseConverters';
import { getChunkedArray } from '../../utils/utils';
import { CharacterDTO } from '../dtos/CharactersDto';
import { CharacterMapper } from '../mappers/CharactersMapper';

const characterMapper = new CharacterMapper();

export namespace CharacterAPI {
  export async function getCharactersByPk(
    pkArray: (number | string)[]
  ): Promise<Character[]> {
    if (pkArray.length > 10) {
      const chunkedArr: (string | number)[][] = getChunkedArray(pkArray, 10);
      const charactersData: Character[][] & Character[] = [];

      for (const item of chunkedArr) {
        charactersData.push(await getCharactersByPk(item));
      }

      return charactersData.flat(Infinity);
    }

    return await firebase
      .firestore()
      .collection('people')
      .where('pk', 'in', pkArray)
      .withConverter(firebaseConverter<CharacterDTO>())
      .get()
      .then((characters) => {
        const charactersData: Character[] = [];
        characters.forEach((character) => {
          charactersData.push(
            characterMapper.transformResponse(character.data())
          );
        });
        return charactersData;
      });
  }
}
