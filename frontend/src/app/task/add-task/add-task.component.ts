import { Component, HostListener } from '@angular/core';
import { TaskModel } from '../model/task-model';
import { TaskService } from '../task.service';
import Swal from 'sweetalert2';
import { ToastService } from 'src/app/services/toast.service';
import { Location } from '@angular/common';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  button: string = "Add Task"
  task = new TaskModel();
  taskList: any[] = [];
  editTaskData: boolean = false;
  errorMsg: string = "";
  statusArray = ["Open", "In Progress", "Active", "Pending", "Complete"];
  isLoading: boolean = true;
  allSelected: boolean = false;
  selectedTaskIds: string[] = [];
  currentPage: number = 1;
  perPage: number = 10;
  totalPages: number = 1;

  constructor(
    private toastService: ToastService,
    private _taskService: TaskService,
    private _location: Location,
    private _sharedService: SharedService
  ) { }

  ngOnInit() {
    this.getTask(true);
  }
  storeTask() {
    console.log("data", this.task);
    if (!this.task.status) {
      return this.toastService.showToast('error', "Status is required", "", 2000);

    } else if (!this.task.title) {
      return this.toastService.showToast('error', "Title is requiredd...", "", 1000);

    } else if (!this.task.description) {
      return this.toastService.showToast('error', "Description is required...", "", 1000);
    }

    if (this.button === "Add Task") {
      console.log("data", this.task);
      this._taskService.addTask(this.task).subscribe({
        next: (res: any) => {
          this.toastService.showToast('success', "Task Added Successfully...", "", 1000);
          this.task = new TaskModel();
          this.getTask();
          this._sharedService.triggerCountingCall();
        },
        error: err => {
          this.errorMsg = err.message || "Server maintenance. Please try again later";
          this.toastService.showAlert('error', '', this.errorMsg);
        }
      })

    } else {
      this._taskService.updateTask(this.task).subscribe({
        next: (res: any) => {
          this.task = new TaskModel();
          this.toastService.showToast('success', "Task Updated Successfully...", "", 1000);
          this.getTask();
        },
        error: err => {
          this.errorMsg = err.message || "Server maintenance. Please try again later";
          this.toastService.showAlert('error', '', this.errorMsg);
        }
      })
    }
  }

  editTask(index: any) {
    this.task = this.taskList[index];
    this.editTaskData = true;
    this.button = "Update Task";
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
        this.task = this.taskList[index];
        this._taskService.deleteTask(this.task).subscribe(
          (res: any) => {
            if (res) {
              this.toastService.showToast('success', "Task Added Successfully...", "", 1000);
              this.task = new TaskModel();
              this.getTask();
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

  getTask(loader = true) {
    this.isLoading = loader;
    const filterParams: any = {
     page :this.currentPage,
     limit : this.perPage
    };

    this._taskService.getTask(filterParams).subscribe((res: any) => {
      this.taskList = res.data.data.result;
      this.totalPages =res.data.data.total_pages
      this.isLoading = false;
    });
  }

  editedTask: any = null;

  updateTask(index: number, field: string, event: any) {
    const newValue = event.target.innerText.trim();
    this.taskList[index][field] = newValue;
    console.log('Updated Task:', this.taskList[index]);
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    // event.preventDefault(); // Prevents accidental form submission if inside a form
    this.storeTask();
  }

  toggleAllSelection() {
    this.taskList.forEach(task => task.selected = this.allSelected);
    this.updateSelection();
  }

  updateSelection() {
    this.selectedTaskIds = this.taskList
      .filter(task => task.selected)
      .map(task => task._id);
    this.allSelected = this.taskList.every(task => task.selected);
  }

  //sweet alert from service
  deleteMultipleTasks() {
    this.toastService
      .showConfirmationToast('Delete Item', 'Are you sure you want to delete this item?')
      .subscribe((confirmed) => {
        if (confirmed) {
          this._taskService.deleteTaskMultiple(this.selectedTaskIds).subscribe(
            (res: any) => {
              if (res) {
                this.toastService.showToast('success', "All Task Deleted Successfully...", "", 1000);
                this.task = new TaskModel();
                this.selectedTaskIds = [];
                this.allSelected = false;
                this.getTask();
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
          this.getTask();
        }
      });
  }

    get paginationArray(): number[] {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
  
    goToPage(page: number): void {
      this.currentPage = page;
      this.getTask();
    }
  
    previousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getTask();
      }
    }
  
    nextPage(): void {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.getTask();
      }
    }
  
    goBack(): void {
      this._location.back();
    }

}

