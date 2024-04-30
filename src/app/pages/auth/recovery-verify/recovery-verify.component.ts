import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthHeadComponent } from '../auth-head/auth-head.component';
import { InputComponent } from '../../../components/input/input.component';
import { AlertComponent } from '../../../components/alert/alert.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../ui/button/button.component';
import { AuthFacade } from '../../../facades';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';

@Component({
  selector: 'alte-recovery-verify',
  standalone: true,
  imports: [
    AuthHeadComponent,
    InputComponent,
    AlertComponent,
    ReactiveFormsModule,
    FormsModule,
    ButtonComponent,
  ],
  templateUrl: './recovery-verify.component.html',
  styleUrls: ['./recovery-verify.component.scss', '../auth.style.scss'],
})
export class RecoveryVerifyComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    oobCode: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
  });

  errorMessage: string | null = null;
  successMessage: string | null = null;

  authFacade = inject(AuthFacade);
  route = inject(ActivatedRoute);
  router = inject(Router);

  sub$ = new Subject();

  ngOnInit() {
    this.route.queryParams.pipe(takeUntil(this.sub$)).subscribe((params) => {
      if (params['oobCode']) {
        this.form.patchValue({
          oobCode: params['oobCode'],
        });
      }
    });
  }

  resetPassword() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    const { oobCode, newPassword } = this.form.value as {
      oobCode: string;
      newPassword: string;
    };

    this.authFacade
      .resetPassword(oobCode, newPassword)
      .pipe(
        takeUntil(this.sub$),
        catchError(({ error }) => {
          this.errorMessage = error.error.message;
          return throwError(() => error.error.message);
        })
      )
      .subscribe((res) => {
        this.successMessage = 'Password reset succesfuly.';
        setTimeout(() => {
          this.router.navigate(['/auth']);
        }, 2000);
        console.log('reset', res);
      });
  }

  ngOnDestroy() {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
