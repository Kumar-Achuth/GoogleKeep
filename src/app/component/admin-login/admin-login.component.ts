import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  hide = true;
  Email = new FormControl('', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]);
  password = new FormControl('',[Validators.required])
model : any = {}
  constructor(private myHttpService: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  getErrorMessage() {
    return this.Email.hasError('required') ? 'You must enter a value' :
      this.Email.hasError('pattern') ? 'Not a valid email' :
        '';
  }
  loginValidation(){
    {
      if(this.password.valid){
      this.myHttpService.postLogin('user/login',{
        "email": this.model.Email,
        "password" : this.model.password
    
      })
      .subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
          this.snackBar.open("Login ", "Successful",{
            duration : 1000
            })
        },
        error => {
          console.log("Error", error);
          this.snackBar.open("Login", "Failed",{
            duration : 1000
            })
        }
      )
      }
      else
      {
        error =>{
          console.log('Login Failed')
        }
      }
    }
  }
}
