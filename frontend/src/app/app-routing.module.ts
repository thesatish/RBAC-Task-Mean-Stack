import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeContentComponent } from './dashboard/home-content/home-content.component';
import { UserComponent } from './user/user.component';
import { SettingsComponent } from './settings/settings.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { authGuard } from './guard/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: "settings", component: ForbiddenComponent },

  {
    path: "dashboard",
    component: MainLayoutComponent,
    // canActivate: [authGuard],
    children: [

      // { path: "home", component: HomeContentComponent },
      {
        path: "user",
        component: UserComponent,
        data: { role: [0] }
      },
      {
        path: "settings",
        component: SettingsComponent,
        canActivate: [authGuard],
        data: { role: [0] }
      },
      {
        path: 'home',
        component: HomeContentComponent,
        canActivate: [authGuard],
        data: { role: [0, 1] }
      },

      {
        path: 'task',
        loadChildren: () =>
          import('./task/task.module').then((m) => m.TaskModule),

        data: { role: [0, 1, 2] }
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      { path: "**", component: NotFoundComponent },
    ],
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
