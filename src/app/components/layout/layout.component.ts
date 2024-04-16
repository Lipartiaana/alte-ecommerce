import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'alte-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
})
export class LayoutComponent {}
