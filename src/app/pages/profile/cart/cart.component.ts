import { Component } from '@angular/core';
import { AuthHeadComponent } from '../../auth/auth-head/auth-head.component';
import { KeyValueComponent } from '../../../components/key-value/key-value.component';

@Component({
  selector: 'alte-cart',
  standalone: true,
  imports: [AuthHeadComponent, KeyValueComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {}
