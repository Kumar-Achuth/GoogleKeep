import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { HttpService } from '../../services/http.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  Email = new FormControl('', [Validators.required, Validators.email]);
  isLeftVisible = false;
  model : any = {}
  constructor(private myHttpService: HttpService, private snackBar : MatSnackBar) { }

  ngOnInit() {
  }
  getErrorMessage() {
    return this.Email.hasError('required') ? 'You must enter a value' :
      this.Email.hasError('email') ? 'Not a valid email' :
        '';
  }
//   goTo()
//   {
//     if(!this.Email.invalid)
//     {
//       this.snackBar.open("Valid", "EmailId",{
//         duration : 2000
//         })
//         }
//   else
//   {
// this.snackBar.open("Incorrect", "EmailId",{
// duration : 2000
// })
//     }
// }
goToPassword()
{
  if(!this.Email.invalid){
  this.myHttpService.postPassword('user/reset',{
    "email": this.model.Email,

  })
  .subscribe(
    (data) => {
      console.log("POST Request is successful ", data);
      this.snackBar.open("Message", "Please Check Your Email",{
        duration : 2000
        })
    },
    error => {
      console.log("Error", error);
      this.snackBar.open("Invalid", "input",{
        duration : 1000
        })
    }
  )
}
else{
  this.snackBar.open("Invalid", "Input",{
    duration : 1000
    })
}
}
}
