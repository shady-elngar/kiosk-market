import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environment/environment.dev';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor(private _HttpClient:HttpClient) { }

  getProductDetails(id:any):Observable<any>
  {
    return this._HttpClient.get(`${baseUrl}/api/v1/products/${id}`)
  }
}
