import { Component, OnInit, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/userServices/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { Router } from '@angular/router';
import { ProductCartServiceService } from 'src/app/core/services/productCartServices/product-cart-service.service';
import { LoggerService } from 'src/app/core/services/loggerService/logger.service';
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
export class SignupComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private hide = true;
  private records = {};
  private basic: any;
  private message: any;
  private advance: any;
  private value = true;
  private value1 = true;
  private form: any = {};
  private cartId = localStorage.getItem('cartId')
  private Email = new FormControl('', [Validators.required,
  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]);
  private FirstName = new FormControl('', [Validators.required,
  Validators.pattern('[a-zA-Z]*')]);
  private LastName = new FormControl('', [Validators.required,
  Validators.pattern('[a-zA-Z]*')]);
  private password = new FormControl('', [Validators.required])
  model: any = {};
  private service: any;
  cards = [];
  private getIt : any=[];
  constructor(private userService: UserService, private snackBar: MatSnackBar,
    private cartService : ProductCartServiceService, private router: Router) { }
  ngOnInit() {
    this.getcartId();
    // this.users();
    this.records = this.userService.getService().subscribe(data => {
      for (var i = 0; i < data["data"].data.length; i++) {
        data["data"].data[i].select = false;
        this.cards.push(data["data"].data[i]);
      }
    })
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
  getcartId(){
    this.getIt=[];
    this.cartService.cartId(this.cartId).subscribe(data => {
      LoggerService.log('Success',data)
      this.getIt=data['data'].productId
    })
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
      this.userService.postConfig({
        "firstName": this.model.FirstName,
        "lastName": this.model.LastName,
        "service": this.service,
        "email": this.model.Email,
        "emailVerified": true,
        "password": this.model.password,
      })
        .pipe(takeUntil(this.destroy$))
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
        this.router.navigate(['/paymentPortal'])
    }
    else {
      this.snackBar.open("Registration", "Unsuccessful", {
        duration: 1000
      });
    }
  }
  onSubmit() {
    alert('Success' + JSON.stringify(this.model))
  }
  goTocart() {
    this.router.navigate(['/eCart'])
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}


