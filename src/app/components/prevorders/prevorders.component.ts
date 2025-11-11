import { Component, OnInit } from '@angular/core';
import { UserOrderService } from '../../core/services/user-order.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { LoadingSpinnerComponent } from "../../shared/ui/loading-spinner/loading-spinner.component";
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-prevorders',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, LoadingSpinnerComponent],
  templateUrl: './prevorders.component.html',
  styleUrl: './prevorders.component.css'
})
export class PrevordersComponent implements OnInit {
cartOwner!:any
orders:any[]=[]
constructor( private _UserOrderService:UserOrderService , private _NgxSpinnerService:NgxSpinnerService){}
  ngOnInit(): void {
     this.cartOwner = localStorage.getItem("cartOwner") 
     this.order(this.cartOwner)
  }
  order(owner:string)
  {
    this._NgxSpinnerService.show()
    this._UserOrderService.getUserOrder(owner).subscribe({
  next:(res)=>{console.log(res)
    this._NgxSpinnerService.hide()
    this.orders=res
    console.log(res)
  }
})
  }


   toggleDetails(order: any) {
    order.showDetails = !order.showDetails;
  }
}
