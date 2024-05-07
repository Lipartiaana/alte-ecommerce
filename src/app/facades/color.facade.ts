import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { ColorService } from '../services/color.service';
import { Color } from '../core/interfaces/color';

@Injectable({
  providedIn: 'root',
})
export class ColorFacade {
  colorService = inject(ColorService);

  getColors() {
    return this.colorService.getColors().pipe(
      map((colors) => {
        return Object.keys(colors).map(
          (key: any) =>
            ({
              ...colors[key],
              id: key,
            } as Color)
        );
      })
    );
  }

  getColorById(id: string) {
    return this.colorService.getColorById(id);
  }
}
