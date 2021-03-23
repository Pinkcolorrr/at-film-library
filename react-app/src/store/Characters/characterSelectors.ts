import { Character } from '../../models/Character';
import { RequestOptions } from '../../models/RequestOptions';
import { RootState } from '../rootReducer';

/** Select current character, saved in store */
export const selectCurrentCharacter = (state: RootState): Character | null =>
  state.characters.currentCharacter.characterInfo;

/** Select all characters,that has in store */
export const selectAllCharacters = (state: RootState): Character[] => state.characters.characterList;

/** Select information about is there any data left on the server in store */
export const selectIsHaveMoreCharacters = (state: RootState): boolean => state.characters.isHaveMoreData;

/** Select options for request */
export const selectCharactersRequestOptions = (state: RootState): RequestOptions => state.characters.requestOptions;

/** Select message if failed to get a movie */
export const selectIsCharacterRejected = (state: RootState): boolean => state.characters.currentCharacter.isRejected;
