import { NgModule } from '@angular/core';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { HomeComponent } from './component/home/home.component';
import { NotesComponent } from './component/notes/notes.component';
import { ReminderComponent } from './component/reminder/reminder.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { TrashComponent } from './component/trash/trash.component';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
                       { path : 'signup', component: SignupComponent },
                       { path : 'login', component: LoginComponent },
                       { path : 'forgotPassword', component : ForgotPasswordComponent},
                       { path : 'resetpassword/:forgotToken', component : ResetPasswordComponent},
                       { path : 'home' , component : HomeComponent, children : [
                       { path : 'notes', component : NotesComponent},
                       { path : 'reminder' , component : ReminderComponent},
                      { path : 'archive' , component : ArchiveComponent},
                    {path  : 'trash', component : TrashComponent}]
                       
                       },
                       {path : 'adminDashboard' , component : AdminDashboardComponent},
                       { path : 'adminLogin' , component : AdminLoginComponent},
                       { path: '', redirectTo: 'login', pathMatch: 'full'}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
