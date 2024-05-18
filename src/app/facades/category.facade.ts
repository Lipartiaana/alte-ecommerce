import { Injectable, inject } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { map } from 'rxjs';
import { Category } from '../core/interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryFacade {
  categoryService = inject(CategoryService);

  getCategories() {
    return this.categoryService.getCategories().pipe(
      map((categories) => {
        return Object.keys(categories).map(
          (key: any) =>
            ({
              ...categories[key],
              id: key,
            } as Category)
        );
      })
    );
  }

  getCategoryById(id: string) {
    return this.categoryService.getCategoryById(id).pipe(
      map(
        (category) =>
          ({
            ...category,
            id,
          } as Category)
      )
    );
  }
}
