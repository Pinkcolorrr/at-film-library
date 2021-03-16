import { Maybe } from 'yup/lib/types';
import { RootState } from '../rootReducer';

export const selectRootContent = (state: RootState): Maybe<string> => state.currentContent.rootContent;
export const selectAdditionalContent = (state: RootState): Maybe<string> => state.currentContent.additionalContent;
