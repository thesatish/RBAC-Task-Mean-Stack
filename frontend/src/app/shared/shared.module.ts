import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { UiSwitchModule } from "ngx-ui-switch";



@NgModule({
  declarations: [
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    UiSwitchModule.forRoot({
      size: 'small',
      color: 'rgb(0, 189, 99)',
      switchColor: '#fff',
      defaultBgColor: '#ff0000',
      defaultBoColor: '#fff',
      // checkedLabel: 'on',
      // uncheckedLabel: 'off'
    }),
  ],
  exports: [
    PaginatorComponent,
    UiSwitchModule
  ]
})
export class SharedModule { }
