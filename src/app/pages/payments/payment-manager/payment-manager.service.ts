import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PaymentData } from 'src/app/pages/payments/payment-data.type';

@Injectable({
  providedIn: 'root',
})
export class PaymentManagerService {
  private _paymentData = new Subject<Array<PaymentData>>();
  paymentDataObservable$ = this._paymentData.asObservable();
  constructor() {}

  persistCode(newPaymentData: PaymentData): void {
    const paymentData = JSON.parse(sessionStorage.getItem('paymentData')) || [];
    paymentData.push(newPaymentData);
    sessionStorage.setItem('paymentData', JSON.stringify(paymentData));
  }

  destroyCodes(): void {
    sessionStorage.removeItem('paymentData');
    this._paymentData.next([]);
  }

  getCodes(): PaymentData[] | void {
    const paymentData = JSON.parse(sessionStorage.getItem('paymentData')) || [];
    this._paymentData.next(paymentData);
  }
}
