import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() open = false;
  balanceOpen = false

  dropdownStates: { [key: string]: boolean } = {};

  toggleDropdown(menu: string): void {
    this.dropdownStates[menu] = !this.dropdownStates[menu];
  }

  isOpen(menu: string): boolean {
    return this.dropdownStates[menu];
  }

    openListBalance() {
    this.balanceOpen = !this.balanceOpen
  }

}
