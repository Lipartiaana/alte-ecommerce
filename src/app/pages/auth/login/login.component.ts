import { Component, OnInit, inject } from '@angular/core';
import { AuthHeadComponent } from '../auth-head/auth-head.component';
import { InputComponent } from '../../../components/input/input.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { ButtonComponent } from '../../../ui/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { AuthFacade } from '../../../facades';
import { AuthPayload } from '../../../core/interfaces/auth.payload';
import { AlertComponent } from '../../../components/alert/alert.component';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'alte-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth.style.scss'],
  imports: [
    AuthHeadComponent,
    InputComponent,
    ReactiveFormsModule,
    JsonPipe,
    ButtonComponent,
    RouterLink,
    AlertComponent,
  ],
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  authFacade = inject(AuthFacade);
  router = inject(Router);

  errorMessage: string | null = null;
  successMessage: string | null = null;

  submit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.errorMessage = null;
    this.successMessage = null;

    const { email, password } = this.form.value as {
      email: string;
      password: string;
    };

    email.trim();
    password.trim();

    const payload: AuthPayload = {
      email,
      password,
    };

    this.authFacade
      .login(payload)
      .pipe(
        catchError(({ error }) => {
          this.errorMessage = error.error.message;
          return throwError(() => error.error.message);
        })
      )
      .subscribe((res) => {
        if (res) {
          this.successMessage = 'Login successful';
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        }
      });
  }
}
