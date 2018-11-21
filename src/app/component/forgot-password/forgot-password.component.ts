import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/core/services/userServices/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>(); 
  private Email = new FormControl('', [Validators.required, Validators.email]);
  private isLeftVisible = false;
  private model: any = {}
  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

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
      this.userService.postPassword( {
        "email": this.model.Email,
      })
      .pipe(takeUntil(this.destroy$))
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
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
}
}
