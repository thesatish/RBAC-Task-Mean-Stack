import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar-sidebar',
  templateUrl: './navbar-sidebar.component.html',
  styleUrls: ['./navbar-sidebar.component.scss']
})
export class NavbarSidebarComponent {
  constructor(
    private _authService: AuthService,
  ) {}

  logout() {
    this._authService.logout();
  }

}
