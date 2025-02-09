import { Component } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  // templateUrl: './forbidden.component.html',
  template: `<h2>Access Denied</h2><p>You do not have permission to view this page.</p>`,
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent {

}
