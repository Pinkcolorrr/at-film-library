import { Maybe } from 'yup/lib/types';

/** Information about user */
export interface UserInfo {
  /** User email */
  readonly email: Maybe<string>;
}
