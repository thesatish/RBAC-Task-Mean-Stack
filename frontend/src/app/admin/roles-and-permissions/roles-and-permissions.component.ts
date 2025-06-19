import { Component, HostListener } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastService } from 'src/app/services/toast.service';
import { Location } from '@angular/common';
import { SharedService } from 'src/app/services/shared.service';
import { AdminService } from '../admin.service';
import { UserModel } from '../model/admin';

@Component({
  selector: 'app-roles-and-permissions',
  templateUrl: './roles-and-permissions.component.html',
  styleUrls: ['./roles-and-permissions.component.scss']
})
export class RolesAndPermissionsComponent {
  isLoading: boolean = false;
  roleList: any[] = [];
  rolesAndPermissionsList: any[] = [];
  errorMessage: string = "";

  isCheck: boolean = true;

  constructor(
    private toastService: ToastService,
    private _location: Location,
    private _sharedService: SharedService,
    private _adminService: AdminService

  ) { }

  ngOnInit() {
    this._sharedService.setModuleId('4');
    this.getRoles();
    // this.fetchRolesAndPermission()
  }

  getRoles(loader = true) {
    this.isLoading = loader;
    this._adminService.getRoles().subscribe((res: any) => {
      this.roleList = res.data.data.result;
      this.isLoading = false;
    });
  }

  onRoleChange(id: any) {
    this.fetchRolesAndPermission(id);
  }

  fetchRolesAndPermission(roleId: any = "") {
    this._adminService.getRolesAndPermission(roleId).subscribe({
      next: res => {
        this.rolesAndPermissionsList = res.data.data
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.toastService.showAlert('error', '', this.errorMessage);
      }
    })
  }

  editRole(module: any, action: boolean, operation: string) {
    console.log(`Module: ${module.moduleId}, Action: ${action}, operation : ${operation}`);

    let payload: any = {
      action: action,
      operation: operation,
      roleId: module.roleId
    }
    this._adminService.updateRolesAndPermission(module.moduleId, payload).subscribe({
      next: res => {
        this.isLoading = false;
        this.toastService.showToast('success', res.data.message);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.toastService.showAlert('error', '', this.errorMessage);
        this.isLoading = false;
      }
    })
  }


}
