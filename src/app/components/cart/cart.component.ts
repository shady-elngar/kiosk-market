import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingSpinnerComponent } from '../../shared/ui/loading-spinner/loading-spinner.component';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [LoadingSpinnerComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartProducts: any[] = [];
  allRes: any;
  deletloadingProductId: string | null = null;
  isLoading:boolean= false
  loadingIncreaseProductId: string | null = null;
  loadingDecreaseProductId: string | null = null;
  cartId:any 

  constructor(
    private _CartService: CartService,
    private _NgxSpinnerService: NgxSpinnerService,
    private _ToastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.getLoggedCart();
  }
  getLoggedCart() {
    this._NgxSpinnerService.show();
    this._CartService.getLoggedCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartId=res.cartId
        console.log(this.cartId);
        
        this._CartService.counter.next(res.numOfCartItems)
        localStorage.setItem("cartNumber",JSON.stringify(res.numOfCartItems))
        this.cartProducts = res.data.products;
        this.allRes = res;
        console.log(this.cartProducts);
        this._NgxSpinnerService.hide();

      },
      
    });
  }
  deleteItem(productId: string) {
     this.deletloadingProductId = productId;
    this._CartService.deleteProduct(productId).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem("cartNumber",JSON.stringify(res.numOfCartItems))
        this.getLoggedCart();
        this.deletloadingProductId = null;
        this._ToastrService.success("your item is deleted successfuly")
      },error:(err)=>{this.deletloadingProductId = null;}
    });
  }
  clearCart()
  {
    this.isLoading=true
    this._CartService.clearCart().subscribe({
      next:(res)=>{console.log(res)
        this.isLoading=false
        this.getLoggedCart();
        localStorage.setItem("cartNumber",JSON.stringify(0))
      }
    })
  }
  updateItemQty(productId:string , count:number , type:'increase'|'decrease')
  {
    if(type=='increase')
    {
       this.loadingIncreaseProductId=productId
    }else{
      this.loadingDecreaseProductId=productId
    }
    
    this._CartService.updateItemQty(productId,count).subscribe({
      next:(res)=>{console.log(res)
        this.loadingIncreaseProductId = null
        this.loadingDecreaseProductId = null
        this.getLoggedCart()
      }
    })
  }
  



 

}
