import { Injectable } from '@angular/core';
import { ApiService } from '../core/services';
import { FirebaseDocument } from '../core/interfaces/firebase-document';
import { Color } from '../core/interfaces/color';

@Injectable({
  providedIn: 'root',
})
export class ColorService extends ApiService {
  getColors() {
    return this.get<FirebaseDocument<Color>[]>('colors.json');
  }

  getColorById(id: string) {
    return this.get<FirebaseDocument<Color>>(`colors/${id}.json`);
  }
}
