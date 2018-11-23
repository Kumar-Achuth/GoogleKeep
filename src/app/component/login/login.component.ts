import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/core/services/loggerService/logger.service';
import { UserService } from 'src/app/core/services/userServices/user.service';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit , OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private hide = true;
  Email = new FormControl('', [Validators.required,
  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]);
  password = new FormControl('', [Validators.required])
  model: any = {}
  constructor(private userService:UserService, private snackBar: MatSnackBar,
    private router: Router) { }
  ngOnInit() {
  }
  getErrorMessage() {
    return this.Email.hasError('required') ? 'You must enter a value' :
      this.Email.hasError('pattern') ? 'Not a valid email' :
        '';
  }
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }
  isLeftVisible = false;
  message1: any;

  goTo() {
    if (!this.Email.invalid) {
      this.isLeftVisible = !this.isLeftVisible;
    }
    else {
      this.snackBar.open("Login", "Failed", {
        duration: 1000
      })
    }
  }
  emailValidation() {
    if (!this.Email.invalid && this.Email.valid) {
      this.isLeftVisible = !this.isLeftVisible;
    }
    else {
      this.snackBar.open("Invalid", "Input", {
        duration: 1000
      })
    }
  }
  /**
   * @description Api call for verified login credentials
   */
  loginValidation() {
    {
      if (this.password.valid) {
        this.userService.postLogin({
          "email": this.model.Email,
          "password": this.model.password
        })
        .pipe(takeUntil(this.destroy$))
          .subscribe(
            (data) => {
              this.snackBar.open("Login ", "Successful", {
                duration: 1000
              })
              localStorage.setItem("token", data['id']);
              localStorage.setItem("email", data['email']);
              localStorage.setItem("firstName", data['firstName']);
              localStorage.setItem("lastName", data['lastName']);
              localStorage.setItem("userId", data['userId']);
              localStorage.setItem("imageUrl",data['imageUrl'])
              var pushToken=localStorage.getItem('pushToken')
              var body={
                "pushToken":pushToken
              }
              this.userService.pushToken(body).subscribe(
                data=>{
                  LoggerService.log("Message Notification Available",data)
                }),
              this.router.navigateByUrl('/home')
            },
            error => {
              this.snackBar.open("Login", "Failed", {
                duration: 1000
              })
            }
          )
      }
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
  
}
