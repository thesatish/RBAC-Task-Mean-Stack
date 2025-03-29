import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import {
  HttpClient,
  HttpErrorResponse,
} from "@angular/common/http";

import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ModuleModel } from '../admin/model/admin';

import { environment } from "../../environments/environment";
import { AllApisService } from 'src/app/services/all-apis.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  errorData: {} = {};
  baseurl = environment.apiHost;

  constructor(
    private _http: HttpClient,
    private router: Router,
    private allApis: AllApisService
  ) {

  }
  taskApi = this.baseurl + "/module";

  addModule(module: ModuleModel): Observable<any> {
    return this._http
      .post<any>(this.taskApi, module)
      .pipe(catchError(this.handleError));
  }

  updateModule(module: ModuleModel): Observable<any> {
    return this._http
      .patch<any>(this.taskApi, module)
      .pipe(catchError(this.handleError));
  }

  deleteModule(module: ModuleModel): Observable<any> {
    return this._http
      .patch<any>(`${this.taskApi}/delete`, module)
      .pipe(catchError(this.handleError));
  }

  deleteModuleMultiple(ids: any): Observable<any> {
    return this._http
      .patch<any>(`${this.taskApi}/delete/multiple`, ids)
      .pipe(catchError(this.handleError));
  }

  getModules(): Observable<any> {
    return this._http
      .get<any>(this.taskApi, this.allApis.httpOptions)
      .pipe(catchError(this.handleError));
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
