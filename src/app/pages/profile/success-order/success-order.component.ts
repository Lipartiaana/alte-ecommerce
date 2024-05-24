import { Component } from '@angular/core';
import { AuthHeadComponent } from '../../auth/auth-head/auth-head.component';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../ui/button/button.component';

@Component({
  selector: 'alte-success-order',
  standalone: true,
  imports: [AuthHeadComponent, RouterLink, ButtonComponent],
  templateUrl: './success-order.component.html',
  styleUrl: './success-order.component.scss',
})
export class SuccessOrderComponent {}
