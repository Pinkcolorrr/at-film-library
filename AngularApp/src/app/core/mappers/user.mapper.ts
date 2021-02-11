import { UserInfo } from '../models/user-Info';

/**
 * Mapping user data
 */
export class UserMapper {
  /**
   * Transoform user DTO to object model
   */
  public transformResponse(userInfo: firebase.default.auth.UserCredential): UserInfo {
    return {
      email: userInfo.user.email,
    };
  }
}
