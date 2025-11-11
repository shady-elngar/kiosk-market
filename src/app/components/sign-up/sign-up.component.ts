import { Component } from '@angular/core';
import { FormComponent } from "../../shared/ui/form/form.component";
import { AuthService } from '../../core/services/auth.service';
import {  ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormComponent, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent  {
isLoading:boolean= false

  constructor(private _AuthService:AuthService , private _Router:Router , private _ToastrService:ToastrService ){}

   
rigesterHundeler(data:any)
{
  
  this.isLoading=true
  this._AuthService.register(data).subscribe({
    next:(res)=>{console.log(res)
      localStorage.setItem("token",res.token)
      this._ToastrService.success(res.message )
      this._Router.navigate(['auth/login'])
      this.isLoading=false
    },
    error:(err)=>{console.log(err)
      this.isLoading=false
      this._ToastrService.error(err.error.errors?.msg)
      this._ToastrService.error(err.error.message)

    }
  })
 
}


}
