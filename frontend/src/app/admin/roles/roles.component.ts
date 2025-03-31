import { Component, HostListener } from '@angular/core';
import { RolesModel } from '../model/admin';
import { AdminService } from '../admin.service';
import Swal from 'sweetalert2';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {
  button: string = "Add Role"
  modules = new RolesModel();
  roleList: any[] = [];
  editRolesData: boolean = false;
  errorMsg: string = "";
  isLoading: boolean = true;
  allSelected: boolean = false;
  selectedTaskIds: string[] = [];

  constructor(
    private toastService: ToastService,
    private _adminService: AdminService
  ) { }

  ngOnInit() {
    this.getModules(true);
  }
  storeModule() {
    if (!this.modules.name) {
      return this.toastService.showToast('error', "Name is required", "", 2000);
      
    } else if (!this.modules.description) {
      return this.toastService.showToast('error', "Description is required...", "", 1000);
    }

    if (this.button === "Add Role") {
      console.log("data", this.modules);
      this._adminService.addRole(this.modules).subscribe({
        next: (res: any) => {
          this.toastService.showToast('success', "Module Added Successfully...", "", 1000);
          this.modules = new RolesModel();
          this.getModules();
        },
        error: err => {
          this.errorMsg = err.message || "Server maintenance. Please try again later";
          this.toastService.showAlert('error', '', this.errorMsg);
        }
      })

    } else {
      this._adminService.updateRole(this.modules).subscribe({
        next: (res: any) => {
          this.modules = new RolesModel();
          this.toastService.showToast('success', "Role Updated Successfully...", "", 1000);
          this.getModules();
        },
        error: err => {
          this.errorMsg = err.message || "Server maintenance. Please try again later";
          this.toastService.showAlert('error', '', this.errorMsg);
        }
      })
    }
  }

  editRole(index: any) {
    this.modules = this.roleList[index];
    this.editRolesData = true;
    this.button = "Update Roles";
  }

  deleteRole(index: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this Role',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.modules = this.roleList[index];
        this._adminService.deleteRole(this.modules).subscribe(
          (res: any) => {
            if (res) {
              this.toastService.showToast('success', "Module Added Successfully...", "", 1000);
              this.modules = new RolesModel();
              this.getModules();
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

  getModules(loader = true) {
    this.isLoading = loader;
    this._adminService.getRoles().subscribe((res: any) => {
      this.roleList = res.data.data.result;
      this.isLoading = false;
    });
  }

  editedTask: any = null;

  updateRole(index: number, field: string, event: any) {
    const newValue = event.target.innerText.trim();
    this.roleList[index][field] = newValue;
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    // event.preventDefault(); // Prevents accidental form submission if inside a form
    this.storeModule();
  }

  toggleAllSelection() {
    this.roleList.forEach(task => task.selected = this.allSelected);
    this.updateSelection();
  }

  updateSelection() {
    this.selectedTaskIds = this.roleList
      .filter(task => task.selected)
      .map(task => task._id);
    this.allSelected = this.roleList.every(task => task.selected);
  }

  //sweet alert from service
  deleteModuleMultiple() {
    this.toastService
      .showConfirmationToast('Delete Item', 'Are you sure you want to delete this item?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this._adminService.deleteRoleMultiple(this.selectedTaskIds).subscribe(
            (res: any) => {
              if (res) {
                this.toastService.showToast('success', "All Roles Deleted Successfully...", "", 1000);
                this.modules = new RolesModel();
                this.selectedTaskIds = [];
                this.allSelected = false;
                this.getModules();
              }
            },
            (err) => {
              this.errorMsg = err.message || "Server maintenance. Please try again later";
              this.toastService.showAlert('error', '', this.errorMsg);
            }
          );
        } else {
          this.selectedTaskIds = [];
          this.allSelected = false;
          this.getModules();
        }
      });
  }

}

