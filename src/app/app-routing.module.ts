import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Auth Component
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
// CRUD Component
import { IndexComponent } from './crud/index/index.component';
import { UpdateComponent } from './crud/update/update.component';
import { AddComponent } from './crud/add/add.component';
// Error Component
import { ErrorPageComponent } from './error-page/error-page.component';
// Guard
import { AuthGuard } from './guard/auth.guard';
const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'edit/:id',
    component: UpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: AddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: '**',
    component: ErrorPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
