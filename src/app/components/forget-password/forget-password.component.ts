import { Component } from '@angular/core';
import { FormComponent } from "../../shared/ui/form/form.component";
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormComponent ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  isLoading:boolean= false
constructor(private _AuthService:AuthService , private _Router:Router){}
forgetPass(user:any)
{
  this.isLoading=true
  this._AuthService.forgetPassword(user).subscribe({
    next:(res)=>{
      console.log(res)
      localStorage.setItem("resetEmail",user.email)
      this.isLoading=false
this._Router.navigate(['auth/verifycode'])
    },error:(err)=>{
console.log(err);

    }
  })
}
}
