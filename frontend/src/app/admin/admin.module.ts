import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { ModuleManagementComponent } from './module-management/module-management.component';
import { RolesAndPermissionsComponent } from './roles-and-permissions/roles-and-permissions.component';
import { RolesComponent } from './roles/roles.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UserManagementComponent,
    ModuleManagementComponent,
    RolesAndPermissionsComponent,
    RolesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
