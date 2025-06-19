import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TaskRoutingModule } from './task-routing.module';
import { AddTaskComponent } from './add-task/add-task.component';
import { ListTaskComponent } from './list-task/list-task.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AddTaskComponent,
    ListTaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TaskRoutingModule,
    SharedModule
]
})
export class TaskModule { }
