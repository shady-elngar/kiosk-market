import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent {
 constructor(private router: Router) {}

  goToOrders() {
    this.router.navigate(['/main/prevorders']);
  }

  goHome() {
    this.router.navigate(['/main/home']);
  }
}
