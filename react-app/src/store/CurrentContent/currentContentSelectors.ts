import { PossiblyNull } from '../../utils/types';
import { RootState } from '../rootReducer';

/** Select root content type, displaying in app */
export const selectRootContent = (state: RootState): PossiblyNull<string> => state.currentContent.rootContent;
/** Select additional content type, displaying in app */
export const selectAdditionalContent = (state: RootState): PossiblyNull<string> =>
  state.currentContent.additionalContent;
