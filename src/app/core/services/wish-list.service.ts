import { Injectable } from '@angular/core';
import { baseUrl } from '../../environment/environment.dev';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WishListService {
wishCounter:BehaviorSubject<number>= new BehaviorSubject(Number(localStorage.getItem("wishNumber"))||0)

  constructor(private _HttpClient:HttpClient) { }
  addToWish (productId:string):Observable<any>
  {
    return this._HttpClient.post(`${baseUrl}/api/v1/wishlist`,{productId})
  }
   getLoggedWishList():Observable<any>
  {
    return this._HttpClient.get(`${baseUrl}/api/v1/wishlist`)
  }
   removeProduct (productId:string):Observable<any>
  {
    return this._HttpClient.delete(`${baseUrl}/api/v1/wishlist/${productId}`)
  }
}
