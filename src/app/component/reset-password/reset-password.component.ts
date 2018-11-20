import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/userServices/user.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  private hide = true;
  private model: any = {};
  private password = new FormControl('', [Validators.required])
  private confirmPassword = new FormControl('', [Validators.required])
  private accessToken = this.route.snapshot.params.forgotToken;
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
  constructor(private userService: UserService, private snackBar: MatSnackBar,
    private router: Router,
    public route: ActivatedRoute, ) { }
 
  ngOnInit() {
  }
  public input = new FormData();
  /**
   * @description Function to check if both the passwords are matching
   * And then generate New Password Using Api call
   */
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
      this.userService.postReset(body)
        .subscribe(response => {
        }, error => {
        })
    }
  }
}


