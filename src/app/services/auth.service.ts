import { Injectable } from '@angular/core';
import { ApiService } from '../core/services';
import { environment } from '../../environments/environment';
import { AuthResponce, AuthPayload } from '../core/interfaces/auth.payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  override apiUrl = environment.firebaseAuthUrl;
  apiKey = environment.firebaseApiKey;

  register(params: AuthPayload): Observable<AuthResponce> {
    return this.post(`accounts:signUp?key=${this.apiKey}`, params);
  }

  login(payload: AuthPayload): Observable<AuthResponce> {
    return this.post(`accounts:signInWithPassword?key=${this.apiKey}`, {
      ...payload,
      returnSecureTocken: true,
    });
  }
}
