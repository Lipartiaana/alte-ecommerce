import { Component } from '@angular/core';
import { AuthHeadComponent } from '../auth-head/auth-head.component';

@Component({
  selector: 'alte-recovery',
  standalone: true,
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss', '../auth.style.scss'],
  imports: [AuthHeadComponent],
})
export class RecoveryComponent {
  isEmailSent: boolean = false;
  isOobCodeValid: boolean = false;
  isPasswordChanged: boolean = false;
}
