import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  Email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private myHttpService: HttpService) { }

  ngOnInit() {
  }
  getErrorMessage() {
    return this.Email.hasError('required') ? 'You must enter a value' :
      this.Email.hasError('email') ? 'Not a valid email' :
        '';
  }
  submitted = false;
 
  onSubmit() { 
    this.submitted = true; 
  }

/**   For going to next animations function */

  isLeftVisible = false;
message1 : any;

  goTo()
  {
    if(!this.Email.invalid)
    {
    this.isLeftVisible = !this.isLeftVisible;
    this.message1 = "Please Enter The Password "
  }
  else
  {
    alert('Invalid EmailId')
    this.message1 = "Incorrect EmailId"
    }
}

}
