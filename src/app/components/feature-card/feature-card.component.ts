import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'alte-feature-card',
  standalone: true,
  imports: [],
  templateUrl: './feature-card.component.html',
  styleUrl: './feature-card.component.scss',
})
export class FeatureCardComponent {
  @Input() icon: 'Delivery' | 'StarBadge' | 'ShieldCheck' = 'StarBadge';
  @Input() title: string = '';
  @Input() description: string = '';
}
