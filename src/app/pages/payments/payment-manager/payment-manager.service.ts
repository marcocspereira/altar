import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PaymentData } from 'src/app/pages/payments/payment-data.type';

@Injectable({
  providedIn: 'root',
})
/**
 * Service that handles the integration with an API.
 * At the moment it uses sessionStorage API.
 */
export class PaymentManagerService {
  /** Subject that allows to multicast the most recent PaymentDatas  */
  private _paymentData = new Subject<Array<PaymentData>>();
  /**
   * This property makes the _paymentData subject inaccessible for subscribers,
   * to block access to complete, next and arror methods.
   */
  paymentDataObservable$ = this._paymentData.asObservable();

  constructor() {}

  /**
   * Method that allows to receive a new PaymentData and persist it with a given API
   * @param newPaymentData the PaymentData to persist
   */
  persistCode(newPaymentData: PaymentData): void {
    const paymentData = JSON.parse(sessionStorage.getItem('paymentData')) || [];
    paymentData.push(newPaymentData);
    sessionStorage.setItem('paymentData', JSON.stringify(paymentData));
  }

  /**
   * Method that cleans all payment data registries.
   */
  destroyCodes(): void {
    sessionStorage.removeItem('paymentData');
    this._paymentData.next([]);
  }

  /**
   * Method that allows to get all existing codes from the API.
   */
  getCodes(): PaymentData[] | void {
    const paymentData = JSON.parse(sessionStorage.getItem('paymentData')) || [];
    this._paymentData.next(paymentData);
  }
}
