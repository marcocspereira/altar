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
/** Component that allows to list and create codes. */
export class PaymentsComponent implements OnDestroy {
  private _subscription: Subscription = new Subscription();
  /** Current matrix related to the code that user adds. */
  matrix: Matrix;
  /** Current code that user adds. */
  code: string;
  /** Status to manage if the generator is running or stopped.  */
  status: boolean;
  /** Array of existing payment data. */
  paymentData: Array<PaymentData>;
  /** A form to handle the act of achieve a new code with related name and amount. */
  paymentForm: FormGroup;
  /** An array of error messages related with joker form input. */
  errorMessages: Array<string>;
  /** A given payment data from the list that should be displayed in detail. */
  checksumHighlighted: PaymentData;

  /**
   * @param _codeManager The service that handles the random chars matrix and code generations.
   * @param _paymentManager The service that integrates the payment data with an API.
   */
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

  /**
   * Helper method that creates the form related with joker character.
   * @returns the created FormGroup with the corresponding input and validations.
   */
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

  /**
   * Helper method that allows to add a new code if all data is valid.
   * It integrates with an API, using the payment manager service.
   */
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

  /** Helper method that allows to trigger the removeness of all codes. */
  destroyCodes(): void {
    this._paymentManager.destroyCodes();
  }

  /** Helper method that allows to highlight a given code to display details. */
  highlightChecksum(data: PaymentData): void {
    this.checksumHighlighted = data;
  }

  /** Helper method that reverts highlighted. */
  hideChecksum() {
    this.checksumHighlighted = undefined;
  }

  /**
   * Before destroy GeneratorComponent, ensures that all subscriptions are
   * also destroyed: code generation, matrix and payment.
   */
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  /**
   * Helper method to start to subscribe to generated matrix and code,
   * located in CodeManager service.
   */
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

  /**
   * Helper method to start to subscribe to matrix and matrix generation status.
   * This received value maps with PaymentComponent's local matrix and status properties.
   */
  private _subscribePaymentManager(): void {
    this._subscription.add(
      this._paymentManager.paymentDataObservable$.subscribe((x) => {
        this.paymentData = x;
      })
    );
  }

  /**
   * Helper method that evaluates if the payment form is valid
   * against the input validation rules. It also updates the errorMessages property
   * with related error messages.
   * @returns the payment validation status
   */
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
