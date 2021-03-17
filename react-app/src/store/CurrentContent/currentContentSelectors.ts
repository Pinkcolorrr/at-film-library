import { Maybe } from 'yup/lib/types';
import { RootState } from '../rootReducer';

/** Select root content type, displaying in app */
export const selectRootContent = (state: RootState): Maybe<string> => state.currentContent.rootContent;
/** Select additional content type, displaying in app */
export const selectAdditionalContent = (state: RootState): Maybe<string> => state.currentContent.additionalContent;
