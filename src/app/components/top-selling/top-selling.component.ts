import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { ProductCardComponent } from "../../shared/ui/product-card/product-card.component";
import { NgxSpinnerService } from 'ngx-spinner'; 

@Component({
  selector: 'app-top-selling',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './top-selling.component.html',
  styleUrl: './top-selling.component.css'
})
export class TopSellingComponent implements OnInit {
constructor(private _ProductsService:ProductsService , private _NgxSpinnerService:NgxSpinnerService){}
topSelling:Product[]=[]
ngOnInit(): void {
  this._NgxSpinnerService.show()
  this._ProductsService.getProducts().subscribe({
    next:(res)=>{console.log(res)
      this._NgxSpinnerService.hide()
      this.topSelling=res.data.filter((s:Product)=>{return s.sold > 5000})
      console.log(this.topSelling)
    },
    error:(err)=>{console.log(err)
      this._NgxSpinnerService.hide()
    }
  })
}
}
