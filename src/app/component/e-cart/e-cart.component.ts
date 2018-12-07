import { Component, OnInit,OnDestroy } from '@angular/core';
import { UserService } from 'src/app/core/services/userServices/user.service';
import { LoggerService } from 'src/app/core/services/loggerService/logger.service';
import { ServiceDetailsComponent } from '../service-details/service-details.component';
import { MatDialog } from '@angular/material';
import { ProductCartServiceService } from 'src/app/core/services/productCartServices/product-cart-service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-e-cart',
  templateUrl: './e-cart.component.html',
  styleUrls: ['./e-cart.component.scss']
})
export class ECartComponent implements OnInit ,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>(); 
  private service=[];
  private serviceOne:any;
  constructor(private userService : UserService, private dialog: MatDialog, private cartService : ProductCartServiceService) { }

  ngOnInit() {
    this.getServices();
  }
getServices(){
  this.service=[];
  this.userService.getService().subscribe(data => {
    for (var i = 0; i < data["data"].data.length; i++) {
      data["data"].data[i].select = false;
      this.service.push(data["data"].data[i]);
    }
    LoggerService.log('Success',this.service);
  })
}
selectCards(card) {
  this.serviceOne = card.name;
  card.select = true;
  for (var i = 0; i < this.service.length; i++) {
    if (card.name == this.service[i].name) {
      continue;
    }
    this.service[i].select = false;
  }
}
addToCart(index){
  this.cartService.addTocart({
    "productId" : index.id 
  }).pipe(takeUntil(this.destroy$))  
  .subscribe(data => {
      LoggerService.log('Success', data)
      localStorage.setItem("cartId",data['data']['details'].id)
  const dialogRef = this.dialog.open(ServiceDetailsComponent, {
    width: '500px',
    height: '350px',
    data: index
  });
  dialogRef.afterClosed().subscribe(() => {
    this.getServices();
  });
})
}
ngOnDestroy() {
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}
}
