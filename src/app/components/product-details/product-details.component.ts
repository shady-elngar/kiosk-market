import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from '../../core/services/product-details.service';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { StarRatingPipe } from "../../core/services/pipes/star-rating.pipe";
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingSpinnerComponent } from "../../shared/ui/loading-spinner/loading-spinner.component"; 
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { WishListService } from '../../core/services/wish-list.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule, StarRatingPipe, LoadingSpinnerComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  productId!:any
  productInfo!:any
  discountPerc!:number
  seeMore:boolean = false
  isLoading:boolean=false
  wishLoading:boolean =false
  
constructor(private _ProductDetailsService:ProductDetailsService , private _ActivatedRoute:ActivatedRoute , private _NgxSpinnerService:NgxSpinnerService , private _ToastrService:ToastrService , private _CartService:CartService , private _WishListService:WishListService){}
ngOnInit(): void {

  this._ActivatedRoute.paramMap.subscribe({
    next:(param)=>{this.productId = param.get("id")
      console.log(this.productId)
      this.getDetails()
    }
    

  })
}
getDetails()
{
        this._NgxSpinnerService.show()

  this._ProductDetailsService.getProductDetails(this.productId).subscribe({
    next:(res)=>{
      this.productInfo=res.data
      console.log(this.productInfo)
      this.discountPerc = Math.round(100-(this.productInfo?.priceAfterDiscount*100/this.productInfo?.price)) 
      this._NgxSpinnerService.hide()  

    },error:(err)=>{
       this._NgxSpinnerService.hide()
       this._ToastrService.error(err.error.errors?.msg)
       this._ToastrService.error(err.error.message)
      
    }
  })
}
addToCart(productId:any) 
{
  this.isLoading=true
this._CartService.addToCart(productId).subscribe({
  next:(res)=>{console.log(res)
    console.log(res.cartId);
    localStorage.setItem("cartOwner", res.data.cartOwner)
    localStorage.setItem("cartNumber",JSON.stringify(res.numOfCartItems))
    this._CartService.counter.next(Number(localStorage.getItem("cartNumber")))
    this._ToastrService.success(res.message)
    this.isLoading=false
  },error:(err)=>{
    this.isLoading=false
    this._ToastrService.error(err.message)
  }
})
}
addToWish(productId:any)
{
  this.wishLoading=true
   this._WishListService.addToWish(productId).subscribe({
   next:(res)=>{console.log(res)
     localStorage.setItem("wishNumber",JSON.stringify(res.data.length))
    this._WishListService.wishCounter.next(Number(res.data.length))
    this._ToastrService.success(res.message)
    this.wishLoading=false
  },
  error:(err)=>{
    this.wishLoading=false
    this._ToastrService.error(err.message)
  }
})
}
showMore()
{
  this.seeMore=true
}
showLess()
{
  this.seeMore=false
}

 customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    animateOut: 'fadeOut',
    items: 1,   
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
}

