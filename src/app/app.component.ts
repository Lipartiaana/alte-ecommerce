import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'alte-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: '<router-outlet/>',
})
export class AppComponent {
  title = 'alte-ecommerce';
}
