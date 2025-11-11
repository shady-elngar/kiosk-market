import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { baseUrl } from '../../environment/environment.dev';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  constructor(private _HttpClient:HttpClient) {}
  cashOrder(cartId:number ,user:any):Observable<any>
  {
    return this._HttpClient.post(`${baseUrl}/api/v1/orders/${cartId}`  , user)
  }
  checkoutSession(cartId:number ,user:any):Observable<any>
  {
    return this._HttpClient.post(`${baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`  , user)
  }
}
