import { Component, Input } from '@angular/core';

@Component({
  selector: 'alte-filter-card',
  standalone: true,
  imports: [],
  templateUrl: './filter-card.component.html',
  styleUrl: './filter-card.component.scss',
})
export class FilterCardComponent {
  @Input() name: string = '';
}
