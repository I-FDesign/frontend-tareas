import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AlreadyLogguedGuard } from './guards/already-loggued.guard';
import { TaskComponent } from './components/task/task.component';

const appRoutes: Routes = [
  { path: 'home', canActivate: [ AuthGuard ], component: HomeComponent },
  { path: 'signup', canActivate: [ AlreadyLogguedGuard ] , component: SignupComponent },
  { path: 'login', canActivate: [ AlreadyLogguedGuard ] , component: LoginComponent },
  { path: 'task/new', canActivate: [AuthGuard], component: TaskComponent },
  { path: 'task/edit/:taskId', canActivate: [AuthGuard], component: TaskComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];


export const APP_ROUTING = RouterModule.forRoot(appRoutes);

