import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environment/environment.dev';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _httpclient:HttpClient) { }
  
 
  getProducts():Observable<any>
  {
     return this._httpclient.get(`${baseUrl}/api/v1/products`)
  }
  
}
