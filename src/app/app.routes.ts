import { Routes } from '@angular/router';
import { CategoriesComponent, HomeComponent } from './pages';
import { LayoutComponent } from './components';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './core/guards';

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
        path: 'category/:id',
        component: CategoriesComponent,
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./pages/profile/profile.routes').then((m) => m.profileRoutes),
      },
    ],
  },

  {
    path: '**',
    redirectTo: '/',
  },
];
