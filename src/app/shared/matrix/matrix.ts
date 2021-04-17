import { Coordinate } from '../types/coordinate.type';
import { MatrixDimension } from '../types/matrix-dimension.type';

/** Class that manages a 2D grid. */
export class Matrix {
  /** The matrix size, calculated from width*height */
  private _size: number;
  /** An option character that ahs 20% weight when fulfill 2D grid characters. */
  private _jokerCharacter: string;
  /** The height*width characters that are fulfiiled in 2D grid. */
  private _characters: Array<string>;

  /** Setter to update/remove the joker charaber. */
  set jokerCharacter(value: string) {
    this._jokerCharacter = value;
  }
  /** Getter to obtain the most recent joker character. */
  get jokerCharacter(): string {
    return this._jokerCharacter;
  }
  /** Getter to access current characters of the 2D grid. */
  get characters(): Array<string> {
    return this._characters;
  }
  /** The matrix dimensions, considering height and width. */
  get matrixDimensions(): MatrixDimension {
    return {
      height: this._dimension.height,
      width: this._dimension.width,
    };
  }

  /**
   * @param _dimension The matrix size, considering width and height.
   * @param _validChars The optional property to define chars that should be considered, with a default set.
   */
  constructor(
    private _dimension: MatrixDimension,
    private _validChars: string = 'abcdefghijklmnopqrstuvwxyz'
  ) {
    if (!this._dimension.width || !this._dimension.height) {
      throw new Error(
        'Please provide valid width and height to create a matrix!'
      );
    }
    this._size = this._dimension.width * this._dimension.height;
    this._characters = new Array<string>(this._size);
  }

  /**
   * Helper method that returns a certain char considering a given coordinate.
   * @param coordinate To return the corresponding char.
   * @returns The found char for the received coordinate.
   */
  charByCoordinate(coordinate: Coordinate): string {
    return this._characters[
      coordinate.x * this._dimension.width + coordinate.y
    ];
  }

  /** Helper method to create a 2D grid of random chars. */
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

  /**
   * Helper method that returns the number of occurrences of a given char in
   * the 2D grid.
   * @param character to count occurrences.
   * @returns the found occurrences, with 0 as default.
   */
  charOccurrences(character: string): number {
    return this._characters.reduce((accumulator, currentValue) => {
      return currentValue === character ? accumulator + 1 : accumulator;
    }, 0);
  }

  /**
   * Helper method that adds the joker char to 2D grid,
   * considering 20% of matrix size.
   */
  private _fulfillJokerCharacter(): void {
    const quantity = Math.round(this._size * 0.2);
    let i = 0;
    while (i <= quantity) {
      const tempX = this._randomize();
      const tempY = this._randomize();
      const characterIndex = tempY * this._dimension.width + tempX;
      const tempVal = this._characters[characterIndex];
      if (!tempVal) {
        this._characters[characterIndex] = this.jokerCharacter;
        i++;
      }
    }
  }

  /**
   * Helper method that fulfill 80% to 100% of matrix size with random chars,
   * depending if a joker char is considered or not.
   * @returns A fulfilled matrix to fulfil the free slots of main matrix.
   */
  private _generateRandomCharacters(): Array<string> {
    const { quantity, chars } = this._handleValidCharactersAndQuantity();
    let randomChars = [];
    for (let i = 0; i < quantity; i++) {
      randomChars.push(chars.charAt(Math.floor(Math.random() * chars.length)));
    }
    return randomChars;
  }

  /**
   * Helper method that evaluates if the matrix generation should remove a given joker character
   * from char random generation phase. If so, it removes it from validChars from randomize phase and
   * sets to 80% the quota to receive random chars.
   * @returns the % of random chars to consider and the valid chars as well
   */
  private _handleValidCharactersAndQuantity() {
    return {
      quantity: this.jokerCharacter ? Math.round(this._size * 0.8) : this._size,
      chars: this.jokerCharacter
        ? this._validChars.replace(this.jokerCharacter, '')
        : this._validChars,
    };
  }

  /**
   * Helper method that uses Math API to create a random number between
   * 0 and the 2D gri dimension.
   * @returns the random generated number.
   */
  private _randomize(): number {
    return Math.floor(Math.random() * this._dimension.width);
  }
}
