import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserRegister } from '../../models/user-register';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  registerFormGroup = this.formBuilder.group({
    username: [''],
    password: [''],
    confirmPassword: [''],
  });

  submit() {
    if (this.registerFormGroup.valid) {
      const user: Partial<UserRegister> = this.registerFormGroup.value;

      this.authService.register(user as UserRegister).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
      });
    } else {
      this.registerFormGroup.markAllAsTouched();
    }
  }
}
