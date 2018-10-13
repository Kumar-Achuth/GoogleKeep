import { NgModule } from '@angular/core';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
// import { SideBarComponent } from './component/side-bar/side-bar.component';
// import { ToolBarComponent } from './component/tool-bar/tool-bar.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
                       { path : 'signup', component: SignupComponent },
                       { path : 'login', component: LoginComponent },
                       { path : 'forgotPassword', component : ForgotPasswordComponent},
                       { path : 'resetpassword/:forgotToken', component : ResetPasswordComponent},
                       { path : 'home' , component : HomeComponent
                        // { path : '', component : SideBarComponent , outlet : "sidebar"},
                        // { path : '' , component : ToolBarComponent, outlet : "toolbar"},
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
