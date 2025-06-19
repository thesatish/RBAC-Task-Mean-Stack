import { Component, HostListener } from '@angular/core';
import { ModuleModel } from '../model/admin';
import { AdminService } from '../admin.service';
import Swal from 'sweetalert2';
import { ToastService } from 'src/app/services/toast.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-module-management',
  templateUrl: './module-management.component.html',
  styleUrls: ['./module-management.component.scss']
})
export class ModuleManagementComponent {
  button: string = "Add Module"
  modules = new ModuleModel();
  moduleList: any[] = [];
  editModuleData: boolean = false;
  errorMsg: string = "";
  statusArray = ["Open", "In Progress", "Active", "Pending", "Complete"];
  isLoading: boolean = true;
  allSelected: boolean = false;
  selectedTaskIds: string[] = [];

  constructor(
    private toastService: ToastService,
    private _adminService: AdminService,
    private _sharedService: SharedService

  ) { }

  ngOnInit() {
    this._sharedService.setModuleId('7');
    this.getModules(true);
  }
  storeModule() {
    if (!this.modules.name) {
      return this.toastService.showToast('error', "Name is required", "", 2000);

    } else if (!this.modules.description) {
      return this.toastService.showToast('error', "Description is required...", "", 1000);
    }

    if (this.button === "Add Module") {
      console.log("data", this.modules);
      this._adminService.addModule(this.modules).subscribe({
        next: (res: any) => {
          this.toastService.showToast('success', "Module Added Successfully...", "", 1000);
          this.modules = new ModuleModel();
          this.getModules();
        },
        error: err => {
          this.errorMsg = err.message || "Server maintenance. Please try again later";
          this.toastService.showAlert('error', '', this.errorMsg);
        }
      })

    } else {
      this._adminService.updateModule(this.modules).subscribe({
        next: (res: any) => {
          this.modules = new ModuleModel();
          this.toastService.showToast('success', "Task Updated Successfully...", "", 1000);
          console.log("i am here");
          this.button = "Add Module"
          this.getModules();
        },
        error: err => {
          this.errorMsg = err.message || "Server maintenance. Please try again later";
          this.toastService.showAlert('error', '', this.errorMsg);
        }
      })
    }
  }

  editTask(index: any) {
    this.modules = this.moduleList[index];
    this.editModuleData = true;
    this.button = "Update Module";
  }

  deleteTask(index: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this task',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.modules = this.moduleList[index];
        this._adminService.deleteModule(this.modules).subscribe(
          (res: any) => {
            if (res) {
              this.toastService.showToast('success', "Module Added Successfully...", "", 1000);
              this.modules = new ModuleModel();
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
    this._adminService.getModules().subscribe((res: any) => {
      console.log(res);
      this.moduleList = res.data.data.result;
      this.isLoading = false;
    });
  }

  editedTask: any = null;

  updateTask(index: number, field: string, event: any) {
    const newValue = event.target.innerText.trim();
    this.moduleList[index][field] = newValue;
    console.log('Updated Task:', this.moduleList[index]);
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    // event.preventDefault(); // Prevents accidental form submission if inside a form
    this.storeModule();
  }

  toggleAllSelection() {
    this.moduleList.forEach(task => task.selected = this.allSelected);
    this.updateSelection();
  }

  updateSelection() {
    this.selectedTaskIds = this.moduleList
      .filter(task => task.selected)
      .map(task => task._id);
    this.allSelected = this.moduleList.every(task => task.selected);
  }

  //sweet alert from service
  deleteModuleMultiple() {
    this.toastService
      .showConfirmationToast('Delete Item', 'Are you sure you want to delete this item?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this._adminService.deleteModuleMultiple(this.selectedTaskIds).subscribe(
            (res: any) => {
              if (res) {
                this.toastService.showToast('success', "All Module Deleted Successfully...", "", 1000);
                this.modules = new ModuleModel();
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
          console.log('User canceled deletion.');
          this.selectedTaskIds = [];
          this.allSelected = false;
          this.getModules();
        }
      });
  }

}

