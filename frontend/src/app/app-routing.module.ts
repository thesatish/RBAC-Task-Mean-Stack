import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainContentComponent } from './dashboard/main-content/main-content.component';
import { HomeContentComponent } from './dashboard/home-content/home-content.component';
import { UserComponent } from './user/user.component';
import { SettingsComponent } from './settings/settings.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { authGuard } from './guard/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: "settings", component: ForbiddenComponent },

  {
    path: "dashboard",
    component: MainContentComponent,
    // canActivate: [AuthGuard],
    children: [

      // { path: "home", component: HomeContentComponent },
      { path: "user", component: UserComponent },
      { path: "settings", component: SettingsComponent },
      {
        path: 'home',
        component: HomeContentComponent,
        canActivate: [authGuard], 
        data: { role: ['admin'] } 
      },

      {
        path: 'task',
        loadChildren: () =>
          import('./task/task.module').then((m) => m.TaskModule),
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
