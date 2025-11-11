import { Component, Input } from '@angular/core';
import { FormControlName, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-alret',
  standalone: true,
  imports: [],
  templateUrl: './alret.component.html',
  styleUrl: './alret.component.css'
})
export class AlretComponent {

@Input() formName!:FormGroup
@Input() ControlName!:string
}
