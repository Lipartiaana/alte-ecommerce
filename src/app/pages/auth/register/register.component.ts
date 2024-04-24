import { Component } from '@angular/core';
import { AuthHeadComponent } from '../auth-head/auth-head.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../ui/button/button.component';
import { InputComponent } from '../../../components/input/input.component';

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
  ],
})
export class RegisterComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  submit() {
    console.log(this.form);
    this.form.markAllAsTouched();
  }
}
