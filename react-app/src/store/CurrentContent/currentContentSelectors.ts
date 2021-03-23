import { RootState } from '../rootReducer';

/** Select root content type, displaying in app */
export const selectRootContent = (state: RootState): string | null => state.currentContent.rootContent;
/** Select additional content type, displaying in app */
export const selectAdditionalContent = (state: RootState): string | null => state.currentContent.additionalContent;
