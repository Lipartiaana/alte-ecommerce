import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthFacade } from '../../facades';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authFacade = inject(AuthFacade);
  return next(req).pipe(
    catchError((err: any) => {
      if (err.status === 400) {
        // handle 400 error
        console.log('400 error');
        if (err.error.error.message === 'INVALID_ID_TOKEN') {
          // do something
          authFacade.logout();
          return throwError(() => err);
        }
      }
      return throwError(() => err);
    })
  );
};
