import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  showToast(type: 'success' | 'error' | 'info' | 'warning' | '', title: string, message?: string , time : number = 3000) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: type || undefined,
      title: title,
      text: message || '',
      showConfirmButton: false,
      timer: time,
      timerProgressBar: true,
    });
  }

  showAlert(type: 'success' | 'error' | 'info' | 'warning' | '', title: string, message?: string) {
    // Normal alert configuration
    Swal.fire({
      icon: type || undefined,
      title: title,
      text: message,
      showConfirmButton: true,
    });
  }

    /**
   * Shows the confirmation toast and performs API action if confirmed
   */
  showConfirmationToast(
    title: string,
    text: string,
    confirmButtonText: string = 'Yes, delete it!',
    cancelButtonText: string = 'No, keep it'
  ): Observable<boolean> {
    return new Observable<boolean>(observer => {
      Swal.fire({
        title: title,
        text: text,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText
      }).then(result => {
        // If the user confirms, resolve true; if cancel, resolve false
        if (result.isConfirmed) {
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      });
    });
  }
}
