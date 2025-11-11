import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-main-slider',
  standalone: true,
  imports: [ CarouselModule ],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css'
})
export class MainSliderComponent {
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
