import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!navigator.onLine) {
      Swal.fire({
        icon: 'warning',
        title: '',
        text: 'Please check your internet connection and try again.',
        confirmButtonText: 'OK'
      });
      return throwError(() => new Error('No Internet Connection'));
    }
    return next.handle(req);
  }
}

