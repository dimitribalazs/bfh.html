export class RatingModel {
  private _oldRating: number;
  private _newRating: number;

  get oldRating(): number {
    return this._oldRating;
  }

  get newRating(): number {
    return this._newRating;
  }

  set oldRating(value: number) {
    this._oldRating = value;
  }

  set newRating(value: number) {
    this._newRating = value;
  }
}
