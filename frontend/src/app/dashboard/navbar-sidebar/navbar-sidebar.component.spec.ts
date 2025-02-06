import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSidebarComponent } from './navbar-sidebar.component';

describe('NavbarSidebarComponent', () => {
  let component: NavbarSidebarComponent;
  let fixture: ComponentFixture<NavbarSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarSidebarComponent]
    });
    fixture = TestBed.createComponent(NavbarSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
