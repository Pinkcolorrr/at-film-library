import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

/**
 * Header component with nav and logo
 */
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css'],
  providers: [AuthService],
})
export class TopMenuComponent {
  /**
   * Check if user is logged in and change nav
   */
  public isLoggedIn = false;

  constructor(private authService: AuthService) {
    authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = !loggedIn;
    });
  }

  /**
   * Logout user from app
   */
  public logout(): void {
    this.authService.logout();
  }
}
