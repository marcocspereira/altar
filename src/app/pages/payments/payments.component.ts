import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CodeManagerService } from 'src/app/shared/code-manager/code-manager.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnDestroy {
  private _subscription: Subscription = new Subscription();
  matrixChars: Array<string>;
  code: string;
  status: boolean;

  constructor(private _codeManager: CodeManagerService) {
    this._subscribeCodeGenerationStatus();
    this._subscribeMatrix();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  private _subscribeMatrix(): void {
    this._subscription.add(
      this._codeManager.generatedCodeObservable$.subscribe((generatedCode) => {
        this.matrixChars = generatedCode.referenceMatrix.characters;
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
}
