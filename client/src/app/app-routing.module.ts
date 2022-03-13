import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  ActivateAccountComponent } from './activate-account/activate-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PracticeTestsComponent } from './practice-tests/practice-tests.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResultsComponent } from './results/results.component';
import { SampleTestsComponent } from './sample-tests/sample-tests.component';
import { AuthGuard } from './shared/services/auth.guard';
import { RoleGuard } from './shared/services/role.guard';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [ 
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'practice-tests', component: PracticeTestsComponent, canActivate: [AuthGuard]},
  { path: 'sample-tests', component: SampleTestsComponent},
  { path: 'about', component: AboutComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, RoleGuard]},
  { path: 'results', component: ResultsComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'change-password', component: ChangePasswordComponent,  canActivate: [AuthGuard]},
  { path: 'activate-account', component: ActivateAccountComponent },
  { path: 'profile', component: UserProfileComponent,  canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
