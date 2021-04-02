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
export class GeneratorComponent implements OnDestroy {
  private _subscription: Subscription = new Subscription();
  matrixChars: Array<string>;
  status: boolean;
  matrixWidth: number = 0;
  code: string;
  jokerForm: FormGroup;
  errorMessages: Array<string>;

  constructor(private _codeManager: CodeManagerService) {
    // this._codeManager.matrix = { width: 4, height: 4 };
    this._subscribeCodeGenerationStatus();
    this._subscribeMatrix();
    this.jokerForm = this.createForm();
  }

  toggleStatus(): void {
    this.status = !this.status;
    this._codeManager.codeGenerationStatus = this.status;
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  createForm() {
    return new FormGroup({
      jokerChar: new FormControl('', [
        Validators.maxLength(1),
        PatternValidators.alphabetical,
      ]),
    });
  }

  addJokerChar(): void {
    const isInvalidForm = this._manageFormInvalidity();
    if (isInvalidForm) {
      return;
    }
    this._codeManager.jokerCharacter = this.jokerForm.controls.jokerChar.value;
    this._disableAddButton();
  }

  private _subscribeMatrix(): void {
    this._subscription.add(
      this._codeManager.generatedCodeObservable$.subscribe((generatedCode) => {
        this.matrixChars = generatedCode.referenceMatrix.characters;
        this.code = generatedCode.code;
        this.matrixWidth = generatedCode.referenceMatrix.matrixDimensions.width;
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

  private _disableAddButton(): void {
    document.getElementById('jokerSubmitButton')['disabled'] = true;
    setTimeout(function () {
      document.getElementById('jokerSubmitButton')['disabled'] = false;
    }, 5000);
  }

  OnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
