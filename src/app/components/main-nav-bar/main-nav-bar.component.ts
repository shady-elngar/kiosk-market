import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { WishListService } from '../../core/services/wish-list.service';
WishListService
@Component({
  selector: 'app-main-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './main-nav-bar.component.html',
  styleUrl: './main-nav-bar.component.css'
})
export class MainNavBarComponent {
  cartCounter!:number
  wishNumber!:number
constructor(private _CartService:CartService , private _WishListService:WishListService , private _Router:Router){}
ngOnInit(): void {
this._CartService.counter.subscribe({next:(counter)=>{this.cartCounter=counter}})
this._WishListService.wishCounter.subscribe({next:(wishCounter)=>{this.wishNumber=wishCounter}})
  
}
logOut()
{
  localStorage.removeItem("token")
  this._Router.navigate(['auth/login'])
}
}
