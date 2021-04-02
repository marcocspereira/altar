import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CodeManagerService } from 'src/app/shared/code-manager/code-manager.service';
import { PatternValidators } from 'src/app/shared/altar-input/pattern-validators/pattern-validators';
import { PaymentManagerService } from './payment-manager/payment-manager.service';
import { PaymentData } from 'src/app/pages/payments/payment-data.type';
import { Matrix } from 'src/app/shared/matrix/matrix';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnDestroy {
  private _subscription: Subscription = new Subscription();
  matrix: Matrix;
  code: string;
  status: boolean;
  paymentData: Array<PaymentData>;
  paymentForm: FormGroup;
  errorMessages: Array<string>;
  checksumHighlighted: PaymentData;

  constructor(
    private _codeManager: CodeManagerService,
    private _paymentManager: PaymentManagerService
  ) {
    this._subscribeCodeGenerationStatus();
    this._subscribeMatrix();
    this._subscribePaymentManager();
    this._paymentManager.getCodes();
    this.paymentForm = this.createForm();
  }

  createForm() {
    return new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          PatternValidators.alphanumeric,
        ]),
        amount: new FormControl('', [
          Validators.required,
          PatternValidators.numeric,
        ]),
      },
      { updateOn: 'change' }
    );
  }

  addCode(): void {
    const isInvalidForm = this._manageFormInvalidity();
    if (isInvalidForm) {
      return;
    }
    const dataCode: PaymentData = {
      name: this.paymentForm.controls.name.value,
      amount: this.paymentForm.controls.amount.value,
      code: this.code,
      matrix: this.matrix,
    };
    this._paymentManager.persistCode(dataCode);
    this._paymentManager.getCodes();
  }

  destroyCodes(): void {
    this._paymentManager.destroyCodes();
  }

  highlightChecksum(data: PaymentData): void {
    this.checksumHighlighted = data;
  }

  hideChecksum() {
    this.checksumHighlighted = undefined;
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  private _subscribeMatrix(): void {
    this._subscription.add(
      this._codeManager.generatedCodeObservable$.subscribe((generatedCode) => {
        this.matrix = generatedCode.referenceMatrix;
        this.code = generatedCode.code;
      })
    );
  }

  private _subscribeCodeGenerationStatus(): void {
    this._subscription.add(
      this._codeManager.codeGenerationStatusObservable$.subscribe((x) => {
        this.status = x;
      })
    );
  }

  private _subscribePaymentManager(): void {
    this._subscription.add(
      this._paymentManager.paymentDataObservable$.subscribe((x) => {
        this.paymentData = x;
      })
    );
  }

  private _manageFormInvalidity(): boolean {
    this.errorMessages = [];
    if (!this.code) {
      this.errorMessages.push('A code must be generated in Generator page');
    }
    if (this.paymentForm.controls.name.hasError('required')) {
      this.errorMessages.push('Name is required');
    }
    if (this.paymentForm.controls.name.hasError('invalidAlphanumeric')) {
      this.errorMessages.push('Name must be alphanumeric');
    }
    if (this.paymentForm.controls.amount.hasError('required')) {
      this.errorMessages.push('Amount is required');
    }
    if (this.paymentForm.controls.amount.hasError('invalidNumeric')) {
      this.errorMessages.push('Amount must be numeric');
    }
    return this.errorMessages.length > 0 ? true : false;
  }
}
