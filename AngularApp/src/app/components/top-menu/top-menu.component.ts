import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

/**
 * Header component with nav and logo
 */
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css'],
})
export class TopMenuComponent {
  /**
   * Check if user is logged in and change nav
   */
  public isLoggedIn$ = this.authService.isLoggedIn$;
  /**
   * User email observer
   */
  public userEmail$ = this.authService.userEmail$;

  constructor(private authService: AuthService) {}

  /**
   * Logout user from app
   */
  public logout(): void {
    this.authService.logout();
  }
}
