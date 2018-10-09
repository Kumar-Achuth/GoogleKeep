import { NgModule } from '@angular/core';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
                       { path :'signup', component: SignupComponent },
                       { path :'login', component: LoginComponent },
                       { path :'home', component : HomeComponent},
                       { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
