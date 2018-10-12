import { NgModule } from '@angular/core';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
const routes: Routes = [
                       { path :'signup', component: SignupComponent },
                       { path :'login', component: LoginComponent },
                       { path : 'forgotPassword', component : ForgotPasswordComponent},
                       { path : 'resetpassword/:forgotToken', component : ResetPasswordComponent},
                       { path: '', redirectTo: 'login', pathMatch: 'full'}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
