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
import { SharedService } from '../services/shared.service';
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
    private authService: AuthService,
    private moduleContext: SharedService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // 1. Offline check
    if (!navigator.onLine) {
      this.showOfflineAlert();
      return throwError(() => new HttpErrorResponse({ status: 0, statusText: 'Offline' }));
    }

    // 2. Clone request to modify headers
    let modifiedRequest = request;

    // 3. Add token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      modifiedRequest = this.addTokenHeader(modifiedRequest, token);
    }

    // 4. Add moduleId if available
    const moduleId = this.moduleContext.getModuleId();

    console.log("moduleId::::::", moduleId);
    
    if (moduleId) {
      modifiedRequest = modifiedRequest.clone({
        setHeaders: {
          'x-module-id': moduleId
        }
      });
    }

    // 5. Proceed with modified request
    return next.handle(modifiedRequest);
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
