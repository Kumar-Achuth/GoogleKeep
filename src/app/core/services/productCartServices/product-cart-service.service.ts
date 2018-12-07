import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCartServiceService {

  constructor(private http: HttpService) { }
  addTocart(body){
    return this.http.postJSON('productcarts/addToCart',body)
  }
  cartId(id){
    return this.http.getJSON('productcarts/getCartDetails/'+id+'')
  }
}
