import { Component } from '@angular/core';
import { AuthHeadComponent } from '../../auth/auth-head/auth-head.component';
import { ButtonComponent } from '../../../ui/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'alte-fail-order',
  standalone: true,
  imports: [AuthHeadComponent, ButtonComponent, RouterLink],
  templateUrl: './fail-order.component.html',
  styleUrl: './fail-order.component.scss',
})
export class FailOrderComponent {}
