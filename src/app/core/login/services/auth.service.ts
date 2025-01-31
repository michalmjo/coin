import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/service/config.service';
import { UserCredentials } from './user-credentials';
import { catchError, Subject, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject();
  apiKey: string = ``;
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private router: Router
  ) {
    this.apiKey = this.config.apiKey;
  }

  register(email: string, password: string) {
    console.log(this.apiKey);
    const body = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    console.log(body);
    return this.http
      .post<UserCredentials>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
        body
      )
      .pipe(catchError(this.handleError), tap());
  }

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    return this.http
      .post<UserCredentials>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
        body
      )
      .pipe(catchError(this.handleError));
  }

  // daneUzytkownika

  private handleAuth(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogOut(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
  //auto log out

  autoLogOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  // logout
  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  // obs bledow

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Nieznany błąd';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email Istnieje';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Niepoprawne dane logowania';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Nie ma takiego adresu email';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Hasło niepoprawne';
        break;
    }

    return throwError(() => new Error(errorMessage));
  }
}
