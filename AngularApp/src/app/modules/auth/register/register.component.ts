import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

/**
 * Register component
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../auth.component.css'],
})
export class RegisterComponent {
  /**
   * Get data from html form
   */
  public registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  /**
   * Form error message
   */
  public formError: string;

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Register user in app, if success login and redirect to main page
   */
  public async registerUser(): Promise<void> {
    try {
      await this.authService.register(this.registerForm.value);
      this.router.navigateByUrl('/');
    } catch (err) {
      this.formError = err.message;
    }
  }
}
