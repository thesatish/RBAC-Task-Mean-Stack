import { Component, HostListener } from '@angular/core';

import Swal from 'sweetalert2';
import { ToastService } from 'src/app/services/toast.service';
import { Location } from '@angular/common';
import { SharedService } from 'src/app/services/shared.service';
import { AdminService } from '../admin.service';
import { UserModel } from '../model/admin';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {
  button: string = "Add User"
  user = new UserModel();
  userList: any[] = [];
  editUserData: boolean = false;
  errorMsg: string = "";
  status = ["Active", "Inactive", "Pending", "Deactive", "Lock"];
  isLoading: boolean = true;
  allSelected: boolean = false;
  selectedTaskIds: string[] = [];
  currentPage: number = 1;
  perPage: number = 25;
  totalPages: number = 1;
  roleList: any[] = [];
  showPassword = false;

  constructor(
    private toastService: ToastService,
    private _location: Location,
    private _sharedService: SharedService,
    private _adminService: AdminService

  ) { }

  ngOnInit() {
    this._sharedService.setModuleId('5');
    this.getRoles();
    this.getUser(true);

  }
  saveUser() {
    const requiredFields: { key: keyof UserModel; message: string }[] = [
      { key: 'userName', message: 'Name is required' },
      { key: 'emailId', message: 'Email is required' },
      { key: 'role', message: 'Role is required' },
      { key: 'gender', message: 'Gender is required' },
      { key: 'status', message: 'Status is required' }
    ];

    if (this.button === 'Add User') {
      requiredFields.push({ key: 'password', message: 'Password is required' });
    }

    for (const field of requiredFields) {
      if (!this.user[field.key]) {
        this.toastService.showToast('error', field.message, "", 1000);
        return;
      }
    }

    const action = this.button === "Add User"
      ? this._adminService.addUser(this.user)
      : this._adminService.updateUser(this.user);

    action.subscribe({
      next: (res) => {
        this.toastService.showToast('success', res.data.message, "", 1000);
        this.user = new UserModel();
        this.button = "Add User";
        this.getUser();
        this._sharedService.triggerCountingCall?.();
      },
      error: err => {
        this.errorMsg = err.message || "Server maintenance. Please try again later";
        this.toastService.showAlert('error', '', this.errorMsg);
      }
    });
  }

  editUser(index: any) {
    this.user = this.userList[index];
    const roleId:any = this.user.role
    this.user.role = roleId._id
    this.editUserData = true;
    this.button = "Update User";
  }

  deleteUser(index: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this User',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.user = this.userList[index];
        this._adminService.deleteUser(this.user).subscribe(
          (res: any) => {
            if (res) {
              this.toastService.showToast('success', "User Deleted Successfully...", "", 1000);
              this.user = new UserModel();
              this.getUser();
            }
          },
          (err) => {
            this.errorMsg = err.message || "Server maintenance. Please try again later";
            this.toastService.showAlert('error', '', this.errorMsg);
          }
        );
      }
    });
  }

  getUser(loader = true) {
    this.isLoading = loader;
    const filterParams: any = {
      page: this.currentPage,
      limit: this.perPage
    };

    this._adminService.getUsers(filterParams).subscribe((res: any) => {
      this.userList = res.data.data.result;
      this.totalPages = res.data.data.total_pages
      this.isLoading = false;
    });
  }

  getRoles(loader = true) {
    this.isLoading = loader;
    this._adminService.getRoles().subscribe((res: any) => {
      this.roleList = res.data.data.result;
      this.isLoading = false;
    });
  }

  editedTask: any = null;

  updateTask(index: number, field: string, event: any) {
    const newValue = event.target.innerText.trim();
    this.userList[index][field] = newValue;
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    // event.preventDefault(); // Prevents accidental form submission if inside a form
    this.saveUser();
  }

  toggleAllSelection() {
    this.userList.forEach(task => task.selected = this.allSelected);
    this.updateSelection();
  }

  updateSelection() {
    this.selectedTaskIds = this.userList
      .filter(task => task.selected)
      .map(task => task._id);
    this.allSelected = this.userList.every(task => task.selected);
  }

  //sweet alert from service
  deleteMultipleTasks() {
    // this.toastService
    //   .showConfirmationToast('Delete Item', 'Are you sure you want to delete this item?')
    //   .subscribe((confirmed) => {
    //     if (confirmed) {
    //       this._taskService.deleteUserMultiple(this.selectedTaskIds).subscribe(
    //         (res: any) => {
    //           if (res) {
    //             this.toastService.showToast('success', "All Users Deleted Successfully...", "", 1000);
    //             this.task = new TaskModel();
    //             this.selectedTaskIds = [];
    //             this.allSelected = false;
    //             this.getTask();
    //           }
    //         },
    //         (err) => {
    //           this.errorMsg = err.message || "Server maintenance. Please try again later";
    //           this.toastService.showAlert('error', '', this.errorMsg);
    //         }
    //       );
    //     } else {
    //       this.selectedTaskIds = [];
    //       this.allSelected = false;
    //       this.getTask();
    //     }
    //   });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  handlePageChange(page: number) {
    this.currentPage = page;
    this.getUser(true);
  }

}

