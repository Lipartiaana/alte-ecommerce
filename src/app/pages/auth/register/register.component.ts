import { Component, OnDestroy, inject } from '@angular/core';
import { AuthHeadComponent } from '../auth-head/auth-head.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../ui/button/button.component';
import { InputComponent } from '../../../components/input/input.component';
import { AuthService } from '../../../services/auth.service';
import {
  AuthResponce,
  AuthPayload,
} from '../../../core/interfaces/auth.payload';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { AuthFacade } from '../../../facades';
import { Router } from '@angular/router';
import { AlertComponent } from '../../../components/alert/alert.component';

@Component({
  selector: 'alte-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../auth.style.scss'],
  imports: [
    AuthHeadComponent,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    AlertComponent,
  ],
})
export class RegisterComponent implements OnDestroy {
  form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required),
  });

  authFacade = inject(AuthFacade);
  router = inject(Router);

  errorMessage: string | null = null;
  successMessage: string | null = null;

  sub$ = new Subject();

  submit() {
    console.log(this.form);
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
      .register(payload)
      .pipe(
        takeUntil(this.sub$),
        catchError(({ error }) => {
          this.errorMessage = error.error.message;
          return throwError(() => error.error.message);
        })
      )
      .subscribe((res: AuthResponce) => {
        if (res) {
          this.successMessage = 'You are registered successfully!';
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        }
      });
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
