import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { WishListService } from '../../core/services/wish-list.service';
import { Router, RouterLink } from '@angular/router';
import { LoadingSpinnerComponent } from "../../shared/ui/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [RouterLink, LoadingSpinnerComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {
  wishListProducts: any[] = [];
  allRes: any;
  loadingProductId: string | null = null;
  constructor(
    private _WishListService: WishListService,
    private _NgxSpinnerService: NgxSpinnerService,
    private _ToastrService: ToastrService
  ) {}
   ngOnInit(): void {
    this.getLoggedWishList();
  }

  getLoggedWishList() {
    this._NgxSpinnerService.show();
    this._WishListService.getLoggedWishList().subscribe({
      next: (res) => {
        console.log(res);
        this._WishListService.wishCounter.next(res.count)
        this.wishListProducts = res.data;
        this.allRes = res;
        console.log(this.wishListProducts);
        this._NgxSpinnerService.hide();

      },
      
    });
  }
  removeWishItem(productId:string )
  {
    this.loadingProductId = productId;
    this._WishListService.removeProduct(productId).subscribe({
      next:(res)=>{console.log(res)
      localStorage.setItem("wishNumber",JSON.stringify(res.data.length))

         this.loadingProductId = null;
        this.getLoggedWishList()
      },error:(err)=>{this.loadingProductId = null;}
    })
  }
}
