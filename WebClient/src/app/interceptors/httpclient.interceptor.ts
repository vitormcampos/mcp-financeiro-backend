import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap } from 'rxjs';

export function authErrorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const router = inject(Router);

  return next(req).pipe(
    catchError(async (error) => {
      if (error.status === 401 || error.status === 403) {
        await router.navigate(['/login']);
      }

      throw error;
    }),
  );
}
