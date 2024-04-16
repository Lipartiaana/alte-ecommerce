import { Routes } from '@angular/router';
import { CategoriesComponent, HomeComponent } from './pages';
import { LayoutComponent } from './components';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/auth/auth.routes').then((m) => m.authRoutes),
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
    ],
  },

  {
    path: '**',
    redirectTo: '/',
  },
];
