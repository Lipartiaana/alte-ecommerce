import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthResponce, AuthPayload } from '../core/interfaces/auth.payload';
import { Observable, tap } from 'rxjs';
import { StorageService } from '../core/services';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  authService = inject(AuthService);
  storageService = inject(StorageService);

  get token() {
    return this.storageService.getItem('token');
  }

  get refreshToken() {
    return this.storageService.getItem('refreshToken');
  }

  get user() {
    return this.storageService.getItem('user');
  }

  register(payload: AuthPayload): Observable<AuthResponce> {
    return this.authService.register(payload).pipe(
      tap((res) => {
        this.storageService.setItem('token', res.idToken);
        this.storageService.setItem('refreshTocken', res.refreshToken);
        this.storageService.setItem('user', {
          email: res.email,
          id: res.localId,
        });
      })
    );
  }

  login(payload: AuthPayload): Observable<AuthResponce> {
    return this.authService.login(payload).pipe(
      tap((res) => {
        this.storageService.setItem('token', res.idToken);
        this.storageService.setItem('refreshTocken', res.refreshToken);
        this.storageService.setItem('user', {
          email: res.email,
          id: res.localId,
        });
      })
    );
  }

  logout() {
    this.storageService.clear();
  }
}
