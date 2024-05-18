import { Component, Input } from '@angular/core';
import { StockPipe } from '../../core/pipes/stock.pipe';
import { NgIf } from '@angular/common';

@Component({
  selector: 'alte-stock-check',
  standalone: true,
  imports: [StockPipe, NgIf],
  templateUrl: './stock-check.component.html',
  styleUrl: './stock-check.component.scss',
})
export class StockCheckComponent {
  @Input() inStock?: boolean = false;
}
