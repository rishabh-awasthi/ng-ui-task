import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) {
    
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-api-key': 'reqres-free-v1',
    });

    return this.http.post<any>(
      'https://reqres.in/api/login',
      { email, password },
      { headers }
    );
  }

  fetchUserList(page: number): Observable<any> {
    const headers = new HttpHeaders({
      'x-api-key': 'reqres-free-v1',
    });

    return this.http.get<any>(`https://reqres.in/api/users?page=${page}`, {
      headers,
    });
  }

  checkLoggedIn(): boolean {
    return this.cookie.check('user_token');
  }

  getUserEmail(): string {
    return this.cookie.get('email');
  }

  logout(): void {
    this.cookie.deleteAll();
    this.router.navigate(['/login']);
  }

  setToken(token: string): void {
    this.cookie.set('user_token', token, {
      path: '/',
      secure: false,
      sameSite: 'Lax',
    });
  }

  getToken(): string {
    return this.cookie.get('user_token');
  }

  setTokenAndEmail(token: string, email: string): void {
    this.cookie.set('user_token', token, {
      path: '/',
      secure: false,
      sameSite: 'Lax',
    });
    this.cookie.set('email', email, {
      path: '/',
      secure: false,
      sameSite: 'Lax',
    });
  }
}
