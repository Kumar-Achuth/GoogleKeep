import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  hide = true;
  model: any = {};

  password = new FormControl('', [Validators.required])
  confirmPassword = new FormControl('', [Validators.required])
  getErrorMessagepassword() {
    return this.password.hasError('required') ? 'You must enter a value' :
      this.password.hasError('pattern') ? 'Password required' :
        '';
  }
  getErrorMessageConfirmPassword() {
    return this.confirmPassword.hasError('required') ? 'You must enter a value' :
      this.confirmPassword.hasError('pattern') ? 'Password required' :
        '';
  }

  constructor(private myHttpService: HttpService, private snackBar: MatSnackBar,
    private router: Router,
    public route: ActivatedRoute, ) { }
  public accessToken = this.route.snapshot.params.forgotToken;
  ngOnInit() {
  }
  public input = new FormData();

  match() {
    let pass = this.model.password;
    let confirmPass = this.model.confirmPassword;

    if (pass != confirmPass) {
      this.snackBar.open("Password Mismatch", "failed", {
        duration: 3000
      })

      return false;
    }
    else {
      this.snackBar.open("Password", "Generated", {
        duration: 3000
      })
      var body = {
        "newPassword": this.model.password
      }
      this.input.append('newPassword', this.model.password);
      this.myHttpService.postReset("user/reset-password", body, this.accessToken)
        .subscribe(response => {
        }, error => {
        })
    }
  }
}


