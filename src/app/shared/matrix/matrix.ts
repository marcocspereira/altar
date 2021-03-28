import { Coordinate } from '../properties/coordinate.type';

export class Matrix {
  private _size: number;
  private _jokerCharacter: string;
  private _characters: Array<string>;
  private _validCharacters = 'abcdefghijklmnopqrstuvwxyz';

  set jokerCharacter(value: string) {
    if (value) {
      this._jokerCharacter = value;
    }
  }

  get jokerCharacter(): string {
    return this._jokerCharacter;
  }

  get characters(): Array<string> {
    return this._characters;
  }

  constructor(private _width: number, private _height: number) {
    this._size = this._width * this._height;
    this._characters = new Array<string>(this._size);
  }

  characterByCoordinate(coordinate: Coordinate): string {
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
    const { quantity, characters } = this._handleValidCharactersAndQuantity();
    let randomCharacters = [];
    for (let i = 0; i < quantity; i++) {
      const char = characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
      randomCharacters.push(char);
    }
    return randomCharacters;
  }

  private _handleValidCharactersAndQuantity() {
    return {
      quantity: this.jokerCharacter ? Math.round(this._size * 0.8) : this._size,
      characters: this.jokerCharacter
        ? this._validCharacters.replace(this.jokerCharacter, '')
        : this._validCharacters,
    };
  }

  private _randomize(): number {
    return Math.floor(Math.random() * this._width);
  }
}
