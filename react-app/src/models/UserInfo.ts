import { Maybe } from 'yup/lib/types';

export interface UserInfo {
  readonly email: Maybe<string>;
}
