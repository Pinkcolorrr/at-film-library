import firebase from 'firebase/app';
import 'firebase/auth';
import { UserInfo } from '../../models/UserInfo';

export const UserMapper = {
  transformResponse(user: firebase.User): UserInfo {
    return {
      email: user.email,
    };
  },
};
