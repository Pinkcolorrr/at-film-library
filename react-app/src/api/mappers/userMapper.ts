import { UserInfo } from '../../models/UserInfo';
import firebase from 'firebase/app';
import 'firebase/auth';

export class UserMapper {
  public transformResponse(user: firebase.User): UserInfo {
    return {
      email: user.email,
    };
  }
}
