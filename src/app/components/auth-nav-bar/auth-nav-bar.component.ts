import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-auth-nav-bar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './auth-nav-bar.component.html',
  styleUrl: './auth-nav-bar.component.css'
})
export class AuthNavBarComponent {

}
