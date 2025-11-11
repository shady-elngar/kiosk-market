import { Component, OnInit } from '@angular/core';

import { FormComponent } from '../../shared/ui/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from '../../core/services/address.service';
import { ActivatedRoute } from '@angular/router';
import { PaymentMethodService } from '../../core/services/payment-method.service';
PaymentMethodService;

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [FormComponent, ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css',
})
export class AddressComponent implements OnInit {
  isLoading: boolean = false;
  selectedMethod: 'visa' | 'cash' | null = null;
  cash: boolean = false;
  visa: boolean = false;
  cartId: any;
  stripUrl: string = '';
  constructor(
    private _AddressService: AddressService,
    private _Router: Router,
    private _ToastrService: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
    private _PaymentMethodService: PaymentMethodService
  ) {}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.cartId! = param.get('id');
        console.log(this.cartId);
      },
    });
  }
  addressHundeler(data: any) {
    if (!this.selectedMethod) {
      alert('Please select a payment method before confirming.');
      return;
    }
    if (this.selectedMethod == 'cash') {
      this.isLoading = true;
      this._PaymentMethodService.cashOrder(this.cartId, data).subscribe({
        next: (res) => {
          console.log(res);
          this._ToastrService.success(res.message);

          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this._ToastrService.error(err.message);
        },
      });
    }
    if (this.selectedMethod == 'visa') {
      this.isLoading = true;
      this._PaymentMethodService.checkoutSession(this.cartId, data).subscribe({
        next: (res) => {
          console.log(res);
          this.stripUrl = res.session.url;
          this._ToastrService.success(res.message);
          window.location.href = this.stripUrl;
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this._ToastrService.error(err.message);
        },
      });
    }
  }

  selectMethod(method: 'visa' | 'cash') {
    this.selectedMethod = method;
    console.log('Selected payment method:', method);
  }
}
