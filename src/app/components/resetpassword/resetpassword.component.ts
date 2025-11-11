import { Component } from '@angular/core';
import { FormComponent } from "../../shared/ui/form/form.component";
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
  isLoading:boolean =false
constructor(private _AuthService:AuthService , private _Router:Router , private _ToastrService:ToastrService){}
resetPass(user:any)
{
    this.isLoading=true

  this._AuthService.resetPassword(user).subscribe({
    next:(res)=>{
      console.log(res)
      this.isLoading=true
      this._Router.navigate(['auth/login']);
              this._ToastrService.success('password rest successfully ✅');

    }
  })
}
}
