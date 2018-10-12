import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormGroup } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
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
  hide = true;
  records = {};
  basic: any;
  message : any;
  advance: any;
  value = true;
  value1 = true;
  form: any = {};
  Email = new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]);
  FirstName = new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]*')]);
  LastName = new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]*')]);
  password = new FormControl('',[Validators.required])
  model: any = {};
  service: any;
  cards = [];
  constructor(private myHttpService: HttpService, private snackBar : MatSnackBar) { }
  
  
  ngOnInit() {
    this.records = this.myHttpService.getConfig('/user/service').subscribe(data => {
      // console.log('response', data);
      for (var i = 0; i < data["data"].data.length; i++) {
        data["data"].data[i].select = false;
        this.cards.push(data["data"].data[i]);
      }
     var value = data["data"].data.name;
      // console.log("cards are", this.cards);
    })
  }
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
  send() {
    if(this.LastName.valid && this.FirstName.valid ){
    console.log(this.model.FirstName);
    console.log(this.model.LastName);
    console.log(this.model.Email);
    console.log(this.service);
    console.log(this.model.password)
    this.myHttpService.postConfig('user/userSignUp', {
        "firstName": this.model.FirstName,
        "lastName": this.model.LastName,
        "service": this.service,
        "email": this.model.Email,
        "emailVerified": true,
        "password": this.model.password,
        // "createdDate": "2018-10-09T06:35:12.617Z",
        // "modifiedDate": "2018-10-09T06:35:12.617Z",
      })
      .subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
          this.snackBar.open("Registration", "Successful",{
            duration : 1000
            })
          this.message = "Successful Registration"
        },
        error => {
          console.log("Error", error);
          this.snackBar.open("Registration", "Unsuccessful",{
            duration : 1000
            })
          this.message = "Registration UnSuccessful "
        }
      )
      }
      else{
       error  => {
          console.log("Error", error);
          this.snackBar.open("Registration", "Unsuccessful",{
            duration : 1000
            })
      }
  }
}
  onSubmit()
  {
    alert('Success' + JSON.stringify(this.model))
  }

  
}


