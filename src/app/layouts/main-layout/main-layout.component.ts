import { Component } from '@angular/core';
import { MainNavBarComponent } from "../../components/main-nav-bar/main-nav-bar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [MainNavBarComponent, RouterOutlet, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
