import { Character } from '../../models/Character';
import { RequestOptions } from '../../models/RequestOptions';
import { PossiblyNull } from '../../utils/types';
import { RootState } from '../rootReducer';

/** Select current character, saved in store */
export const selectCurrentCharacter = (state: RootState): PossiblyNull<Character> =>
  state.characters.currentCharacter.characterInfo;

/** Select all characters,that has in store */
export const selectAllCharacters = (state: RootState): Character[] => state.characters.characterList;

/** Select information about is there any data left on the server in store */
export const selectIsHaveMoreCharacters = (state: RootState): boolean => state.characters.isHaveMoreData;

/** Select end data msg */
export const selectLastCharactersMsg = (state: RootState): string => state.characters.endDataMsg;

/** Select options for request */
export const selectCharactersRequestOptions = (state: RootState): RequestOptions => state.characters.requestOptions;

/** Select message if failed to get a movie */
export const selectRejectedCharacterMsg = (state: RootState): string => state.characters.currentCharacter.rejectedMsg;
