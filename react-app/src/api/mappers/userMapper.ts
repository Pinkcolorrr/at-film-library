import { UserInfo } from '../../models/UserInfo';

export const userMapper = (user: firebase.default.User | null): UserInfo => {
  return new UserInfo(user?.email);
};
