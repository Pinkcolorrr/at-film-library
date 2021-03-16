import { Maybe } from 'yup/lib/types';
import { Character } from '../../models/Characters';
import { RequestOptions } from '../../models/RequestOptions';
import { RootState } from '../rootReducer';

export const selectCurrentCharacter = (state: RootState): Maybe<Character> =>
  state.characters.currentCharacter.characterInfo;

export const selectAllCharacters = (state: RootState): Character[] => state.characters.characterList;

export const selectIsHaveMoreCharacters = (state: RootState): boolean => state.characters.isHaveMoreData;

export const selectLastCharactersMsg = (state: RootState): string => state.characters.endDataMsg;

export const selectCharactersRequestOptions = (state: RootState): RequestOptions => state.characters.requestOptions;
