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
import { AuthGuard} from './component/auth.guard';

const routes: Routes = [
                       { path : 'signup', component: SignupComponent },
                       { path : 'login', component: LoginComponent  },
                       { path : 'forgotPassword', component : ForgotPasswordComponent},
                       { path : 'resetpassword/:forgotToken', component : ResetPasswordComponent},
                       { path : 'home' , component : HomeComponent,  children : [
                       { path : 'notes', component : NotesComponent},
                       { path : 'reminder' , component : ReminderComponent},
                       { path : 'archive' , component : ArchiveComponent},
                       { path : 'trash', component : TrashComponent},
                       { path : '', redirectTo : 'notes' , pathMatch : 'full',canActivate : [AuthGuard] }]
                       
                       },
                       { path: '', redirectTo: 'login', pathMatch: 'full'}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
