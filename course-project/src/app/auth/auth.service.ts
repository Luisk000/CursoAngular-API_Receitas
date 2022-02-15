import { HttpClient, HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData{
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string, 
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  
  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJZI4vnjbv4Yoy7sBB3VjGljFtlpMEHS8',
    {email: email, password: password, returnSecureToken: true})
    .pipe(catchError(this.handleError), tap(response => {
      this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn)
    }));
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJZI4vnjbv4Yoy7sBB3VjGljFtlpMEHS8',
    {email: email, password: password, returnSecureToken: true})
    .pipe(catchError(this.handleError), tap(response => {
      this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn)
    }));
  }

  autoLogin(){
    const userData: {
      email: string, id: string, _token: string, _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    };
    const loadedUser = new User(
      userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number){
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, userId:string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
      const user = new User(email, userId, token, expirationDate);
      this.user.next(user);
      this.autoLogout(expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(error: HttpErrorResponse){
    let errorMessage = 'An unknown error ocurred'
      if(!error.error || !error.error.error){
        return throwError(errorMessage);
      }
      switch(error.error.error.message){
        case 'EMAIL_EXISTS': errorMessage = 'Email already exists'; 
        break;
        case 'EMAIL_NOT_FOUND': errorMessage = 'Email was not found'
        break;
        case 'INVALID_PASSWORD': errorMessage = 'Invalid password'
        break;
      } 
    return throwError(errorMessage);
  }

}
