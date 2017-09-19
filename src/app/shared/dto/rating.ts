export enum Rating {
  Bad = 0,
  Ok = 1,
  Great = 2
}

export function getRatingDefault(): Rating {
  return 3;
}

export class UserBeerRating {
  public user: number;
  public beer: number;
  public rating: Rating;
}

export class UserBarRating {
  public user: number;
  public bar: number;
  public rating: Rating;
}
