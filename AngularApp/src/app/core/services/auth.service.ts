import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { UserMapper } from '../mappers/user.mapper';
import { UserInfo } from '../models/user-Info';
import { UserNew } from '../models/user-register';

/**
 * Service for authorization users
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Check if user logged in
   */
  public isLoggedIn$: Observable<boolean>;

  /**
   * Observable user email
   */
  public userEmail$: Observable<string>;

  private userMapper = new UserMapper();

  constructor(private afAuth: AngularFireAuth) {
    this.isLoggedIn$ = this.afAuth.authState.pipe(
      map(obj => obj != null),
      shareReplay({
        refCount: true,
        bufferSize: 1,
      })
    );

    this.userEmail$ = this.afAuth.user.pipe(
      map(obj => {
        if (obj) {
          return obj.email;
        }
      }),
      shareReplay({
        refCount: true,
        bufferSize: 1,
      })
    );
  }

  /**
   * Login user in app
   */
  public async login(user: UserNew): Promise<UserInfo> {
    return this.userMapper.transformResponse(await this.afAuth.signInWithEmailAndPassword(user.email, user.password));
  }

  /**
   * Register user in app
   */
  public async register(user: UserNew): Promise<UserInfo> {
    return this.userMapper.transformResponse(await this.afAuth.signInWithEmailAndPassword(user.email, user.password));
  }

  /**
   * Logout user from app
   */
  public logout(): void {
    this.afAuth.signOut();
  }
}
