import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../models/user-login';
import { UserToken } from '../../models/user-token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginFormGroup = this.formBuilder.group({
    username: [''],
    password: [''],
  });

  onSubmitLoginForm() {
    if (this.loginFormGroup.valid) {
      const user: Partial<UserLogin> = this.loginFormGroup.value;

      this.authService.login(user as UserLogin).subscribe({
        next: (response: UserToken) => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.loginFormGroup.setErrors({ invalidCredentials: true });
          console.error('Login failed', err);
        },
      });
    } else {
      this.loginFormGroup.markAllAsTouched();
    }
  }
}
