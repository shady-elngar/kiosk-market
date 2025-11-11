import { Injectable } from '@angular/core';
import { baseUrl } from '../../environment/environment.dev';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
counter:BehaviorSubject<number>= new BehaviorSubject(Number(localStorage.getItem("cartNumber")))
  constructor(private _HttpClient:HttpClient) { }
  addToCart (productId:string):Observable<any>
  {
    return this._HttpClient.post(`${baseUrl}/api/v1/cart`,{productId})
  }
  deleteProduct (productId:string):Observable<any>
  {
    return this._HttpClient.delete(`${baseUrl}/api/v1/cart/${productId}`)
  }
  
  getLoggedCart():Observable<any>
  {
    return this._HttpClient.get(`${baseUrl}/api/v1/cart`)
  }
  clearCart():Observable<any>
  {
    return this._HttpClient.delete(`${baseUrl}/api/v1/cart`)

  }
  updateItemQty(productId:string , count:number):Observable<any>
  {
    return this._HttpClient.put(`${baseUrl}/api/v1/cart/${productId}`,{count})
  }
}
