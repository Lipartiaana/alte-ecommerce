import { Component, OnInit } from '@angular/core';
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
import { RouterLink } from '@angular/router';

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
  ],
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  submit() {
    console.log(this.form);
    this.form.markAllAsTouched();
  }
}
