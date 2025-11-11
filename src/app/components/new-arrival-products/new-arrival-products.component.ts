import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { ProductCardComponent } from "../../shared/ui/product-card/product-card.component";
import { ToastrService } from 'ngx-toastr';
import { LoadingSpinnerComponent } from '../../shared/ui/loading-spinner/loading-spinner.component';
import { NgxSpinnerService } from 'ngx-spinner'; 

@Component({
  selector: 'app-new-arrival-products',
  standalone: true,
  imports: [ProductCardComponent, LoadingSpinnerComponent],
  templateUrl: './new-arrival-products.component.html',
  styleUrl: './new-arrival-products.component.css'
})
export class NewArrivalProductsComponent implements OnInit {
 newArrivel:Product[]=[]

constructor(private _ProductsService:ProductsService , private _ToastrService:ToastrService , private _NgxSpinnerService:NgxSpinnerService){}
ngOnInit(): void {
  
  this._NgxSpinnerService.show()
  this._ProductsService.getProducts().subscribe({
    next:(res)=>{console.log(res)
      this.newArrivel=res.data.slice(17,23)
    
      this._NgxSpinnerService.hide()
    },
    error:(err)=>{console.log(err)
      this._ToastrService.error(err)
      
      this._NgxSpinnerService.hide()
    }
  })
}
}
