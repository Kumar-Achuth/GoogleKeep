import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [
    trigger('basicAnime', [state('open', style({
      "height": "90px",
      "width": "150px",
      background: "lightblue",
      "word-wrap": "break-word"
    })),
    state('closed', style({
      "height": "90px",
      "width": "150px",
      background: "goldenrod",
      "word-wrap": "break-word"
    })),
    transition('open => closed', [
      animate('1s')
    ]),
    ]),
    trigger('advanceAnime', [
      state('open', style({
        "height": "90px",
        "width": "150px",
        "background": "lightgrey",
        "word-wrap": "break-word"
      })),
      state('closed', style({
        "height": "90px",
        "width": "150px",
        "background": "goldenrod",
        "word-wrap": "break-word"
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
  advance: any;
  value = true;
  value1 = true;
  signupForm: FormGroup;
  form: any = {};
  Email = new FormControl('', [Validators.required, Validators.email]);
  FirstName = new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]*')]);
  LastName = new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]*')]);
  // UserName = new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z|0-9]*')]);
  // PhoneNumber = new FormControl('',[Validators.required,Validators.pattern('[5-9][0-9]*')]);
  password = new FormControl('',[Validators.required])
  model: any = {};
  service: any;
  constructor(private myHttpService: HttpService) { }
  Basic() {
    this.value = !this.value;
    this.records = this.myHttpService.getConfig('/user/service').subscribe(data => {
      console.log('response', data['data'].data[0]);
      
    })
  }
  Advance() {
    this.value1 = !this.value1;
    
    this.records = this.myHttpService.getConfig('/user/service').subscribe(data => {
      console.log('response', data['data'].data[1]);
      
    })
  }
  ngOnInit() {
  }
  getErrorMessage() {
    return this.Email.hasError('required') ? 'You must enter a value' :
      this.Email.hasError('email') ? 'Not a valid email' :
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
  // getErrorMessageUserName() {
  //   return this.UserName.hasError('required') ? 'You must enter a value' :
  //     this.UserName.hasError('pattern') ? 'Not a valid Name' :
  //       '';
  // }
  // getErrorMessagePhoneNumber() {
  //   return this.PhoneNumber.hasError('required') ? 'You must enter a value' :
  //     this.PhoneNumber.hasError('pattern') ? 'Minimum 10 Numbers' :
  //       '';
  // }
  getErrorMessagepassword() {
    return this.password.hasError('required') ? 'You must enter a value' :
      this.password.hasError('pattern') ? 'Password required' :
        '';
  }
  send() {
    console.log(this.model.FirstName);
    console.log(this.model.LastName);
    console.log(this.model.Email);
    // console.log(this.model.UserName);
    console.log(this.model.password)
    // console.log(this.model.PhoneNumber)
    this.myHttpService
      .postConfig('user/userSignUp', {
        "firstName": this.model.FirstName,
        "lastName": this.model.LastName,
        // "username": this.model.UserName,
        // "phoneNumber": "9686977324",
        "service": "string",
        "email": this.model.Email,
        "emailVerified": true,
        "password": this.model.password,
        "createdDate": "2018-10-09T06:35:12.617Z",
        "modifiedDate": "2018-10-09T06:35:12.617Z",
      })
      .subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
        },
        error => {
          console.log("Error", error);
        }
      )
  }
  onSubmit()
  {
    alert('Success' + JSON.stringify(this.model))
  }

}


