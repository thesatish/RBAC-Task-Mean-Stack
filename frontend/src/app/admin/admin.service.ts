import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";

import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ModuleModel, RolesModel, UserModel } from '../admin/model/admin';
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
  moduleApi = this.baseurl + "/module";
  roleApi = this.baseurl + "/role";
  userApi = this.baseurl + "/user";
  authApi = this.baseurl + "/auth";
  roleAndPermissionApi = this.baseurl + "/roleAndPermission";


  addModule(module: ModuleModel): Observable<any> {
    return this._http
      .post<any>(this.moduleApi, module)
      .pipe(catchError(this.handleError));
  }

  updateModule(module: ModuleModel): Observable<any> {
    return this._http
      .patch<any>(this.moduleApi, module)
      .pipe(catchError(this.handleError));
  }

  deleteModule(module: ModuleModel): Observable<any> {
    return this._http
      .patch<any>(`${this.moduleApi}/delete`, module)
      .pipe(catchError(this.handleError));
  }

  deleteModuleMultiple(ids: any): Observable<any> {
    return this._http
      .patch<any>(`${this.moduleApi}/delete/multiple`, ids)
      .pipe(catchError(this.handleError));
  }

  getModules(): Observable<any> {
    return this._http
      .get<any>(this.moduleApi, this.allApis.httpOptions)
      .pipe(catchError(this.handleError));
  }

  addRole(module: RolesModel): Observable<any> {
    return this._http
      .post<any>(this.roleApi, module)
      .pipe(catchError(this.handleError));
  }

  updateRole(module: RolesModel): Observable<any> {
    return this._http
      .patch<any>(this.roleApi, module)
      .pipe(catchError(this.handleError));
  }

  deleteRole(module: RolesModel): Observable<any> {
    return this._http
      .patch<any>(`${this.roleApi}/delete`, module)
      .pipe(catchError(this.handleError));
  }

  getRoles(): Observable<any> {
    return this._http
      .get<any>(this.roleApi, this.allApis.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteRoleMultiple(ids: any): Observable<any> {
    return this._http
      .patch<any>(`${this.roleApi}/delete/multiple`, ids)
      .pipe(catchError(this.handleError));
  }

  addUser(user: UserModel): Observable<any> {
    return this._http
      .post<any>(`${this.userApi}/register`, user)

      .pipe(catchError(this.handleError));
  }

  updateUser(user: UserModel): Observable<any> {
    return this._http
      .patch<any>(this.userApi, user)
      .pipe(catchError(this.handleError));
  }

  deleteUser(user: UserModel): Observable<any> {
    return this._http
      .patch<any>(`${this.userApi}/delete`, user)
      .pipe(catchError(this.handleError));
  }

  getUsers(query: any): Observable<any> {
    let httpParams = new HttpParams({ fromObject: query });
    return this._http
      .get<any>(this.authApi, {
        params: httpParams,
      })
      .pipe(catchError(this.handleError));
  }

  // getRolesAndPermission(query: any): Observable<any> {
  //   let httpParams = new HttpParams({ fromObject: query });
  //   console.log("this.roleAndPermissionApi:::::", this.roleAndPermissionApi)
  //   return this._http
  //     .get<any>(`${this.roleAndPermissionApi}/permission`, {
  //       params: httpParams,
  //     })
  //     .pipe(catchError(this.handleError));
  // }

  getRolesAndPermission(id: any): Observable<any> {
    return this._http
      .get<any>(`${this.roleAndPermissionApi}/getById/${id}`, {
      })
      .pipe(catchError(this.handleError));
  }

  updateRolesAndPermission(moduleId: any, body: any): Observable<any> {
    return this._http
      .patch<any>(`${this.roleAndPermissionApi}/edit/${moduleId}`, body)
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
