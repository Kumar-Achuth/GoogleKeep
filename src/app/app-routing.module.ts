import { NgModule } from '@angular/core';
import{LoginComponent} from './component/login/login.component';
import{SignupComponent} from './component/signup/signup.component';
import{Routes,RouterModule} from '@angular/router';

const routes : Routes = [
                        {path:'signup',component : SignupComponent},
                        {path:'login',component : LoginComponent},
                        {path:'',redirectTo : 'login',pathMatch : 'full'}
                      ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports : [RouterModule]

})
export class AppRoutingModule { }
