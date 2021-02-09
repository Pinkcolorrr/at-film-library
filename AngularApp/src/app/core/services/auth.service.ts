import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
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

  /**
   * Observable user email
   */
  public userEmail$: Observable<string>;

  constructor(private afAuth: AngularFireAuth) {
    this.isLoggedIn$ = this.afAuth.authState.pipe(
      map(obj => obj === null),
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
  public async login(user: IUser): Promise<firebase.default.auth.UserCredential> {
    const UserCredential = await this.afAuth.signInWithEmailAndPassword(user.email, user.password);
    return UserCredential;
  }

  /**
   * Register user in app
   */
  public async register(user: IUser): Promise<firebase.default.auth.UserCredential> {
    const UserCredential = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
    return UserCredential;
  }

  /**
   * Logout user from app
   */
  public logout(): void {
    this.afAuth.signOut();
  }
}
