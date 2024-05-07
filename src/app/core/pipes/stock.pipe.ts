import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stock',
  standalone: true,
})
export class StockPipe implements PipeTransform {
  transform(value?: boolean): 'In Stock' | 'Out of Stock' {
    return value ? 'In Stock' : 'Out of Stock';
  }
}
