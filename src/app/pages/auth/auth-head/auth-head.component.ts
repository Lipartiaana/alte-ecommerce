import { Component, Input } from '@angular/core';

@Component({
  selector: 'alte-auth-head',
  standalone: true,
  imports: [],
  templateUrl: './auth-head.component.html',
  styleUrl: './auth-head.component.scss',
})
export class AuthHeadComponent {
  @Input() title: string = '';
}
