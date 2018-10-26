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
import { UpdateNotesComponent } from './component/update-notes/update-notes.component';
import { LabelsComponent } from './component/labels/labels.component';
import { NewlabelComponent } from './component/newlabel/newlabel.component';

const routes: Routes = [
                       { path : 'signup', component: SignupComponent },
                       { path : 'login', component: LoginComponent  },
                       { path : 'forgotPassword', component : ForgotPasswordComponent},
                       { path : 'resetpassword/:forgotToken', component : ResetPasswordComponent},
                       { path : 'home' , component : HomeComponent, canActivate : [AuthGuard],  children : [
                       { path : 'notes', component : NotesComponent},
                       { path : 'labels', component : LabelsComponent},
                       { path : 'reminder' , component : ReminderComponent},
                       { path : 'archive' , component : ArchiveComponent},
                       { path : 'trash', component : TrashComponent},
                       { path : '', redirectTo : 'notes' , pathMatch : 'full',canActivate : [AuthGuard] }]
                       
                       },
                       { path : 'newlabel', component : NewlabelComponent},
                       {path : 'updateNotes', component : UpdateNotesComponent},
                       { path: '', redirectTo: 'login', pathMatch: 'full'}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
