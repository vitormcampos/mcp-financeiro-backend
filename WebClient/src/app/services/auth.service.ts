import { inject, Injectable } from '@angular/core';
import { UserLogin } from '../models/user-login';
import { UserRegister } from '../models/user-register';
import { HttpClient } from '@angular/common/http';
import { authTokenKey, UserToken } from '../models/user-token';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = import.meta.env['NG_APP_PUBLIC_URL'];

  login(data: UserLogin) {
    return this.httpClient
      .post<UserToken>(`${this.apiUrl}/api/auth/login`, data)
      .pipe(
        tap((response: UserToken) => {
          localStorage.setItem(authTokenKey, response.token || '');
        }),
      );
  }

  register(data: UserRegister) {
    return this.httpClient.post(`${this.apiUrl}/api/auth/register`, data);
  }

  isLoggedIn() {
    return !!localStorage.getItem(authTokenKey);
    // return this.httpClient.get(`${this.apiUrl}/api/auth/check-auth`, {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem(authTokenKey)}`,
    //   },
    // });
  }
}
