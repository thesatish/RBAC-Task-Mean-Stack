import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError, switchMap, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // For SweetAlert

interface Token {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!navigator.onLine) {
      this.showOfflineAlert();
      return throwError(() => new HttpErrorResponse({ status: 0, statusText: 'Offline' }));
    }
    const token = localStorage.getItem('authToken');
    
    if (token) {
      request = this.addTokenHeader(request, token);
      return next.handle(request);

    }
    return next.handle(request);
  }

  private addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private showOfflineAlert(): void {
    Swal.fire({
      icon: 'error',
      title: 'You are offline',
      text: 'Please check your internet connection and try again.',
      confirmButtonText: 'Okay',
    });
  }
}
