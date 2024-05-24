import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'alte-auth-head',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './auth-head.component.html',
  styleUrl: './auth-head.component.scss',
  host: {
    '[style.backgroundColor]': 'backgroundColor',
  },
})
export class AuthHeadComponent {
  @Input() title: string = '';
  @Input() backgroundColor: string = 'var(--neutral-white-w100)';
}
