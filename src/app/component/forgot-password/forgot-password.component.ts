import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../core/services/httpServices/http.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  private Email = new FormControl('', [Validators.required, Validators.email]);
  private isLeftVisible = false;
  private model: any = {}
  constructor(private myHttpService: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  getErrorMessage() {
    return this.Email.hasError('required') ? 'You must enter a value' :
      this.Email.hasError('email') ? 'Not a valid email' :
        '';
  }
  /**
   * @description Api Call to reset Account Password
   */
  goToPassword() {
    if (!this.Email.invalid) {
      this.myHttpService.postPassword('user/reset', {
        "email": this.model.Email,
      })
        .subscribe(
          (data) => {
            this.snackBar.open("Message", "Please Check Your Email", {
              duration: 2000
            })
          },
          error => {
            this.snackBar.open("Invalid", "input", {
              duration: 1000
            })
          }
        )
    }
    else {
      this.snackBar.open("Invalid", "Input", {
        duration: 1000
      })
    }
  }
}
