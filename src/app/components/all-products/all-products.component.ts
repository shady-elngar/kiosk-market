import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { ProductCardComponent } from "../../shared/ui/product-card/product-card.component";
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingSpinnerComponent } from "../../shared/ui/loading-spinner/loading-spinner.component"; 
import { ToastrService } from 'ngx-toastr';

ProductsService
@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [ProductCardComponent, LoadingSpinnerComponent],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit {
  allproduct:Product[]=[]
  menProduct:Product[]=[]
  womenProduct:Product[]=[]
  elecProduct:Product[]=[]
  men:boolean=false
  women:boolean=false
  elec:boolean=false
  all:boolean=true
  
  
constructor(private _ProductsService:ProductsService , private _NgxSpinnerService:NgxSpinnerService , private _ToastrService:ToastrService){}
ngOnInit(): void {
  this._NgxSpinnerService.show()
  this._ProductsService.getProducts().subscribe({
    next:(res)=>{console.log(res)
      this._NgxSpinnerService.hide()
      this.allproduct=res.data
      this.womenProduct=res.data.slice(0,10)
      this.menProduct=res.data.slice(11,33)
      this.elecProduct=res.data.slice(33,39)
      console.log(this.allproduct)
    },
    error:(err)=>{console.log(err)
      this._NgxSpinnerService.hide()
      this._ToastrService.error(err.error.errors?.msg)
      this._ToastrService.error(err.error.message)
    }
  })
}
showMen():any{
this.men=true
this.women=false
this.elec=false
this.all=false
}
showwomen():any{
this.women=true
this.elec=false
this.men=false
this.all=false

}
showElec():any{
this.elec=true
this.men=false
this.women=false
this.all=false
}
showAll():any{
this.elec=false
this.men=false
this.women=false
this.all=true
}

}
 