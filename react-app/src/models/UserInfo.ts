import { Maybe } from 'yup/lib/types';

export class UserInfo {
  constructor(public email: Maybe<string>) {}
}
