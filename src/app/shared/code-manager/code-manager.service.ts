import { Injectable } from '@angular/core';
import { timer, ReplaySubject, BehaviorSubject, NEVER } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Matrix } from '../matrix/matrix';
import { Coordinate } from '../properties/coordinate.type';
import { GeneratedCode } from '../properties/generated-code.type';

@Injectable({
  providedIn: 'root',
})
export class CodeManagerService {
  private _matrix = new Matrix(10, 10);
  private _generatedCode = new ReplaySubject<GeneratedCode>(1);
  private _codeGenerationStatus = new BehaviorSubject<boolean>(false);
  private _jokerCharacter: string;

  set jokerCharacter(value: string) {
    this._jokerCharacter = value;
    this._matrix.jokerCharacter = value;
  }
  get jokerCharacter(): string {
    return this._jokerCharacter;
  }

  generatedCodeObservable$ = this._generatedCode.asObservable();
  codeGenerationStatusObservable$ = this._codeGenerationStatus.asObservable();

  constructor() {
    this.codeGenerationStatusObservable$
      .pipe(
        switchMap((on) => (on ? timer(0, 2000) : NEVER)),
        map((_) => {
          const date: Date = new Date();
          const seconds = this._getSecondsFromDate(date);
          this._matrix.shuffle();
          const code = this._calculateCode(seconds);
          return {
            referenceMatrix: this._matrix,
            timestamp: date.toLocaleTimeString('en-GB'),
            code: code,
          };
        })
      )
      .subscribe((generatedCode) => {
        this._generatedCode.next(generatedCode);
      });
  }

  set codeGenerationStatus(value: boolean) {
    this._codeGenerationStatus.next(value);
  }

  private _getSecondsFromDate(date: Date = new Date()): number[] {
    const seconds = date.getSeconds().toString().split('');
    if (seconds.length === 1) {
      seconds.unshift('0');
    }
    return seconds.map((x) => parseInt(x, 10));
  }

  private _calculateCode(seconds: number[]): string {
    const coordinateXY: Coordinate = { x: seconds[0], y: seconds[1] };
    const coordinateYX: Coordinate = { x: seconds[1], y: seconds[0] };
    const firstChar = this._matrix.charByCoordinate(coordinateXY);
    const secondChar = this._matrix.charByCoordinate(coordinateYX);
    const firstCharOccurrences = this._matrix.charOccurrences(firstChar) % 10;
    const secondCharOccurrences = this._matrix.charOccurrences(secondChar) % 10;

    return firstCharOccurrences.toString() + secondCharOccurrences.toString();
  }
}
