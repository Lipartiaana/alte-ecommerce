import { Component, Input, booleanAttribute } from '@angular/core';

@Component({
  selector: 'alte-color-item',
  standalone: true,
  imports: [],
  templateUrl: './color-item.component.html',
  styleUrl: './color-item.component.scss',
})
export class ColorItemComponent {
  @Input() color: string = '#4078ff';
  @Input({
    transform: booleanAttribute,
  })
  active = true;
}
