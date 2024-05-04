import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { RouterLink } from '@angular/router';
import { AuthFacade } from '../../facades';
import { CategoryFacade } from '../../facades/category.facade';
import { CdkMenuTrigger } from '@angular/cdk/menu';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'alte-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [ButtonComponent, RouterLink, CdkMenuTrigger, AsyncPipe],
})
export class HeaderComponent {
  authFacade = inject(AuthFacade);
  categoryFacade = inject(CategoryFacade);
  categories$ = this.categoryFacade.getCategories();

  get user() {
    return this.authFacade.user;
  }

  get isAuthenticated() {
    return this.authFacade.isAuthenticated;
  }

  logout() {
    this.authFacade.logout();
  }
}
