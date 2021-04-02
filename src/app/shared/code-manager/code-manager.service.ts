import { Injectable } from '@angular/core';
import { timer, ReplaySubject, Subject, BehaviorSubject, NEVER } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Matrix } from '../matrix/matrix';
import { Coordinate } from '../types/coordinate.type';
import { GeneratedCode } from '../types/generated-code.type';
import { MatrixDimension } from '../types/matrix-dimension.type';

@Injectable({
  providedIn: 'root',
})
export class CodeManagerService {
  private _matrix = new Matrix({ width: 10, height: 10 });
  /**
   * A subject property that multicasts the generated code with a buffer size of 1.
   * A BehaviourSubject could be a nice solution, however needs a initialization value
   * and since in this scenario the moment zero would be null, this would oblige the
   * subscribers to deal with null values.
   * */
  private _generatedCode = new ReplaySubject<GeneratedCode>(1);
  /**
   * A subject property that broadcasts the most current code generation status to
   * all subscribers.
   */
  private _codeGenerationStatus = new Subject<boolean>();
  /** The joker character, when setted by a service user. */
  private _jokerCharacter: string;

  /** Setter to create a new Matrix with a given dimension. */
  set matrix(matrixDimension: MatrixDimension) {
    this._matrix = new Matrix(matrixDimension);
  }
  /** Setter to update/remove the joker character. */
  set jokerCharacter(value: string) {
    this._jokerCharacter = value;
    this._matrix.jokerCharacter = value;
  }
  /** Getter to receive the existing joker character in the system. */
  get jokerCharacter(): string {
    return this._jokerCharacter;
  }

  /**
   * This property makes the _generatedCode subject inaccessible for subscribers,
   * to block access to complete, next and arror methods.
   */
  generatedCodeObservable$ = this._generatedCode.asObservable();
  /**
   * This property makes the _codeGenerationStatus subject inaccessible for subscribers,
   * to block access to complete, next and arror methods.
   */
  codeGenerationStatusObservable$ = this._codeGenerationStatus.asObservable();

  constructor() {
    this._generateAndEmitCodes();
  }

  /** Setter that multicasts the most recent code generation status to observables. */
  set codeGenerationStatus(value: boolean) {
    this._codeGenerationStatus.next(value);
  }

  /**
   * Helper method that emits a new code, reference matrix and timestamp, every 2 seconds,
   * since the very begining when generation status is true.
   */
  private _generateAndEmitCodes(): void {
    this.codeGenerationStatusObservable$
      .pipe(
        switchMap((generationStaus) =>
          generationStaus ? timer(0, 2000) : NEVER
        ),
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

  /**
   * Helper method that returns an array with 2 digit seconds of a given date.
   * @param date to get seconds from
   * @returns a 2 size array with 1 number each, corresponding to seconds
   */
  private _getSecondsFromDate(date: Date = new Date()): number[] {
    const seconds = date.getSeconds().toString().split('');
    if (seconds.length === 1) {
      seconds.unshift('0');
    }
    return seconds.map((x) => parseInt(x, 10));
  }

  /**
   * Helper method that calculates a code, considering 2 digit seconds
   * and the number of occurencies of 2 characters obtaneid as coordinates
   * from the 2 digit seconds (the original and reverse orders)
   *  @returns a 2 digit string corresponding to calculated code
   */
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
