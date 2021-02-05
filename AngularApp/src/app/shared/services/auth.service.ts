import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { IUser } from '../interfaces/user.interface';

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

  constructor(private afAuth: AngularFireAuth) {
    this.isLoggedIn$ = this.afAuth.authState.pipe(
      map(obj => obj === null),
      shareReplay({
        refCount: true,
        bufferSize: 1,
      })
    );
  }

  /**
   * Login user in app
   *  @param user user object, that have to include email and password fields
   * @returns promise with information object about user
   */
  public async login(user: IUser): Promise<object> {
    return await this.afAuth.signInWithEmailAndPassword(user.email, user.password);
  }

  /**
   * Register user in app
   * @param user user object, that have to include email and password fields
   * @returns promise with information object about user
   */
  public async register(user: IUser): Promise<object> {
    return await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
  }

  /**
   * Logout user from app
   */
  public logout(): void {
    this.afAuth.signOut();
  }
}
