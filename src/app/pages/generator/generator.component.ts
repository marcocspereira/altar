import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PatternValidators } from 'src/app/shared/altar-input/pattern-validators/pattern-validators';
import { CodeManagerService } from 'src/app/shared/code-manager/code-manager.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css'],
})
/**
 * Component that handles the generation of 2D grid that can be
 * inflated with a joker character. In the end it generates a 2 digits code.
 */
export class GeneratorComponent implements OnDestroy {
  private _subscription: Subscription = new Subscription();
  /** Array of chars to display in 2D grid. */
  matrixChars: Array<string>;
  /** Status to manage if the generator is running or stopped.  */
  status: boolean;
  /** Helper property to handle the size of each grid square */
  matrixWidth: number = 0;
  /** The generated code. */
  code: string;
  /** A form to handle the joker character selction. */
  jokerForm: FormGroup;
  /** An array of error messages related with joker form input. */
  errorMessages: Array<string>;

  /**
   * @param _codeManager The service that handles the random chars matrix and code generations.
   */
  constructor(private _codeManager: CodeManagerService) {
    // this._codeManager.matrix = { width: 4, height: 4 };
    this._subscribeCodeGenerationStatus();
    this._subscribeMatrix();
    this.jokerForm = this._createForm();
  }

  /**
   * Helper method to control if 2D grid status: running or stopped.
   */
  toggleStatus(): void {
    this.status = !this.status;
    this._codeManager.codeGenerationStatus = this.status;
  }

  /**
   * Helper method to trigger the joker character selection and send to
   * CodeManager service to inflate the next matrix values (20% weight).
   */
  addJokerChar(): void {
    const isInvalidForm = this._manageFormInvalidity();
    if (isInvalidForm) {
      return;
    }
    this._codeManager.jokerCharacter = this.jokerForm.controls.jokerChar.value;
    this._disableAddButton();
  }

  /**
   * Before destroy GeneratorComponent, ensures that all subscriptions are
   * also destroyed: code generation and matrix.
   */
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  /**
   * Helper method that creates the form related with joker character.
   * @returns the created FormGroup with the corresponding input and validations.
   */
  private _createForm(): FormGroup {
    return new FormGroup({
      jokerChar: new FormControl('', [
        Validators.maxLength(1),
        PatternValidators.alphabetical,
      ]),
    });
  }

  /**
   * Helper method to start to subscribe to generated matrix and code,
   * located in CodeManager service.
   */
  private _subscribeMatrix(): void {
    this._subscription.add(
      this._codeManager.generatedCodeObservable$.subscribe((generatedCode) => {
        this.matrixChars = generatedCode.referenceMatrix.characters;
        this.code = generatedCode.code;
        this.matrixWidth = generatedCode.referenceMatrix.matrixDimensions.width;
      })
    );
  }

  /**
   * Helper method to start to subscribe to matrix generation status. This received
   * value maps with GeneratorComponent's local status property.
   */
  private _subscribeCodeGenerationStatus(): void {
    this._subscription.add(
      this._codeManager.codeGenerationStatusObservable$.subscribe((x) => {
        this.status = x;
      })
    );
  }

  /**
   * Helper method that evaluates if the joker character selection form is valid
   * against the input validation rules. It also updates the errorMessages property
   * with related error messages.
   * @returns the jokerForm validation status
   */
  private _manageFormInvalidity(): boolean {
    this.errorMessages = [];

    if (this.jokerForm.controls.jokerChar.hasError('maxlength')) {
      this.errorMessages.push('Only 1 char at time is allowed');
    }
    if (this.jokerForm.controls.jokerChar.hasError('invalidAlphabetical')) {
      this.errorMessages.push('Only a-z chars are allowed');
    }
    return this.errorMessages.length > 0 ? true : false;
  }

  /**
   * Helper method to set disabled status during 4 seconds (after each valid input),
   * applied the button that allows to trigger the update of joker character.
   */
  private _disableAddButton(): void {
    document.getElementById('jokerSubmitButton')['disabled'] = true;
    setTimeout(function () {
      document.getElementById('jokerSubmitButton')['disabled'] = false;
    }, 4000);
  }
}
