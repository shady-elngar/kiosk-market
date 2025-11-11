import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Brands } from '../../core/interfaces/brands';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingSpinnerComponent } from "../../shared/ui/loading-spinner/loading-spinner.component"; 
import { ToastrService } from 'ngx-toastr';
import {
  
  ElementRef,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import {
  trigger,
  transition,
  query,
  style,
  stagger,
  animate,
} from '@angular/animations';
@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [LoadingSpinnerComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
animations: [
    trigger('brandListAnimation', [
      transition('void => visible', [
        query(
          '.brand-item',
          [
            style({ opacity: 0, transform: 'translateY(30px)' }),
            stagger(100, [
              animate('900ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class BrandsComponent implements OnInit , AfterViewInit {
  @ViewChild('brandContainer') brandContainer!: ElementRef;
  Brands:Brands[]=[]
  animationState: string = 'void';
constructor(private _BrandsService:BrandsService , private _NgxSpinnerService:NgxSpinnerService , private _ToastrService:ToastrService){}
ngOnInit(): void {
  this._NgxSpinnerService.show()
    this._BrandsService.getCategories().subscribe({
      next:(res)=>{console.log(res.data)
        this.Brands=res.data.slice(0,24)
        this._NgxSpinnerService.hide()

      },
      error: (err) => {
        console.log(err);
         this._NgxSpinnerService.hide()
          this._ToastrService.error(err.error.errors?.msg)
      this._ToastrService.error(err.error.message)
      },
    })
}

  

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animationState = 'visible';
            observer.unobserve(entry.target); 
          }
        });
      },
      { threshold: 0.4 } 
    );

    if (this.brandContainer) {
      observer.observe(this.brandContainer.nativeElement);
    }
  }
}
