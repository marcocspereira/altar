import { Component, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
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

  constructor(private _codeManager: CodeManagerService) {
    this._subscribeCodeGenerationStatus();
    this._subscribeMatrix();
  }

  toggleStatus(): void {
    this.status = !this.status;
    this._codeManager.codeGenerationStatus = this.status;
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
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

  OnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
