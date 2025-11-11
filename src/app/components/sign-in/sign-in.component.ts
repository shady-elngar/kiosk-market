import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormComponent } from '../../shared/ui/form/form.component';
import { ToastrService } from 'ngx-toastr';
import {  ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormComponent ,ReactiveFormsModule , RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  isLoading:boolean= false
  constructor(private _AuthService:AuthService , private _Router:Router , private _ToastrService:ToastrService){}


  loginHundeler(data:any)
{
  
  this.isLoading=true
  this._AuthService.login(data).subscribe({
    next:(res)=>{console.log(res)
      localStorage.setItem("token",res.token)
      this._ToastrService.success(res.message )
      this._Router.navigate(['main/home'])
      
      this.isLoading=false
    },
    error:(err)=>{console.log(err)
      this.isLoading=false
      this._ToastrService.error(err?.error?.errors?.msg)
      this._ToastrService.error(err?.error?.message)


    }
  })
 
}
}
