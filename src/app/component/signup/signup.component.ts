import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/userServices/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [
    trigger('basicAnime', [state('open', style({
    })),
    state('closed', style({
    })),
    transition('open => closed', [
      animate('1s')
    ]),
    ]),
    trigger('advanceAnime', [
      state('open', style({
      })),
      state('closed', style({
      })),
      transition('open => closed', [
        animate('1s')
      ]),
    ]),
  ]
})
export class SignupComponent implements OnInit {
  private hide = true;
  private records = {};
  private basic: any;
  private message: any;
  private advance: any;
  private value = true;
  private value1 = true;
  private form: any = {};
  private Email = new FormControl('', [Validators.required,
  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]);
  private FirstName = new FormControl('', [Validators.required,
  Validators.pattern('[a-zA-Z]*')]);
  private LastName = new FormControl('', [Validators.required,
  Validators.pattern('[a-zA-Z]*')]);
  private password = new FormControl('', [Validators.required])
  private model: any = {};
  private service: any;
  private cards = [];
  constructor(public myHttpService: HttpService, private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.users();
    // this.records = this.myHttpService.getConfig().subscribe(data => {
    //   for (var i = 0; i < data["data"].data.length; i++) {
    //     data["data"].data[i].select = false;
    //     this.cards.push(data["data"].data[i]);
    //   }
    // })
  }
/** 
 * @param card 
 * @description Function to Select Basic and Advanced Services Cards
 */
  selectCards(card) {
    this.service = card.name;
    card.select = true;
    for (var i = 0; i < this.cards.length; i++) {
      if (card.name == this.cards[i].name) {
        continue;
      }
      this.cards[i].select = false;
    }
  }

  getErrorMessage() {
    return this.Email.hasError('required') ? 'You must enter a value' :
      this.Email.hasError('pattern') ? 'Not a valid email' :
        '';
  }
  getErrorMessageFirstName() {
    return this.FirstName.hasError('required') ? 'You must enter a value' :
      this.FirstName.hasError('pattern') ? 'Not a valid Name' :
        '';
  }
  getErrorMessageLastName() {
    return this.LastName.hasError('required') ? 'You must enter a value' :
      this.LastName.hasError('pattern') ? 'Not a valid Name' :
        '';
  }
  getErrorMessagepassword() {
    return this.password.hasError('required') ? 'You must enter a value' :
      this.password.hasError('pattern') ? 'Password required' :
        '';
  }
  /**
   * @description Api Call for signup for a new user 
   */
  send() {
    if (this.LastName.valid && this.FirstName.valid) {
      this.myHttpService.postConfig('user/userSignup', {
        "firstName": this.model.FirstName,
        "lastName": this.model.LastName,
        "service": this.service,
        "email": this.model.Email,
        "emailVerified": true,
        "password": this.model.password,
      })
        .subscribe(
          () => {
            this.snackBar.open("Registration", "Successful", {
              duration: 1000
            });
            this.message = "Successful Registration";
          },
          () => {
            this.snackBar.open("Registration", "Unsuccessful", {
              duration: 1000
            });
            this.message = "Registration UnSuccessful ";
          }
        )
    }
    else {
      () => {
        this.snackBar.open("Registration", "Unsuccessful", {
          duration: 1000
        });
      }
    }
  }
  onSubmit() {
    alert('Success' + JSON.stringify(this.model))
  }
  users(){
    this.records = this.myHttpService.getConfig('user/service').subscribe(data => {
      for (var i = 0; i < data["data"].data.length; i++) {
        data["data"].data[i].select = false;
        this.cards.push(data["data"].data[i]);
      }
    })
  }
}


