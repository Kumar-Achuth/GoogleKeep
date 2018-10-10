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
      background: "red",
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
        "background": "green",
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
  adv: any;
  bas: any;
  value = true;
  value1 = true;
  signupForm: FormGroup;
  emailId = new FormControl('', [Validators.required, Validators.email]);
  model: any = {};
  service: any;
  constructor(private myHttpService: HttpService) { }
  Basic() {
    this.value = !this.value;
    this.records = this.myHttpService.getConfig('/user/service').subscribe(data => {
      console.log('response', data);
      this.basic = data["data"].data[0].description;
    })
  }
  Advance() {
    this.value1 = !this.value1;
    // this.router.navigateByUrl('/login');
    this.records = this.myHttpService.getConfig('/user/service').subscribe(data => {
      console.log('response', data);
      this.advance = data["data"].data[1].description;
    })
  }
  ngOnInit() {


  }
  getErrorMessage() {
    return this.emailId.hasError('required') ? 'You must enter a value' :
      this.emailId.hasError('email') ? 'Not a valid email' :
        '';
  }
  send() {
    console.log(this.model.FirstName);
    console.log(this.model.LastName);
    console.log(this.model.Email);
    console.log(this.model.UserName);
    console.log(this.model.password)
    this.myHttpService
      .postCOnfig('user/userSignUp', {
        "firstName": this.model.FirstName,
        "lastName": this.model.LastName,
        "username": this.model.UserName,
        "phoneNumber": "9686977324",
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
//   reset(formState: any = null, options: {
//     onlySelf?: boolean;
//     emitEvent?: boolean;
// } = {}): void

}


