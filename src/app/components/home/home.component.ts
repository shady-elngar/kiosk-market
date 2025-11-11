import { AfterViewInit, Component ,  ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MainSliderComponent } from "../main-slider/main-slider.component";
import { CategoriesComponent } from "../categories/categories.component";
import { AllProductsComponent } from "../all-products/all-products.component";
import { NewArrivalProductsComponent } from "../new-arrival-products/new-arrival-products.component";
import { BrandsComponent } from "../brands/brands.component";
import { TopSellingComponent } from "../top-selling/top-selling.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainSliderComponent, CategoriesComponent, AllProductsComponent, NewArrivalProductsComponent, BrandsComponent, TopSellingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit , OnDestroy {


@ViewChild('animatedPanner') animatedPanner!: ElementRef<HTMLDivElement>;

  isVisible = false;
  content: string = '';
  observer!: IntersectionObserver;


  ngAfterViewInit() {
  this.observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !this.isVisible) {
        this.isVisible = true;
        this.observer.disconnect();
      }
    },
    { threshold: 0.1 }
  );

  
  this.observer.observe(this.animatedPanner.nativeElement);
}

ngOnDestroy() {
  this.observer.disconnect();
}

}
