import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { Unsubscribe } from 'redux';
import { RequestOptionsMapper } from '../../../api/mappers/RequestOptionsMapper';
import { Character } from '../../../models/Characters';
import { RequestOptions } from '../../../models/RequestOptions';
import { setIsHaveMoreCharacters } from './storeThunks';
import { CharacterAPI } from '../../../api/services/CharacterAPI';
import { RootState } from '../../rootReducer';
import { AppDispatch } from '../../store';

export const getInitialCharacters: AsyncThunk<Unsubscribe, RequestOptions, Record<string, never>> = createAsyncThunk(
  'characters/getInitialCharacters',
  async (options: RequestOptions, thunkAPI): Promise<Unsubscribe> => {
    thunkAPI.dispatch(setIsHaveMoreCharacters(true));
    return CharacterAPI.getInitialCharacters(RequestOptionsMapper.transofrmRequest(options), thunkAPI.dispatch);
  },
);

export const getNextCharacters: AsyncThunk<
  Unsubscribe,
  RequestOptions,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
> = createAsyncThunk(
  'characters/getNextCharacters',
  async (options: RequestOptions, thunkAPI): Promise<Unsubscribe> =>
    CharacterAPI.getNextCharacters(
      RequestOptionsMapper.transofrmRequest(options),
      thunkAPI.dispatch,
      thunkAPI.getState().characters.lastDocId,
    ),
);

export const getCharacterByName: AsyncThunk<Character, string, Record<string, never>> = createAsyncThunk(
  'characters/getCharacterByName',
  async (name: string): Promise<Character> => CharacterAPI.getCharacterByName(name),
);

export const getCharacterById: AsyncThunk<Character, string, Record<string, never>> = createAsyncThunk(
  'characters/getCharacterById',
  async (id: string): Promise<Character> => CharacterAPI.getCharacterById(id),
);

export const getAllCharacters: AsyncThunk<Character[], void, Record<string, never>> = createAsyncThunk(
  'characters/getAllCharacters',
  async (): Promise<Character[]> => CharacterAPI.getAllCharacters(),
);

export const getCharactersByPk: AsyncThunk<Character[], string[], Record<string, never>> = createAsyncThunk(
  'films/getCharactersByPk',
  async (pkArray: string[]): Promise<Character[]> =>
    CharacterAPI.getCharactersByPk(pkArray.map((pk) => Number(pk) || pk)),
);
