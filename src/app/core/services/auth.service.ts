import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { baseUrl } from '../../environment/environment.dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
token:string= JSON.stringify(localStorage.getItem("token"))
  constructor(private _HttpClient:HttpClient) {}
  
  register(user:any):Observable<any>
  {
    return this._HttpClient.post(`${baseUrl}/api/v1/auth/signup`  , user)
  }
  login(user:any):Observable<any>
  {
    return this._HttpClient.post(`${baseUrl}/api/v1/auth/signin`  , user)
  }
  forgetPassword(user:any):Observable<any>
  {
    return this._HttpClient.post(`${baseUrl}/api/v1/auth/forgotPasswords`  , user)
  }
  verifyResetCode(user:any):Observable<any>
  {
    return this._HttpClient.post(`${baseUrl}/api/v1/auth/verifyResetCode`  , user)
  }
  resetPassword(user:any):Observable<any>
  {
    return this._HttpClient.put(`${baseUrl}/api/v1/auth/resetPassword`  , user)
  }

}
