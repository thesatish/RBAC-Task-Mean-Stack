import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { AllApisService } from 'src/app/services/all-apis.service';
import {
  HttpClient,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError, tap } from 'rxjs/operators';
import { throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseurl = environment.apiHost;
  private userSubject = new BehaviorSubject<{ role: string | null } | null>(null);
  AuthenticatedUser$ = this.userSubject.asObservable();

  constructor(
    private _http: HttpClient,
    private router: Router,
    private allApis: AllApisService
  ) {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      this.userSubject.next({ role: storedRole });
    }
  }

  userApi = this.baseurl + "/user";

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  loginUser(credendial:any): Observable<any> {
    return this._http.post<any>(`${this.userApi}/login`, credendial).pipe(
      tap(response => {
        console.log("response...",response.data.data.token );
        if (response.data.data.token) {
          localStorage.setItem('authToken', response.data.data.token);
          // localStorage.setItem('userRole', response.role);
          // this.userSubject.next({ role: response.role }); // Update user state
        }
      })
    );
  }

  login(username: string, password: string): Observable<any> {
    return this._http.post<any>(`${this.userApi}/login`, { username, password }).pipe(
      tap(response => {
        if (response.token && response.role) {
          localStorage.setItem('authToken', response.data.data.token);
          // localStorage.setItem('userRole', response.role);
          // this.userSubject.next({ role: response.role });
        }
      }),
      catchError(this.handleError) // 🔹 Handle errors
    );
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private handleError(error: HttpErrorResponse) {
    let errorData = {
      message: "Something Went Wrong"
    }
    if (error.error instanceof ErrorEvent) {
      errorData = error.error;

    } else {
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
      errorData = error.error;
    }
    return throwError(() => errorData);
  }


}
