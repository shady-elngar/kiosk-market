import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environment/environment.dev';
@Injectable({
  providedIn: 'root'
})
export class BrandsService {

   constructor(private _httpclient:HttpClient) { }
    getCategories():Observable<any>
  {
     return this._httpclient.get(`${baseUrl}/api/v1/brands`)
  }
}
