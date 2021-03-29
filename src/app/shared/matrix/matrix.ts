import { Coordinate } from '../properties/coordinate.type';
import { MatrixDimension } from '../properties/matrix-dimension.type';

export class Matrix {
  private _size: number;
  private _jokerCharacter: string;
  private _characters: Array<string>;

  set jokerCharacter(value: string) {
    this._jokerCharacter = value;
  }
  get jokerCharacter(): string {
    return this._jokerCharacter;
  }
  get characters(): Array<string> {
    return this._characters;
  }

  get matrixDimensions(): MatrixDimension {
    return {
      height: this._height,
      width: this._width,
      size: this._size,
    };
  }

  constructor(
    private _width: number,
    private _height: number,
    private _validChars: string = 'abcdefghijklmnopqrstuvwxyz'
  ) {
    if (!this._width || !this._height) {
      throw new Error(
        'Please provide valid width and height to create a matrix!'
      );
    }
    this._size = this._width * this._height;
    this._characters = new Array<string>(this._size);
  }

  charByCoordinate(coordinate: Coordinate): string {
    return this._characters[coordinate.x * this._width + coordinate.y];
  }

  shuffle(): void {
    this._characters = [];
    if (this.jokerCharacter) {
      this._fulfillJokerCharacter();
    }
    const randomCharacters = this._generateRandomCharacters();
    for (let i = 0; i < this._size; i++) {
      if (!this._characters[i]) {
        this._characters[i] = randomCharacters.shift();
      }
    }
  }

  charOccurrences(character: string): number {
    return this._characters.reduce((accumulator, currentValue) => {
      return currentValue === character ? accumulator + 1 : accumulator;
    }, 0);
  }

  private _fulfillJokerCharacter(): void {
    const quantity = Math.round(this._size * 0.2);
    let i = 0;
    while (i <= quantity) {
      const tempX = this._randomize();
      const tempY = this._randomize();
      const characterIndex = tempY * this._width + tempX;
      const tempVal = this._characters[characterIndex];
      if (!tempVal) {
        this._characters[characterIndex] = this.jokerCharacter;
        i++;
      }
    }
  }

  private _generateRandomCharacters(): Array<string> {
    const { quantity, chars } = this._handleValidCharactersAndQuantity();
    let randomChars = [];
    for (let i = 0; i < quantity; i++) {
      randomChars.push(chars.charAt(Math.floor(Math.random() * chars.length)));
    }
    return randomChars;
  }

  private _handleValidCharactersAndQuantity() {
    return {
      quantity: this.jokerCharacter ? Math.round(this._size * 0.8) : this._size,
      chars: this.jokerCharacter
        ? this._validChars.replace(this.jokerCharacter, '')
        : this._validChars,
    };
  }

  private _randomize(): number {
    return Math.floor(Math.random() * this._width);
  }
}
