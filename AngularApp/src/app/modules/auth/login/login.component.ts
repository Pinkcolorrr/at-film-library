import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

/**
 * Login component
 */
@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./../auth.component.css'],
  providers: [AuthService],
})
export class LoginComponent {
  /**
   * Get data from html form
   */
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  /**
   * Form error message
   */
  public formError: string;

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Login user in app, if success redirect to main page
   */
  public async submitHandler(): Promise<void> {
    try {
      await this.authService.login(this.loginForm.value);
      this.router.navigateByUrl('/');
    } catch (err) {
      this.formError = err.message;
    }
  }
}
