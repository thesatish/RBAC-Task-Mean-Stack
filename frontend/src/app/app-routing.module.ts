import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainContentComponent } from './dashboard/main-content/main-content.component';
import { HomeContentComponent } from './dashboard/home-content/home-content.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: "dashboard",
    component: MainContentComponent,
    // canActivate: [AuthGuard],
    children: [

      { path: "home", component: HomeContentComponent },

      {
        path: 'task',
        loadChildren: () =>
          import('./task/task.module').then((m) => m.TaskModule),
      },
      // { path: "**", component: NotFoundComponent },
    ],
  },

  // { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
