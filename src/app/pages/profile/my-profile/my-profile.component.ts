import { Component, inject } from '@angular/core';
import { AuthFacade } from '../../../facades';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'alte-my-profile',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss',
})
export class MyProfileComponent {
  authFacde = inject(AuthFacade);

  user$ = this.authFacde.getUser();
}
