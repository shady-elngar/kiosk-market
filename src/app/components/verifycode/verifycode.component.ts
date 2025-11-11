import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verifycode',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './verifycode.component.html',
  styleUrl: './verifycode.component.css',
})
export class VerifycodeComponent implements OnInit, OnDestroy {
  digits: string[] = ['', '', '', '', '', ''];
  countdown = 30;
  private timer: any;
isLoading:boolean =false
  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  handleKey(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

      
    if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab') {
      event.preventDefault();
      return;
    }

       
    if (/[0-9]/.test(event.key) && index < this.digits.length - 1) {
      setTimeout(() => {
        const next = input.nextElementSibling as HTMLInputElement;
        if (next) next.focus();
      }, 50);
    }

         
    if (event.key === 'Backspace' && !input.value && index > 0) {
      const prev = input.previousElementSibling as HTMLInputElement;
      if (prev) prev.focus();
    }
  }

  verifyCode() {
    this.isLoading=true
    const code = this.digits.join('');
    if (code.length < 6) {
      this._ToastrService.warning('Please enter all 6 digits');
      return;
    }

    const body = { resetCode: code };

    this._AuthService.verifyResetCode(body).subscribe({
      next: (res) => {
        this._ToastrService.success('Code verified successfully ✅');
        this._Router.navigate(['auth/resetpassword']);
        this.isLoading=false
      },
      error: (err) => {
        console.error(err);
        this._ToastrService.error('Invalid or expired code ❌');
        this.isLoading=false
      },
    });
  }

  resendCode() {
    if (this.countdown > 0) return;

    const email = localStorage.getItem('resetEmail');    
    if (!email) {
      this._ToastrService.error('Email not found, please start again');
      this._Router.navigate(['auth/forgetpassword'])
      return;
    }

    this._AuthService.forgetPassword({ email }).subscribe({
      next: () => {
        this._ToastrService.success('Verification code resent');
        this.countdown = 30;
        this.startCountdown();
      },
      error: (err) => {
        console.error(err);
        this._ToastrService.error('Failed to resend code');
      },
    });
  }

  private startCountdown() {
    this.timer = setInterval(() => {
      if (this.countdown > 0) this.countdown--;
      else clearInterval(this.timer);
    }, 1000);
  }
}
