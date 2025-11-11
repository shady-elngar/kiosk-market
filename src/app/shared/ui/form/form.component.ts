import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AlretComponent } from "../alret/alret.component";
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, AlretComponent , NgClass],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit  {
@Input({required:true}) fields:any[]=[]
@Output() fromSubmit = new EventEmitter()
isShow:boolean =false
@Input ({required:true})Loading!:boolean 
@Input ({required:true}) btnContant:string =""

Form = new FormGroup ({},{ validators: this.passwordMatchValidator })


buildForm()
{
  for(let field of this.fields)
  {
    this.Form.addControl(field , new FormControl(null , this.getValidators(field) ))
  }
}
getValidators(field: string): ValidatorFn[] {
  if (field === 'email') {
    return [Validators.required, Validators.email];
  } else if (field === 'password' || field === 'rePassword' || field === 'newPassword') {
    return [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)];
  } else if (field === 'name') {
    return [Validators.required, Validators.maxLength(15),Validators.minLength(2)];
  } else if (field === 'phone') {
    return [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)];
  } else {
    return [Validators.required];
  }
}
passwordMatchValidator(Form: AbstractControl): ValidationErrors | null {
 

  let password = Form.get('password')?.value;
  let rePassword = Form.get('rePassword')?.value;
  if (!password || !rePassword) {
    return null;
  }

  if (password !== rePassword) {
    return { passwordMismatch: true };
  }

  return null;
}

ngOnInit(): void {
    this.buildForm()
}
formHundel()
{
  
  if(this.Form.valid)
  {
    this.fromSubmit.emit(this.Form.value)
    
  } 
}
show()
  {
    if(this.isShow==false)
    {
      this.isShow= true
    }else if(this.isShow== true){
      this.isShow= false
    }
  }
}

