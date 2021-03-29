import { Component, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { CodeManagerService } from 'src/app/shared/code-manager/code-manager.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css'],
})
export class GeneratorComponent implements OnDestroy {
  subscription: Subscription;
  matrixChars: Array<string>;
  status: boolean = false;
  matrixWidth: number = 0;
  code: string;

  constructor(private _codeManager: CodeManagerService) {}

  ngOnDestroy() {}

  toggleStatus(): void {
    this.status = !this.status;
    if (this.status) {
      this._subscribe();
    } else {
      this._unsubscribe();
    }
  }

  private _subscribe(): void {
    this.subscription = this._codeManager.generatedCodeObservable$.subscribe(
      (generatedCode) => {
        this.matrixChars = generatedCode.referenceMatrix.characters;
        this.code = generatedCode.code;
        this.matrixWidth = generatedCode.referenceMatrix.matrixDimensions.width;
      }
    );
  }

  private _unsubscribe(): void {
    this.subscription.unsubscribe();
  }
}
