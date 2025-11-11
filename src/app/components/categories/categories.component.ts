import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Categories } from '../../core/interfaces/categories';
import { CategoriesService } from '../../core/services/categories.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingSpinnerComponent } from "../../shared/ui/loading-spinner/loading-spinner.component"; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [LoadingSpinnerComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  @ViewChild('animatedDiv') animatedDiv!: ElementRef<HTMLDivElement>;

  isVisible = false;
  content: string = '';
  observer!: IntersectionObserver;
  categories: Categories[] = [];

  constructor(private _CategoriesService: CategoriesService , private _NgxSpinnerService:NgxSpinnerService , private _ToastrService:ToastrService) {}

  ngOnInit(): void {
    this._NgxSpinnerService.show()
    this._CategoriesService.getCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categories = res.data;
        this._NgxSpinnerService.hide()
      },
      error: (err) => {
        console.log(err);
         this._NgxSpinnerService.hide()
          this._ToastrService.error(err.error.errors?.msg)
      this._ToastrService.error(err.error.message)
      },
    });
  }
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

    this.observer.observe(this.animatedDiv.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
