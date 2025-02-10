import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";

import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { TaskModel } from "../task/model/task-model";
import { environment } from "../../environments/environment";
import { AllApisService } from 'src/app/services/all-apis.service';
// import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  errorData: {} = {};
  baseurl = environment.apiHost;

  constructor(
    private _http: HttpClient,
    private router: Router,
    private allApis: AllApisService
  ) {

  }
  taskApi = this.baseurl + "/task";

  addTask(task: TaskModel): Observable<any> {
    return this._http
      .post<any>(this.taskApi, task)
      .pipe(catchError(this.handleError));
  }

  updateTask(task: TaskModel): Observable<any> {
    return this._http
      .patch<any>(this.taskApi, task)
      .pipe(catchError(this.handleError));
  }

  deleteTask(task: TaskModel): Observable<any> {
    return this._http
      .patch<any>(`${this.taskApi}/delete`, task)
      .pipe(catchError(this.handleError));
  }

  deleteTaskMultiple(ids: any): Observable<any> {
    return this._http
      .patch<any>(`${this.taskApi}/delete/multiple`, ids)
      .pipe(catchError(this.handleError));
  }

  getTask(): Observable<any> {
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
