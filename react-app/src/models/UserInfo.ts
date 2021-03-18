import { PossiblyNull } from '../utils/types';

/** Information about user */
export interface UserInfo {
  /** User email */
  readonly email?: PossiblyNull<string>;
}
