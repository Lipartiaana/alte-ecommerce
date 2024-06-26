import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthHeadComponent } from '../auth-head/auth-head.component';
import { AlertComponent } from '../../../components/alert/alert.component';
import { InputComponent } from '../../../components/input/input.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../ui/button/button.component';
import { AuthFacade } from '../../../facades';
import { ActivatedRoute } from '@angular/router';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';

@Component({
  selector: 'alte-recovery',
  standalone: true,
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss', '../auth.style.scss'],
  imports: [
    AuthHeadComponent,
    InputComponent,
    AlertComponent,
    ReactiveFormsModule,
    FormsModule,
    ButtonComponent,
  ],
})
export class RecoveryComponent implements OnDestroy {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  errorMessage: string | null = null;
  successMessage: string | null = null;

  authFacade = inject(AuthFacade);
  sub$ = new Subject();

  sendLink() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.authFacade
      .sendOobCode(this.form.value.email as string)
      .pipe(
        takeUntil(this.sub$),
        catchError(({ error }) => {
          this.errorMessage = error.error.message;
          return throwError(() => error.error.message);
        })
      )
      .subscribe((res) => {
        console.log('Email sent', res);
        this.successMessage = 'Email sent. Check your inbox.';
      });
  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
