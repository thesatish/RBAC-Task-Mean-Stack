import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TaskRoutingModule } from './task-routing.module';
import { AddTaskComponent } from './add-task/add-task.component';
import { ListTaskComponent } from './list-task/list-task.component';


@NgModule({
  declarations: [
    AddTaskComponent,
    ListTaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }
