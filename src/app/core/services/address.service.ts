import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { baseUrl } from '../../environment/environment.dev';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AddressService {

    constructor(private _HttpClient:HttpClient) {}
    address(user:any):Observable<any>
  {
    return this._HttpClient.post(`${baseUrl}/api/v1/addresses`  , user)
  }
}
