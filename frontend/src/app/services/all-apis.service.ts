import { Injectable } from '@angular/core';

import {
  HttpHeaders,
  HttpParams,
  HttpErrorResponse
} from "@angular/common/http";
import { throwError } from "rxjs";

import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class AllApisService {
  baseurl = environment.apiHost;
  constructor() { }

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: "Bearer " + this.getToken(),
    }),
    params: new HttpParams(),
  };

  getToken() {
    return localStorage.getItem("token");
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
