import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { baseUrl } from '../../environment/environment.dev';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserOrderService  {

  constructor(private _HttpClient:HttpClient) {}

  getUserOrder(owner:string):Observable<any>
  {
    return this._HttpClient.get(`${baseUrl}/api/v1/orders/user/${owner}`)
  }
}
